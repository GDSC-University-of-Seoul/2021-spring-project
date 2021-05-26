import cv2
from imutils.video import FileVideoStream
from utils.files import check_file, save_pkl_file
from utils.logger import Logger
from pathlib import Path

logger = Logger()


class PlayVideoException(cv2.error):
    # FIXME : THIS IS TEMP CODE !
    # Will be moved to exc.py file
    def __init__(self) -> None:
        super().__init__()


def get_video_metainfo(config, meta):
    """
    Get meta infomation about video file
    """
    # Metadata configuration
    nframe = meta.header.frames
    size = (meta.size.width, meta.size.height)

    # If resize option is true in config, video frame size is followed that option
    if config["resize"]:
        size = (int(config["width"]), int(config["height"]))

    return nframe, size


def display_video(config, frame, stop_command="q"):
    """
    Display the video frame
    """
    assert frame is not None
    if config["display"] is False:
        return

    cv2.imshow("Frame", frame)
    if cv2.waitKey(1) & 0xFF == ord(stop_command):
        raise PlayVideoException


def extract_video(config, file, meta):
    """
    Extract frame data list from mp4 file
    """

    # Check the video file is actually exist
    input_video = FileVideoStream(check_file(file))

    # filename without only last extension
    basename = Path(file).stem

    # Metadata configuration
    nframe, size = get_video_metainfo(config, meta)
    logger.log(f"[{basename}] nframe: {nframe}, frame size: {size}")

    try:
        # Creating a frame data list from video information
        frames = list()

        # Run the video
        video_stream = input_video.start()
        while video_stream.more():
            frame = video_stream.read()

            if not video_stream.more():
                break

            frame = cv2.resize(frame, size)
            display_video(config, frame)

            frames.append(frame)

        logger.log(f"Total frame number of [{basename}] is {len(frames)} frames")

    except PlayVideoException:
        # When video is closed by user, this process will be closed
        logger.log("Video is Stopped")
        return

    finally:
        # Safely end video playback
        input_video.stop()
        cv2.destroyAllWindows()

    # FIXME : TEMPORARY CODE
    if config["write"]:
        save_pkl_file(save_dir="./data/pkl_dir", filename=basename, data=frames)
