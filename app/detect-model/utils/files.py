import os
import glob
import pickle
from pathlib import Path


def check_file(file: Path):
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


def search_file(directory: Path, filename=None, recursive=True, extension=None):
    """
    Find the target path
    """
    assert Path(directory).exists(), "Path is not existence"
    assert Path(directory).is_dir(), "Path should be direcory"

    target_file = directory + "/**"
    if filename:
        target_file = target_file + "/" + filename

    if extension:
        target_file = target_file + "/*." + extension

    files = glob.glob(target_file, recursive=recursive)
    if len(files) == 1:
        return files[0]

    assert len(files), f"No files is not founded : {target_file}"
    return files


def load_pkl_file(load_dir, filename):
    filepath = os.path.join(load_dir, filename)
    print(f">> Load dataset from ({filepath})")

    with open(check_file(filepath), "rb") as pkl:
        data = pickle.load(pkl)
    return data


def save_pkl_file(save_dir, filename, data):
    filepath = os.path.join(save_dir, filename)
    print(f">> Write dataset to ({filepath})")

    with open(filepath, "wb") as pkl:
        pickle.dump(data, pkl, protocol=pickle.HIGHEST_PROTOCOL)
