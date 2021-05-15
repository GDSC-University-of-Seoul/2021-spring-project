import os
import yaml
import argparse
from utils.files import search_file
from utils.video import open_video
from utils.logger import Logger
from utils.general import check_git_status, check_requirements
from metadata import load_metadata, MetaData


logger = Logger()


def train(opt, config):
    """
    Train the model
    """
    # Process id for checking memory
    logger.log(f"Model Train is start Pid( {os.getpid()} )")

    logger.log(f"Load Metadata Files")
    metadata = load_metadata(config, external_log=logger)

    logger.log(f"All Metadata Files are converted to Data  : {len(metadata)}")

    for metafile in metadata:
        video_file = search_file(config["train"], filename=metafile.filename)
        open_video(config, video_file, metafile)  # Debug code


if __name__ == "__main__":
    # Check status
    check_git_status()
    check_requirements()

    # Argument options
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--data", type=str, default="data/model.yml", help="model.yml path"
    )
    opt = parser.parse_args()

    # Configuration
    with open(opt.data) as f:
        config = yaml.safe_load(f)

    try:
        train(opt, config)
    except KeyboardInterrupt:
        logger.warn(f"Abort! (KeyboardInterrupt)")
