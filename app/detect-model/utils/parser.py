import xml.etree.ElementTree as ET
from pathlib import Path
from utils.files import check_file


def parse_xml_tree(root):
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
            data[item.tag].append(parse_xml_tree(item))
        else:
            data[item.tag] = parse_xml_tree(item)

    return data


def parse_xml(file: Path):
    """
    Parse the XML files in a tree structure.
    """
    check_file(file)  # Check the existency of the file

    doc = ET.parse(file)
    data = parse_xml_tree(doc.getroot())
    return data
