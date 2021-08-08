"""
config.py

"""
import yaml
import argparse


class Config:
    """
    Configuration setting
    """
    def __init__(self):
        # Configuration setting
        args = self.parse_arguments()
        configs = self.load_config(args.config)

        # Parameter        
        self.data = configs["data"]
        self.scheduler = configs["scheduler"]
        self.server = configs["server"]
        
    def parse_arguments(self):
        """
        Get configuration environment for program

        params:
            --config : config.yaml path option
        """
        parser = argparse.ArgumentParser()
        parser.add_argument(
            "--config",
            type=str,
            default="config.yml",
            help="please input the config yaml path",
        )

        return parser.parse_args()

    def load_config(self, config_path):
        """
        Load yaml file settings

        params:
            opt    console/default using config option

        """

        with open(config_path) as f:
            config = yaml.safe_load(f)

        return config

