set -x

CONFIG=${1:-"./configs/coco/resnet/256x192_res50_lr1e-3_1x.yaml"}
CKPT=${2:-"./pretrained_models/fast_res50_256x192.pth"}
VIDEO=${3:"./examples/demo/resized2.mp4"}
OUTDIR=${4:-"./examples/res"}

python scripts/demo_inference.py \
    --cfg ${CONFIG} \
    --checkpoint ${CKPT} \
    --video ${VIDEO} \
    --outdir ${OUTDIR} \
    --detector yolo  --save_img --save_video --vis
