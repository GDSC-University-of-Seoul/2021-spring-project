from utils.parser import parse_xml
from utils.files import search_file


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
    for file in files[:1]:
        metadata.append(parse_xml(file))

    return metadata


def print_metadata(metadata, level=1):
    line = ">".rjust((level * 2), " ")

    for key in metadata:
        value = metadata[key]
        if type(value) is dict:
            print_metadata(value, level=level + 1)
        elif type(value) is list:
            print(f"{line} {key:10}")
            for vv in value:
                print_metadata(vv, level=level + 1)
        else:
            print(f"{line} {key:10} : {value}")
