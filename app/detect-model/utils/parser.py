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
    for i, item in enumerate(root):
        tag = item.tag
        if len(item) > 0:
            if tag in data:
                temp = data[tag]
                if type(data[tag]) is not list:
                    data[tag] = list()
                    data[tag].append(temp)
                data[tag].append(parse_xml_tree(item))
                
            elif data.get(tag) is None:
                data[tag] = parse_xml_tree(item)
            else:
                print(item)
                print(f"Bamm : {tag}")
                data[tag] = parse_xml_tree(item)
        else:
            data[tag] = parse_xml_tree(item)

    return data


def parse_xml(file: Path):
    """
    Parse the XML files in a tree structure.
    """
    check_file(file)  # Check the existency of the file

    doc = ET.parse(file)
    data = parse_xml_tree(doc.getroot())
    return data
