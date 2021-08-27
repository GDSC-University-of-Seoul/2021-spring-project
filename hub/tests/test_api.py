# sys.path.append("C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub\\")
from utils.api import *

###
# test run_model
###
def test_runmodel_anomaly_type():  # TODO
    """
    test returning anomaly type when anomal change
    anomal에 따라 anomaly_type이 정상적으로 바뀌어 나오는지 확인
    """
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
