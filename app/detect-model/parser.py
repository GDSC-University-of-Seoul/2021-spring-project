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
    """
    Parse the XML files in a tree structure.
    """
    check_file(file)  # Check the existency of the file

    doc = ET.parse(file)
    data = parse_children_node(doc.getroot())
    return data


def search_sub_directory(directory: Path, recursive=True, extension=None):
    """
    Find the target path
    """
    assert Path(directory).exists(), "Path is not existence"
    assert Path(directory).is_dir(), "Path should be direcory"

    target_file = directory + "/**"
    if extension:
        target_file = target_file + "/*." + extension

    files = glob.glob(target_file, recursive=recursive)
    assert len(files), "No files is not founded : "
    return files


if __name__ == "__main__":
    dirpath = "FILEPATH"  # config로 대체 예정
    files = search_sub_directory(dirpath, extension="xml")

    data = list()
    for file in files:
        data.append(parse_xml(file))
