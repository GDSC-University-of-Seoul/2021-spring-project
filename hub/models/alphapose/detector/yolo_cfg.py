from easydict import EasyDict as edict

cfg = edict()
cfg.CONFIG = "detector/yolo/cfg/yolov3-spp.cfg"
cfg.WEIGHTS = "detector/yolo/cfg/yolov3-spp.weights"
cfg.INP_DIM = 608
cfg.NMS_THRES = 0.5
cfg.CONFIDENCE = 0.6
cfg.NUM_CLASSES = 1
