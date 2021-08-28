# FIXME (delete sys)
import sys
from pathlib import Path

sys.path.append("C:\\Users\\user\\Documents\\GitHub\\2021-spring-project\\hub")
from clients.hub import *

###
# test run_model
###
def test_run_anomaly_type():
    """
    test returning anomaly type when anomal change
    anomal에 따라 anomaly_type이 정상적으로 바뀌어 나오는지 확인
    """
    # 정상적으로 작동해야 하는 결과 (TODO)
    __anomal_assault = True
    __type_assault = "폭행"

    # 실행시켰을 때 결과
    path = ".\\tests\\hub_testdata"
    (anomal, output) = VideoClient(path).run()

    # 결과 비교 (else 코드 TODO)
    if anomal == __anomal_assault:
        anomaly_type = output["anomaly_type"]
        WRONG_ANOMALY_TYPE_MSG = (
            f"Wrong anomaly type {anomaly_type} return ({__type_assault})"
        )
        assert anomaly_type == __type_assault, WRONG_ANOMALY_TYPE_MSG
    else:
        anomaly_type = output["anomaly_type"]
        ANOMAL_NOT_FOUND_MSG = "There is no anomal alert return"
        RETURN_ANOTHER_ANOMAL_MSG = (
            f"Found another anomal alert {anomal} ({__anomal_assault})"
        )
        assert anomal != False, ANOMAL_NOT_FOUND_MSG
        assert anomaly_type == __type_assault, RETURN_ANOTHER_ANOMAL_MSG
