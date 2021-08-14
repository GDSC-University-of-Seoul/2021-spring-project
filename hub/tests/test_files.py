import sys
import os

sys.path.append("C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\")
from utils.files import *

def test_return_dirlist():  #폴더 목록이 맞는지 확인
    # 정상적으로 작동해야 하는 결과
    __list=['C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data\\cctv1', 'C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data\\cctv2', 'C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data\\cctv3', 'C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data\\cctv4']

    # 실행시켰을 때 결과
    path="C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\models\\data"
    list=dirlist(path)

    # 결과 비교
    assert __list == list , f"Wrong list of folder in {path}"
'''
def test_return_checkdir1():
  asasfsdaasdfsd
  # 있는 파일 true

def test_return_checkdir2():
  asasfsdaasdfsd
  # 없는 파일 false
'''