import sys
import os

sys.path.append("C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\")
from utils.files import *

###
# test dirlist
###
def test_dirlist_return():  # 폴더 목록이 맞는지 확인
    # 정상적으로 작동해야 하는 결과
    __list = [
        "C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data\\cctv1",
        "C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data\\cctv2",
        "C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data\\cctv3",
        "C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data\\cctv4",
    ]

    # 실행시켰을 때 결과
    path = "C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data"
    list = dirlist(path)

    # 결과 비교
    assert __list == list, f"Wrong list of folder in {path}"


###
# test check_dir
###
def test_checkdir_return_true():  # 폴더 존재시 True 반환 확인
    # 정상적으로 작동해야 하는 결과
    __check = True  # 폴더가 존재

    # 실행시켰을 때 결과
    path = "C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data"
    check = check_dir(path, True)

    # 결과 비교
    assert __check == check, f"Couldn't recognize folder on {path}"


def test_checkdir_return_false():  # 폴더 부재시 false or 경로 생성
    # 정상적으로 작동해야 하는 결과
    __making = True
    __none_making = False

    # 실행시켰을 때 결과
    path = "C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\tests\\data"
    check = check_dir(path, False)
    check_dir(path, True)

    # 결과 비교
    assert (
        check == __none_making
    ), f"wrong recognize folder on {path}"  # 파일이 없다는 걸 인지했는지 확인
    assert __making == os.path.isdir(
        path
    ), f"Couldn't make folder on {path}"  # 폴더를 제대로 생성했는지 확인


###
# test check_file
###
def test_checkfile_search_path():  # 경로가 있을 때 존재하는 파일 찾기
    # 정상적으로 작동해야 하는 결과
    __file = "C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data\\cctv1\\cctv1-2021-07-17.mp4"

    # 실행시켰을 때 결과
    path = "C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data\\cctv1\\cctv1-2021-07-17.mp4"
    file = check_file(path)

    # 결과 비교
    assert __file == file, f"Couldn't recognize file {__file}"


def test_checkfile_search_name():  # 파일명이 있을 때 소속 폴더 내에서 찾기
    # 정상적으로 작동해야 하는 결과
    __file = ".\\testdata\\testmp4.mp4"

    # 실행시켰을 때 결과
    name = "testmp4.mp4"
    file = check_file(name)

    # 결과 비교
    assert __file == file, f"Couldn't search file name {file}"


###
# test search_file
###
"""
def test_searchfile_one():  # 파일이 하나만 있을 때
    # 정상적으로 작동해야 하는 결과
    __files = ".\\"

    # 실행시켰을 때 결과
    # 결과 비교

def test_searchfile_list():  # 파일이 여러 개 있을 때
    # 정상적으로 작동해야 하는 결과
    # 실행시켰을 때 결과
    # 결과 비교
"""
