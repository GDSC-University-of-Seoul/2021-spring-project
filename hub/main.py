from utils.general import check_git_status, check_requirements
from utils.logger import Logger


def main():
    logger = Logger().get_logger()
    logger.info("Main Process")


if __name__ == "__main__":
    # check_git_status()    # Current Git Error
    check_requirements()
    main()
