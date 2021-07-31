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


class Scheduler:
    def __init__(self, config):
        self.max_instance = str(TOTAL_DIRECTORY * 2)
        self.sched = BlockingScheduler(
            {"apscheduler.job_defaults.max_instances": self.max_instance}
        )
        self.directory = config["data"]["path"]

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
