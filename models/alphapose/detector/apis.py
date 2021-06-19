# -----------------------------------------------------
# Copyright (c) Shanghai Jiao Tong University. All rights reserved.
# Written by Chao Xu (xuchao.19962007@sjtu.edu.cn)
# -----------------------------------------------------

"""API of detector"""
from abc import ABC, abstractmethod
from detector.yolo_api import YOLODetector
from detector.yolo_cfg import cfg


def get_detector(opt=None):
    return YOLODetector(cfg, opt)
