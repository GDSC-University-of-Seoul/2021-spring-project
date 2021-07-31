import os
import yaml
import argparse
from utils.general import check_git_status, check_requirements
from utils.logger import Logger
from models.utils.files import search_file
from models.utils.video import extract_video
from metadata import load_metadata

logger = Logger().get_logger()


def train(opt, config):
    """
    Train the model
    """
    # Process id for checking memory
    logger.info(f"Model Train is start Pid( {os.getpid()} )")

    # Load metadata files and convert to data (pkl file)
    logger.info(f"Load Metadata Files")
    metadata = load_metadata(config["metadata"], external_log=logger)
    logger.info(f"All Metadata Files are converted to Data  : {len(metadata)}")

    # Extract data frame list from video data files
    for metafile in metadata:
        videofile = search_file(config["dataset"]["directory"], metafile.filename)
        extract_video(config["video"], videofile, metafile)


def main():
    # Argument options
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--data", type=str, default="model_config.yml", help="model.yml path"
    )
    opt = parser.parse_args()

    # Configuration
    with open(opt.data) as f:
        config = yaml.safe_load(f)

    try:
        train(opt, config)
    except KeyboardInterrupt:
        logger.warn(f"Abort! (KeyboardInterrupt)")

    logger.info("Main Process")


if __name__ == "__main__":
    check_git_status()
    # check_requirements()
    main()
