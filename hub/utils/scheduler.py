import asyncio
import requests
from process import run_process
from apscheduler.jobstores.base import JobLookupError
from apscheduler.schedulers.background import BlockingScheduler
from utils.files import dirlist
from utils.logger import Logger

logger = Logger().get_logger()


class Scheduler:
    """
    Sceduler
    """

    def __init__(self, config):
        self.directory = config["path"]
        self.subdirs = dirlist(self.directory)

        self.max_instance = str(len(self.subdirs) * 2)
        self.sched = BlockingScheduler(
            {"apscheduler.job_defaults.max_instances": self.max_instance}
        )
        self.interval = config["interval"]

    def __del__(self):
        self.sched.shutdown()

    def start_scheduler(self):
        self.sched.start()

    def kill_scheduler(self, job_id):
        try:
            self.sched.remove_job(job_id)
        except JobLookupError as e:
            logger.info(f"fail to stop Scheduler: {e}")
            return

    def add_scheduler(self, type):
        logger.info(f"{type} Scheduler Start")
        if type == "interval":
            self.sched.add_job(
                self._request_job, type, seconds=self.interval, id="hub_interval"
            )

        if type == "cron":
            self.sched.add_job(self._request_job, type, hour="0", id="hub-cron")

    def _request_job(self):
        asyncio.run(run_process(self.subdirs))

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
