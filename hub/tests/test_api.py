# run_model test
# anomal == True 일 때 return이 넣은 output과 동일한지(dummy data) --> test_dummy_respone
# anomal의 종류에 따라서 원하는 output이 나오는지(anomaly_type, start_time, end_time 변화) --> test_anomaly_type

import sys
import os

sys.path.append("C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\")
from utils.api import run_model  # **


# run_model 구동 결과가 dummydata와 다르면 에러메세지 출력(단순 리턴값 확인)
def test_dummy_respone():

    # 정상적으로 작동해야 하는 결과
    __anomal: bool = False
    __output: dict = {
        "video": {
            "record_date": "2021-07-17 21:00:00",
            "cctv_mac": "125454545460",
            "storage_name": "models/data/cctv1",
        },
        "anomaly_type": None,
        "start_time": None,
        "end_time": None,
    }

    # 실행시켰을 때 결과
    dirpath = "models/data/cctv1"
    file = "cctv1-2021-07-17.mp4"

    (anomal, output) = run_model(dirpath, file)

    # 결과 비교(anomal, output 따로)
    assert anomal == __anomal, f"anomal event return {anomal} ({__anomal})"
    assert output == __output, f"cctv output return {output} ({__output})"


# anomal에 따라 output의 anomaly_type이 정상적으로 바뀌어 나오는지 확인(차후 수정)
def test_anomaly_type():
    # 정상적으로 작동해야 하는 결과
    _anomal_assault = True
    _type_assault = "폭행"

    # 실행시켰을 때 결과
    dirpath = "models/data/cctv1"
    file = "cctv1-2021-07-17.mp4"

    (anomal, output) = run_model(dirpath, file)

    # 결과 비교
    if anomal == _anomal_assault:  # anomal이 폭행을 가리킬 때
        anomaly_type = output["anomaly_type"]
        assert (  # anomaly_type이 "폭행"이 아니면 에러메세지 출력
            anomaly_type == _type_assault
        ), f"Wrong anomaly type {anomaly_type} return ({_type_assault})"
