import cv2
from utils.files import search_file, check_file
from utils.logger import Logger

logger = Logger()

def open_video(config, file):
    check_file(file)
    input_video = cv2.VideoCapture(file)
    assert input_video.isOpened(), "VIDEO IS NOT OPENED"

    input_video.set(cv2.CAP_PROP_FRAME_WIDTH, 160)
    input_video.set(cv2.CAP_PROP_FRAME_HEIGHT, 120)

    fps = round(input_video.get(cv2.CAP_PROP_FPS))
    nframe = int(input_video.get(cv2.CAP_PROP_FRAME_COUNT))
    size = (
        int(input_video.get(cv2.CAP_PROP_FRAME_WIDTH)),
        int(input_video.get(cv2.CAP_PROP_FRAME_HEIGHT)),
    )

    # frame_rates = 100 // fps - 1
    frames = list()
    logger.log(f'{file} fps: {fps},  nframe: {nframe},  size: {size}')

    if config["model"]["frame"]:
        frame_config = config["model"]["frame"]
        frame_size = (frame_config["width"], frame_config["height"])
        size = frame_size

    # Exception Handling - Out of Memory
    try:
        count = 0 # Temporary Debug Code 
        while input_video.isOpened():
            count+=1
            if count % 100 == 0:
                logger.log(f"{count} frames")
            # Capture frame-by-frame
            ret, frame = input_video.read()
            if ret is False:
                break

            frame = cv2.resize(frame, size)
            frames.append(frame)

            # Debug option
            if config["debug"]["show-video"] is True:
                cv2.imshow("Frame", frame)

                if cv2.waitKey(1) & 0xFF == ord("q"):
                    break
    except cv2.error:
        raise

    finally:
        input_video.release()
        cv2.destroyAllWindows()

