import os
import cv2
import time
import numpy as np
from imutils.video import FileVideoStream
from numpy import empty
from utils.files import search_file, check_file, load_pkl_file, save_pkl_file
from utils.logger import Logger

logger = Logger()


def open_video(config, file, meta):
    check_file(file)
    input_video = FileVideoStream(file)
    basename = os.path.basename(file[:-4])

    video_stream = input_video.start()
    time.sleep(1.0)

    nframe = meta.header.frames

    video_config = config["model"]["video"]
    size = (
        (meta.size.width, meta.size.height)
        if video_config["resize"] is False
        else (int(video_config.get("width")), int(video_config.get("height")))
    )

    frames = list()
    logger.log(f"[{basename}] nframe: {nframe},  size: {size}")

    while video_stream.more():
        if len(frames) % 500 == 0:
            logger.log(f"{len(frames)} frames")

        frame = video_stream.read()
        if not video_stream.more():
            logger.log(f"{len(frames)} frames")
            break
        try:
            frame = cv2.resize(frame, size)
            frames.append(frame)

            # Debug option
            if config["debug"]["show-video"] is True:
                cv2.imshow("Frame", frame)

                if cv2.waitKey(1) & 0xFF == ord("q"):
                    break

        except Exception as e:
            print(e)
            break

    input_video.stop()
    cv2.destroyAllWindows()

    pkl_file = f"{os.path.basename(file[:-4])}.pkl"
    save_pkl_file(save_dir="./data", filename=pkl_file, data=frames)

    return frames
