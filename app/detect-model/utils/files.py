import glob
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

