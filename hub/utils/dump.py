"""
dump.py

"""
# cctv
# cctv_id cctv 번호(int)    ::filename
# area_id 설치 위치(int)
# install_date 설치일자(date)
# quality 화질(enum)
# uninstall_date 제거일자(date) N

# video
# video_id 파일번호(int)    ::filename
# record_date 생성일(date - YY/MM/DD)    ::filename
# delete_date 파기일(date - YY/MM/DD) N
# delete_issue 파기사유(varchar(20) N
# storage_name 보관 저장소(int)    ::filename

# anomaly_id 이상행동 식별번호(int)
# start_time 이상행동 감지시점(timestamp - YY/MM/DD hh:mm:ss)    ::
# end_time 이상행동 종료 파악시점(timestamp - YY/MM/DD hh:mm:ss)    ::
# follow_up 추후조치(enum)    ::
# video_id 관련 동영상 파일(int)

import json
from datetime import datetime


"""
filename = "{ record_date }_{ cctv_id }_{ storage_name }.ext"
"""

# anomaly data record(record_date, cctv_id, storage_name, start_time, end_time, follow_up)
def dump_anomaly_data(filename, start_time, end_time, follow_up):
    record_date, cctv_id, storage_name = filename.split(".")[0].split("_")
    record_date = datetime.strptime(record_date, "%Y%m%d")  # 20210101(string)

    data = json.dumps(
        {
            "video": {
                "record_date": record_date.strftime("%Y-%m-%d %H:%M:%S"),
                "storage_name": storage_name,
                "cctv_id": cctv_id,
            },
            "start_time": start_time,
            "end_time": end_time,
            "follow_up": follow_up,
        }
    )
    return data


# cctv table record(area_id, install_date, quality)
def dump_cctv_data(area_id, install_date, quality):
    data = json.dumps(
        {
            "cctv": {
                "area_id": area_id,
                "install_date": install_date,
                "quality": quality,
            }
        }
    )
    return data
