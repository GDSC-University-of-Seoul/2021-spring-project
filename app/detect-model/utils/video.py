import cv2
from utils.files import search_file, check_file


def open_video(config, file):
    check_file(file)

    input_video = cv2.VideoCapture(file)
    assert input_video.isOpened(), "VIDEO IS NOT OPENED"
    print(f"File is opened : {file}")

    input_video.set(cv2.CAP_PROP_FRAME_WIDTH, 160)
    input_video.set(cv2.CAP_PROP_FRAME_HEIGHT, 120)

    fps = round(input_video.get(cv2.CAP_PROP_FPS))
    nframe = int(input_video.get(cv2.CAP_PROP_FRAME_COUNT))
    size = (
        int(input_video.get(cv2.CAP_PROP_FRAME_WIDTH)),
        int(input_video.get(cv2.CAP_PROP_FRAME_HEIGHT)),
    )

    frame_rates = 100 // fps - 1
    frames = list()
    while input_video.isOpened():
        # Capture frame-by-frame
        ret, frame = input_video.read()
        if ret is False:
            break

        frames.append(frame)
        # Debug option
        if config["debug"]["show-video"] is True:
            resized_frame = cv2.resize(frame, (1280, 720))
            cv2.imshow("Frame", resized_frame)

            if cv2.waitKey(1) & 0xFF == ord("q"):
                break

    input_video.release()

    cv2.destroyAllWindows()

    return frame
