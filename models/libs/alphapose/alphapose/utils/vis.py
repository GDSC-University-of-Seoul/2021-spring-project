import math
import time

import cv2
import numpy as np
import torch

RED = (0, 0, 255)
GREEN = (0, 255, 0)
BLUE = (255, 0, 0)
CYAN = (255, 255, 0)
YELLOW = (0, 255, 255)
ORANGE = (0, 165, 255)
PURPLE = (255, 0, 255)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

DEFAULT_FONT = cv2.FONT_HERSHEY_SIMPLEX

L_PAIR = [
    # Head
    (0, 1), (0, 2), (1, 3), (2, 4),
    
    # Body
    (5, 6), (5, 7), (7, 9), (6, 8),
    (8, 10), (17, 11), (17, 12),  
    
    (11, 13), (12, 14), (13, 15), (14, 16),
]

P_COLOR = [
    # Nose, LEye, REye, LEar, REar
    (0, 255, 255), (0, 191, 255), (0, 255, 102),
    (0, 77, 255), (0, 255, 0),

    # LShoulder, RShoulder, LElbow, RElbow, LWrist, RWrist
    (77, 255, 255), (77, 255, 204),
    (77, 204, 255), (191, 255, 77),
    (77, 191, 255), (191, 255, 77),  
    
    # LHip, RHip, LKnee, Rknee, LAnkle, RAnkle, Neck
    (204, 77, 255), (77, 255, 204),
    (191, 77, 255), (77, 255, 191),
    (127, 77, 255), (77, 255, 127),
    (0, 255, 255),
]  

LINE_COLOR = [
    (0, 215, 255), (0, 255, 204), (0, 134, 255), (0, 255, 50),
    (77, 255, 222), (77, 196, 255), (77, 135, 255), (191, 255, 77),
    (77, 255, 77), (77, 222, 255), (255, 156, 127),
    (0, 127, 255), (255, 127, 77), (0, 77, 255), (255, 77, 36),
]


def get_color(idx):
    idx = idx * 3
    color = ((37 * idx) % 255, (17 * idx) % 255, (29 * idx) % 255)

    return color


def get_color_fast(idx):
    color_pool = [RED, GREEN, BLUE, CYAN, YELLOW, ORANGE, PURPLE, WHITE]
    color = color_pool[idx % 8]

    return color


def vis_frame_fast(frame, im_res, opt):
    """
    frame: frame image
    im_res: im_res of predictions

    return rendered image
    """

    l_pair = L_PAIR
    p_color = P_COLOR
    line_color = LINE_COLOR

    img = frame.copy()
    for human in im_res["result"]:
        part_line = {}
        kp_preds = human["keypoints"]
        kp_scores = human["kp_score"]

        kp_preds = torch.cat(
            (kp_preds, torch.unsqueeze((kp_preds[5, :] + kp_preds[6, :]) / 2, 0))
        )
        kp_scores = torch.cat(
            (kp_scores, torch.unsqueeze((kp_scores[5, :] + kp_scores[6, :]) / 2, 0))
        )
        color = BLUE

        # Draw bboxes
        if opt.showbox:
            if "box" in human.keys():
                bbox = human["box"]
                bbox = [
                    bbox[0],
                    bbox[0] + bbox[2],
                    bbox[1],
                    bbox[1] + bbox[3],
                ]  # xmin,xmax,ymin,ymax

            cv2.rectangle(
                img,
                (int(bbox[0]), int(bbox[2])),
                (int(bbox[1]), int(bbox[3])),
                color,
                2,
            )
        # Draw keypoints
        vis_thres = 0.4
        for n in range(kp_scores.shape[0]):
            if kp_scores[n] <= vis_thres:
                continue
            cor_x, cor_y = int(kp_preds[n, 0]), int(kp_preds[n, 1])
            part_line[n] = (cor_x, cor_y)

            if n < len(p_color):
                cv2.circle(img, (cor_x, cor_y), 3, p_color[n], -1)
            else:
                cv2.circle(img, (cor_x, cor_y), 1, (255, 255, 255), 2)
        
        # Draw limbs
        for i, (start_p, end_p) in enumerate(l_pair):
            if start_p in part_line and end_p in part_line:
                start_xy = part_line[start_p]
                end_xy = part_line[end_p]
                if i < len(line_color):
                    cv2.line(
                        img,
                        start_xy,
                        end_xy,
                        line_color[i],
                        2 * int(kp_scores[start_p] + kp_scores[end_p]) + 1,
                    )
                else:
                    cv2.line(img, start_xy, end_xy, (255, 255, 255), 1)

    return img


def vis_frame(frame, im_res, opt):
    """
    frame: frame image
    im_res: im_res of predictions

    return rendered image
    """

    l_pair = L_PAIR
    p_color = P_COLOR
    line_color = LINE_COLOR
    
    img = frame.copy()
    for human in im_res["result"]:
        part_line = {}
        kp_preds = human["keypoints"]
        kp_scores = human["kp_score"]

        kp_preds = torch.cat(
            (kp_preds, torch.unsqueeze((kp_preds[5, :] + kp_preds[6, :]) / 2, 0))
        )
        kp_scores = torch.cat(
            (kp_scores, torch.unsqueeze((kp_scores[5, :] + kp_scores[6, :]) / 2, 0))
        )
        color = BLUE

        # Draw bboxes
        if opt.showbox:
            if "box" in human.keys():
                bbox = human["box"]
                bbox = [
                    bbox[0],
                    bbox[0] + bbox[2],
                    bbox[1],
                    bbox[1] + bbox[3],
                ]  # xmin,xmax,ymin,ymax
            # color = get_color_fast(int(abs(human['idx'][0][0])))
            cv2.rectangle(
                img,
                (int(bbox[0]), int(bbox[2])),
                (int(bbox[1]), int(bbox[3])),
                color,
                1,
            )

        # Draw keypoints
        vis_thres = 0.4
        for n in range(kp_scores.shape[0]):
            if kp_scores[n] <= vis_thres:
                continue
            cor_x, cor_y = int(kp_preds[n, 0]), int(kp_preds[n, 1])
            part_line[n] = (int(cor_x), int(cor_y))

            bg = img.copy()
            if n < len(p_color):
                cv2.circle(bg, (int(cor_x), int(cor_y)), 2, p_color[n], -1)
            else:
                cv2.circle(bg, (int(cor_x), int(cor_y)), 1, (255, 255, 255), 2)
            # Now create a mask of logo and create its inverse mask also
            if n < len(p_color):
                transparency = float(max(0, min(1, kp_scores[n])))
            else:
                transparency = float(max(0, min(1, kp_scores[n] * 2)))
            img = cv2.addWeighted(bg, transparency, img, 1 - transparency, 0)
        
        # Draw limbs
        for i, (start_p, end_p) in enumerate(l_pair):
            if start_p in part_line and end_p in part_line:
                start_xy = part_line[start_p]
                end_xy = part_line[end_p]
                bg = img.copy()

                X = (start_xy[0], end_xy[0])
                Y = (start_xy[1], end_xy[1])
                mX = np.mean(X)
                mY = np.mean(Y)
                length = ((Y[0] - Y[1]) ** 2 + (X[0] - X[1]) ** 2) ** 0.5
                angle = math.degrees(math.atan2(Y[0] - Y[1], X[0] - X[1]))
                stickwidth = (kp_scores[start_p] + kp_scores[end_p]) + 1
                polygon = cv2.ellipse2Poly(
                    (int(mX), int(mY)),
                    (int(length / 2), int(stickwidth)),
                    int(angle),
                    0,
                    360,
                    1,
                )
                if i < len(line_color):
                    cv2.fillConvexPoly(bg, polygon, line_color[i])
                else:
                    cv2.line(bg, start_xy, end_xy, (255, 255, 255), 1)
                if n < len(p_color):
                    transparency = float(
                        max(
                            0,
                            min(1, 0.5 * (kp_scores[start_p] + kp_scores[end_p]) - 0.1),
                        )
                    )
                else:
                    transparency = float(
                        max(0, min(1, (kp_scores[start_p] + kp_scores[end_p])))
                    )

                # transparency = float(max(0, min(1, 0.5 * (kp_scores[start_p] + kp_scores[end_p])-0.1)))
                img = cv2.addWeighted(bg, transparency, img, 1 - transparency, 0)
    return img


def getTime(time1=0):
    if not time1:
        return time.time()
    else:
        interval = time.time() - time1
        return time.time(), interval
