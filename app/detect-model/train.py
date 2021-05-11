import yaml
import argparse
from utils.files import search_file
from utils.video import open_video
from utils.logger import Logger
from metadata import load_metadata, print_metadata

logger = Logger()


def train(opt):
    """
    Train the model
    """
    # Stage 0. Load the Model Setting
    with open(opt.data) as f:
        config = yaml.safe_load(f)

    metadata = load_metadata(config)

    for data in metadata:
        print_metadata(data)

    files = search_file(config["train"], extension="mp4")

    # FIXME : cv::OutOfMemoryError problem
    # for file in files:
    # video_file = open_video(config, file)
    # open_video(config, files[0])  # Debug code
    # open_video(config, files[1])  # Debug code


if __name__ == "__main__":
    # Argument options
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--data", type=str, default="data/model.yml", help="model.yml path"
    )
    opt = parser.parse_args()

    train(opt)
