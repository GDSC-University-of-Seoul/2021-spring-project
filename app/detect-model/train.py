import yaml
import argparse
from utils.parser import parse_xml
from utils.files import search_file
from utils.video import open_video


def load_metadata(config):
    """
    Load metadata
    """

    metadata = list()

    # Debug option
    if config["debug"]["load-metadata"] is False:
        return metadata

    # Search xml file in directory
    files = search_file(config["train"], extension="xml")
    for file in files:
        metadata.append(parse_xml(file))

    return metadata


def train(opt):
    """
    Train the model
    """
    # Stage 0. Load the Model Setting
    with open(opt.data) as f:
        config = yaml.safe_load(f)

    load_metadata(config)

    files = search_file(config["train"], extension="mp4")
    # FIXME : cv::OutOfMemoryError problem
    # for file in files:
    #     video_file = open_video(config, file)
    open_video(config, files[0])  # Debug code


if __name__ == "__main__":
    # Argument options
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--data", type=str, default="data/model.yml", help="model.yml path"
    )
    opt = parser.parse_args()

    train(opt)
