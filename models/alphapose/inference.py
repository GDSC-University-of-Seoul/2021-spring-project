"""Script for single-gpu/multi-gpu demo."""
import argparse
import os
import platform
import time

import numpy as np
import torch
from tqdm import tqdm

from detector.apis import get_detector
from alphapose.models import builder
from alphapose.utils.config import update_config
from alphapose.utils.detector import DetectionLoader
from alphapose.utils.vis import getTime
from alphapose.utils.writer import DataWriter

"""
python inference.py --cfg data/256x192_res50_lr1e-3_1x.yaml --checkpoint data/fast_res50_256x192.pth --video data/11-2_cam01_assault01_place08_night_spring.mp4 --outdir examples/res --gpus 0 --vis --profile --save_video
"""

"""----------------------------- Demo options -----------------------------"""
parser = argparse.ArgumentParser(description="AlphaPose Demo")

# experiment configure file name
parser.add_argument("--cfg", type=str, required=True)
# checkpoint file name
parser.add_argument("--checkpoint", type=str, required=True)
# Use single process for pytorch
parser.add_argument("--sp", default=False, action="store_true")
# detector name
parser.add_argument("--detector", dest="detector", default="yolo")
# output-directory
parser.add_argument("--outdir", dest="outputpath", default="examples/res/")
# visualize image
parser.add_argument("--vis", default=False, action="store_true")
# visualize human bbox
parser.add_argument("--showbox", default=False, action="store_true")
# add speed profiling at screen output
parser.add_argument("--profile", default=False, action="store_true")
# min box area to filter out
parser.add_argument("--min_box_area", type=int, default=0)
# detection batch size PER GPU
parser.add_argument("--detbatch", type=int, default=4)
# pose estimation maximum batch size PER GPU
parser.add_argument( "--posebatch", type=int, default=16)
# save the result json as coco format, using image index(int) instead of image name(str)
parser.add_argument("--eval", dest="eval", default=False, action="store_true")
# choose which cuda device to use by index and input comma to use multi gpus, e.g. 0,1,2,3. (input -1 for cpu only)
parser.add_argument("--gpus", type=str, dest="gpus", default="0")
# the length of result buffer, where reducing it will lower requirement of cpu memory
parser.add_argument("--qsize", type=int, dest="qsize", default=8)
"""----------------------------- Video options -----------------------------"""
# video-name
parser.add_argument("--video", dest="video", default="")
# whether to save rendered video
parser.add_argument("--save_video", dest="save_video", default=False, action="store_true")

args = parser.parse_args()
cfg = update_config(args.cfg)

if platform.system() == "Windows":
    args.sp = True

args.gpus = (
    [int(i) for i in args.gpus.split(",")] if torch.cuda.device_count() >= 1 else [-1]
)
args.device = torch.device("cuda:" + str(args.gpus[0]) if args.gpus[0] >= 0 else "cpu")
args.detbatch = args.detbatch * len(args.gpus)
args.posebatch = args.posebatch * len(args.gpus)

if not args.sp:
    torch.multiprocessing.set_start_method("forkserver", force=True)
    torch.multiprocessing.set_sharing_strategy("file_system")


def print_finish_info():
    print("===========================> Finish Model Running.")
    if args.save_video:
        print("===========================> Rendering remaining images in the queue...")


if __name__ == "__main__":
    assert os.path.isfile(args.video), IOError(
        "Error: --video must refer to a video file, not directory."
    )

    input_source = args.video

    if not os.path.exists(args.outputpath):
        os.makedirs(args.outputpath)

    # Load detection loader
    det_loader = DetectionLoader(
        input_source,
        get_detector(args),
        cfg,
        args,
        batchSize=args.detbatch,
        queueSize=args.qsize,
    )
    det_worker = det_loader.start()

    # Load pose model
    pose_model = builder.build_sppe(cfg.MODEL, preset_cfg=cfg.DATA_PRESET)

    print(f"Loading pose model from {args.checkpoint}...")
    pose_model.load_state_dict(torch.load(args.checkpoint, map_location=args.device))
    pose_dataset = builder.retrieve_dataset(cfg.DATASET.TRAIN)
    if len(args.gpus) > 1:
        pose_model = torch.nn.DataParallel(pose_model, device_ids=args.gpus).to(
            args.device
        )
    else:
        pose_model.to(args.device)
    pose_model.eval()

    runtime_profile = {"dt": [], "pt": [], "pn": []}

    # Init data writer
    queueSize = args.qsize
    if args.save_video:
        from alphapose.utils.writer import DEFAULT_VIDEO_SAVE_OPT as video_save_opt

        video_save_opt["savepath"] = os.path.join(
            args.outputpath, "ap_" + os.path.basename(input_source)
        )
        video_save_opt.update(det_loader.videoinfo)
        writer = DataWriter(
            cfg,
            args,
            save_video=True,
            video_save_opt=video_save_opt,
            queueSize=queueSize,
        ).start()
    else:
        writer = DataWriter(cfg, args, save_video=False, queueSize=queueSize).start()

    data_len = det_loader.length
    im_names_desc = tqdm(range(data_len), dynamic_ncols=True)

    batchSize = args.posebatch
    try:
        for i in im_names_desc:
            start_time = getTime()
            with torch.no_grad():
                (
                    inps,
                    orig_img,
                    im_name,
                    boxes,
                    scores,
                    ids,
                    cropped_boxes,
                ) = det_loader.read()
                if orig_img is None:
                    break

                if boxes is None or boxes.nelement() == 0:
                    writer.save(None, None, None, None, None, orig_img, im_name)
                    continue

                if args.profile:
                    ckpt_time, det_time = getTime(start_time)
                    runtime_profile["dt"].append(det_time)

                # Pose Estimation
                inps = inps.to(args.device)
                datalen = inps.size(0)
                leftover = 0
                if (datalen) % batchSize:
                    leftover = 1
                num_batches = datalen // batchSize + leftover

                hm = []
                for j in range(num_batches):
                    inps_j = inps[j * batchSize : min((j + 1) * batchSize, datalen)]
                    hm_j = pose_model(inps_j)
                    hm.append(hm_j)

                hm = torch.cat(hm)
                if args.profile:
                    ckpt_time, pose_time = getTime(ckpt_time)
                    runtime_profile["pt"].append(pose_time)
                hm = hm.cpu()

                writer.save(boxes, scores, ids, hm, cropped_boxes, orig_img, im_name)

                if args.profile:
                    ckpt_time, post_time = getTime(ckpt_time)
                    runtime_profile["pn"].append(post_time)

            if args.profile:
                # TQDM
                im_names_desc.set_description(
                    "det time: {dt:.4f} | pose time: {pt:.4f} | post processing: {pn:.4f}".format(
                        dt=np.mean(runtime_profile["dt"]),
                        pt=np.mean(runtime_profile["pt"]),
                        pn=np.mean(runtime_profile["pn"]),
                    )
                )
        print_finish_info()

        while writer.running():
            time.sleep(1)
            print(
                "===========================> Rendering remaining "
                + str(writer.count())
                + " images in the queue..."
            )
        writer.stop()
        det_loader.stop()
    except Exception as e:
        print(repr(e))
        print("An error as above occurs when processing the images, please check it")
        pass
    except KeyboardInterrupt:
        print_finish_info()
        # Thread won't be killed when press Ctrl+C
        if args.sp:
            det_loader.terminate()
            while writer.running():
                time.sleep(1)
                print(
                    "===========================> Rendering remaining "
                    + str(writer.count())
                    + " images in the queue..."
                )
            writer.stop()
        else:
            # subprocesses are killed, manually clear queues
            det_loader.terminate()
            writer.terminate()
            writer.clear_queues()
            det_loader.clear_queues()
