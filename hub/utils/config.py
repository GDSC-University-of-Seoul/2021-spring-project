"""
config.py

"""
import yaml
import argparse


def get_configs(opt=None):
    """
    Load yaml file settings

    params:
        opt    console/default using config option

    return:
        config configuration json dict
    """

    # Get arguments (console or default)
    opt = opt if opt else get_args()

    # Open and Load configuration file
    with open(opt.data) as f:
        config = yaml.safe_load(f)

    return config


def get_args():
    """
    Get configuration environment for program

    params:
        --data : config.yaml path option
    """

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--data",
        type=str,
        default="config.yml",
        help="please input the config yaml path",
    )

    return parser.parse_args()
