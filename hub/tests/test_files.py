import os
from utils.files import *

###
# test dirlist
###
def test_dirlist_folders_list():
    """
    test returning the subfolders list
    폴더 목록이 맞는지 확인
    """
    # 정상적으로 작동해야 하는 결과
    __dir_list = [
        ".\\testdata\\testdata2",
        ".\\testdata\\testdata3",
    ]

    # 실행시켰을 때 결과
    path = ".\\testdata"
    dir_list = dirlist(path)

    # 결과 비교
    FOUND_WRONG_LIST_MSG = f"Wrong list of folder in {path}"
    assert __dir_list == dir_list, FOUND_WRONG_LIST_MSG


###
# test check_dir
###
def test_checkdir_exist_folder():
    """
    test returning True if there was the folder
    폴더 존재시 True 반환 확인
    """
    # 정상적으로 작동해야 하는 결과
    __dircheck = True

    # 실행시켰을 때 결과
    path = ".\\testdata"
    dircheck = check_dir(path, force=True)

    # 결과 비교
    FILE_NOT_FOUND_MSG = f"Couldn't recognize folder on {path}"
    assert __dircheck == dircheck, FILE_NOT_FOUND_MSG


def test_checkdir_none_folder():
    """
    test returning False or make path if there wasn't the folder
    폴더 부재시 False or 경로 생성
    """
    # 정상적으로 작동해야 하는 결과
    __dir_making = True
    __dir_none_making = False

    # 실행시켰을 때 결과
    path = ".\\data"
    dircheck = check_dir(path, force=False)
    check_dir(path, force=True)

    # 결과 비교
    FOUND_WRONG_FOLDER_MSG = f"wrong recognize folder on {path}"
    NO_MAKE_FOLDER_MSG = f"Couldn't make folder on {path}"
    assert dircheck == __dir_none_making, FOUND_WRONG_FOLDER_MSG
    assert __dir_making == os.path.isdir(path), NO_MAKE_FOLDER_MSG


###
# test check_file
###
def test_checkfile_search_path():
    """
    test checking the file when it takes the path
    경로가 있을 때 존재하는 파일 찾기
    """
    # 정상적으로 작동해야 하는 결과
    __file = ".\\testdata\\testmp4.mp4"

    # 실행시켰을 때 결과
    path = ".\\testdata\\testmp4.mp4"
    file = check_file(path)

    # 결과 비교
    FILE_NOT_FOUND_MSG = f"Couldn't recognize file {__file}"
    assert __file == file, FILE_NOT_FOUND_MSG


def test_checkfile_search_name():
    """
    test checking the file when it takes the file name
    파일명이 있을 때 소속 폴더 내에서 찾기
    """
    # 정상적으로 작동해야 하는 결과
    __file = ".\\testdata\\testmp4.mp4"

    # 실행시켰을 때 결과
    filename = "testmp4.mp4"
    file = check_file(filename)

    # 결과 비교
    FILE_NOT_FOUND_MSG = f"Couldn't search file name {file}"
    assert __file == file, FILE_NOT_FOUND_MSG


###
# test search_file
###
def test_searchfile_one_file():
    """
    test searching the file if there was one file when it takes the file name
    파일이 하나만 있을 때(파일명 지정)
    """
    # 정상적으로 작동해야 하는 결과
    __file = ".\\testdata\\testmp4.mp4"

    # 실행시켰을 때 결과
    directory = ".\\testdata"
    file = search_file(directory, filename="testmp4.mp4", recursive=True, extension=None)

    # 결과 비교
    FILE_NOT_FOUND_MSG = f"File is not found : {file}"
    assert __file == file, FILE_NOT_FOUND_MSG


def test_searchfile_files_list():
    """
    test searching the files if there were some files when it takes the file name
    파일이 여러 개 있을 때(파일명 지정)
    """
    # 정상적으로 작동해야 하는 결과
    __files = [
        ".\\testdata\\test2mp4.mp4",
        ".\\testdata\\testdata2\\test2mp4.mp4",
    ]

    # 실행시켰을 때 결과
    directory = ".\\testdata"
    filename = "test2mp4.mp4"
    files = search_file(directory, filename, recursive=True, extension=None)

    # 결과 비교
    FOUND_WRONG_LIST_MSG = f"Couldn't read all file list about {filename} on {directory}"
    assert __files == files, FOUND_WRONG_LIST_MSG


def test_searchfile_all_files():
    """
    test returning the all files list (include subfolders' one)
    폴더 안 모든 파일 리스트 출력(하위 폴더 포함)
    """
    # 정상적으로 작동해야 하는 결과
    __files = [
        ".\\testdata\\",
        ".\\testdata\\test2mp4.mp4",
        ".\\testdata\\testdata2",
        ".\\testdata\\testdata2\\test2mp4.mp4",
        ".\\testdata\\testdata3",
        ".\\testdata\\testmp4.mp4",
        ".\\testdata\\testtxt.txt",
    ]

    # 실행시켰을 때 결과
    directory = ".\\testdata"
    files = search_file(directory, filename=None, recursive=True, extension=None)

    # 결과 비교
    FOUND_WRONG_LIST_MSG = f"Couldn't read all file list on {directory} (include subfolders)"
    assert __files == files, FOUND_WRONG_LIST_MSG


def test_searchfile_mp4_files():
    """
    test returning the all .mp4 files list (include subfolders' one)
    폴더 안 모든 mp4 파일 리스트 출력(하위 폴더 포함)
    """
    # 정상적으로 작동해야 하는 결과
    __files = [
        ".\\testdata\\test2mp4.mp4",
        ".\\testdata\\testmp4.mp4",
        ".\\testdata\\testdata2\\test2mp4.mp4",
    ]

    # 실행시켰을 때 결과
    directory = ".\\testdata"
    extension = "mp4"
    files = search_file(directory, filename=None, recursive=True, extension="mp4")

    # 결과 비교
    FOUND_WRONG_LIST_MSG = f"Couldn't read all {extension} file list on {directory}"
    assert __files == files, FOUND_WRONG_LIST_MSG


def test_searchfile_parentfolder():
    """
    test returning the all files list (NOT include subfolders' one)
    폴더 안 모든 파일 리스트 출력(하위 폴더 미포함)
    """
    # 정상적으로 작동해야 하는 결과
    __files = [
        ".\\testdata\\test2mp4.mp4",
        ".\\testdata\\testdata2",
        ".\\testdata\\testdata3",
        ".\\testdata\\testmp4.mp4",
        ".\\testdata\\testtxt.txt",
    ]
    # 실행시켰을 때 결과
    directory = ".\\testdata"
    files = search_file(directory, filename=None, recursive=False, extension=None)

    # 결과 비교
    FOUND_WRONG_LIST_MSG = f"Couldn't read all file list on {directory}"
    assert __files == files, FOUND_WRONG_LIST_MSG
