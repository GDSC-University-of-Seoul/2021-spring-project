import glob
import xml.etree.ElementTree as ET
from pathlib import Path


def check_file(file):
    """
    Search for file if not found
    """
    if Path(file).is_file() or file == "":
        return file
    else:
        files = glob.glob("./**/" + file, recursive=True)  # find file

        FILE_NOT_FOUND_MSG = f"File Not Found: {file}"
        MULTIPLE_FILE_MSG = f"Multiple files match '{file}', specify exact path:{files}"

        assert len(files), FILE_NOT_FOUND_MSG  # assert file was found
        assert len(files) == 1, MULTIPLE_FILE_MSG  # assert unique
        return files[0]  # return file


def parse_children_node(root):
    """
    Parse the children of xml tree node
    """
    if len(root) == 0:
        text = root.text
        value = int(text) if text.isnumeric() else text
        return value

    data = dict()
    for item in root:
        if len(item) > 0:
            if data.get(item.tag) is None:
                data[item.tag] = list()
            data[item.tag].append(parse_children_node(item))
        else:
            data[item.tag] = parse_children_node(item)

    return data


def parse_xml(file: Path):
    check_file(file)  # Check the existency of the file

    doc = ET.parse(file)
    data = parse_children_node(doc.getroot())


parse_xml("E:/dataset/10-1/10-1_cam01_assault03_place07_night_spring.xml")
