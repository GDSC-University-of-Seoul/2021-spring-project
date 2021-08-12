# run_model test
# anomal == True 일 때 return이 넣은 output과 동일한지(dummy data) --> test_dummy_respone
# anomal의 종류에 따라서 원하는 output이 나오는지(anomaly_type, start_time, end_time 변화) --> test_anomaly_type

import sys
import os

sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from utils.api import run_model  # **


# run_model 구동 결과가 dummydata와 다르면 에러메세지 출력(단순 리턴값 확인)
def test_dummy_respone():

    # 정상적으로 작동해야 하는 결과
    __anomal = True
    __output = {
        "video": {
            "record_date": "2021-07-17 21:00:00",
            "cctv_mac": "125454545460",
            "storage_name": "data/cctv1/",
        },
        "anomaly_type": "폭행",
        "start_time": "2021-07-17 00:00:00",
        "end_time": "2021-07-17 01:00:00",
    }

    # 실행시켰을 때 결과
    dirpath = "data/cctv1"
    file = "cctv1-2021-07-17.mp4"

    (anomal, output) = run_model(dirpath, file)

    # 결과 비교(anomal, output 따로)
    assert anomal == __anomal , "None anomal event return"
    assert output == __output , "output return error"

'''
# anomal에 따라 output의 anomaly_type이 정상적으로 바뀌어 나오는지 확인(차후 수정)
def test_anomaly_type(dirpath, filepath):
    (flag, data) = run_model(dirpath, filepath)
    if flag == True:  # anomal이 폭행을 가리킬 때
        assert (
            data["anomaly_type"] == "폭행"
        ), "Wrong anomaly type return"  # anomaly_type이 "폭행"으로 나와야 함
'''
