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
import asyncio
import requests
from datetime import datetime
from api import run_process
from apscheduler.jobstores.base import JobLookupError
from apscheduler.schedulers.background import BlockingScheduler

TOTAL_DIRECTORY = 4


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


class Scheduler:
    def __init__(self):
        self.max_instance = str(TOTAL_DIRECTORY * 2)
        self.sched = BlockingScheduler(
            {"apscheduler.job_defaults.max_instances": self.max_instance}
        )
        self.directory = "data/"

    def __del__(self):
        self.sched.shutdown()

    def start_scheduler(self):
        self.sched.start()

    def kill_scheduler(self, job_id):
        try:
            self.sched.remove_job(job_id)
        except JobLookupError as e:
            print(f"fail to stop Scheduler: {e}")
            return

    def add_scheduler(self, type):
        print(f"{type} Scheduler Start")
        if type == "interval":
            self.sched.add_job(self._request_job, type, seconds=10, id="hub_interval")
        if type == "cron":
            self.sched.add_job(self._request_job, type, hour="0", id="hub-cron")

    def _request_job(self):
        asyncio.run(run_process())

    def request_job(self):
        self.url = "http://localhost:3000/api/anomalies/"
        res = requests.post(
            self.url,
            headers={"Content-Type": "application/json; charset=utf-8"},
            data=self.data,
        )

    def get_data(self, data):
        self.data = data
        return


async def main_async():
    try:
        sched = Scheduler()
        sched.add_scheduler("interval")
        sched.start_scheduler()
    except:
        print("Abort")
        await asyncio.wait(30)


if __name__ == "__main__":
    asyncio.run(main_async())

#   #dummy data
#   '''
#     sample_filename = "20210530_1_LOCAL.wmv"
#     sample_data = {
#         "start_time": "2021-05-30 12:00:00",
#         "end_time": "2021-05-30 12:00:30",
#         "follow_up": "이상행동감지",
#     }
#     anomaly_data = dump_anomaly_data(sample_filename, **sample_data)
#     '''
