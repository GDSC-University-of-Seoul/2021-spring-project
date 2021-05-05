import yaml
import argparse
from utils.parser import parse_xml
from utils.files import search_file


def train(opt):
    with open(opt.data) as f:
        data_dict = yaml.safe_load(f)

    dirpath = data_dict["train"]
    files = search_file(dirpath, extension="xml")

    data = list()
    for file in files:
        data.append(parse_xml(file))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--data", type=str, default="data/model.yml", help="model.yml path"
    )
    opt = parser.parse_args()

    train(opt)
