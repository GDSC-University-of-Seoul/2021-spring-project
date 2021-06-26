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
            self.sched.add_job(self.request_job, type, seconds=5, id="hub_interval")
        if type == "cron":
            self.sched.add_job(self.request_job, type, hour="0", id="hub-cron")

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


if __name__ == "__main__":

    sample_filename = "20210530_1_LOCAL.wmv"
    sample_data = {
        "start_time": "2021-05-30 12:00:00",
        "end_time": "2021-05-30 12:00:30",
        "follow_up": "이상행동감지",
    }
    anomaly_data = dump_anomaly_data(sample_filename, **sample_data)

    sched = Scheduler()
    sched.get_data(anomaly_data)
    sched.add_scheduler("interval")
    sched.start_scheduler()
