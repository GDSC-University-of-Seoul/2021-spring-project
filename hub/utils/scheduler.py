import asyncio
import requests
from api import run_process
from apscheduler.jobstores.base import JobLookupError
from apscheduler.schedulers.background import BlockingScheduler
from utils.files import dirlist

class Scheduler:
    def __init__(self, config):
        self.total_dirs = len(dirlist(config["data"]["path"]))
        self.max_instance = str(self.total_dirs * 2)
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
