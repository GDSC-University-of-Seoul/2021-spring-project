import yaml
import argparse

def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", type=str, default="config.yml", help="please input the config yaml path")

    return parser.parse_args()
    
def get_configs(opt=None):
    opt = opt if opt else get_args()
    
    with open(opt.data) as f:
        config = yaml.safe_load(f)

    return config