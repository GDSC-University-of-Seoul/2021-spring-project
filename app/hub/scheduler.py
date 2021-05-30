import time
import json
import requests
from datetime import datetime

from apscheduler.jobstores.base import JobLookupError
from apscheduler.schedulers.background import BlockingScheduler


"""
filename = "{ record_date }_{ cctv_id }_{ storage_time }.ext"
"""


def dump_anomaly_data(filename, start_time, end_time, follow_up):
    record_date, cctv_id, storage_name = filename.split(".")[0].split("_")
    record_date = datetime.strptime(record_date, "%Y%m%d")

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


class Scheduler:
    def __init__(self):
        self.sched = BlockingScheduler()

    def __del__(self):
        self.sched.shutdown()

    def start(self):
        self.sched.start()
        return

    def kill(self, job_id):
        try:
            self.sched.remove_job(job_id)
        except JobLookupError as e:
            print(f"fail to stop Scheduler: {e}")
            return

    def add(self, type):
        print(f"{type} Scheduler Start")
        if type == "interval":
            self.sched.add_job(self.request_job, type, seconds=5, id="hub_interval")
        if type == "cron":
            self.sched.add_job(self.request_job, type, hour="0", id="hub-cron")

    def request_job(self):
        self.url = "http://localhost:3000/api/anomalies/"
        print(self.data)

        res = requests.post(
            self.url,
            headers={"Content-Type": "application/json; charset=utf-8"},
            data=self.data,
        )
        print(res.json())
        print(f'scheduled job : {time.strftime("%H:%M:%S")}')

    def get_data(self, data):
        self.data = data
        return
