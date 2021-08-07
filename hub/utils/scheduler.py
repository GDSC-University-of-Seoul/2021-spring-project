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
        self.intervals = config["interval"]

        self.scheduler = self.init_scheduler()

    def init_scheduler(self):
        """
        Initiate the scheduler by checking target directories and assign instances
        """
        subdirs = dirlist(self.directory)
        max_instance = str(len(subdirs) * 2)

        scheduler = BlockingScheduler(
            {"apscheduler.job_defaults.max_instances": max_instance}
        )
        return scheduler

    def start(self):
        """
        Start scheduler
        """
        self.scheduler.start()

    def kill(self, job_id):
        """
        Forced stop the scheduler

        """
        try:
            self.scheduler.remove_job(job_id)
        except JobLookupError as e:
            logger.info(f"fail to stop Scheduler: {e}")
            return

    def add_job(self, type):
        """
        Add async job to scheduler

        """
        logger.info(f"{type} Scheduler Start")
        if type == "interval":
            self.scheduler.add_job(
                self._request_job, type, seconds=self.intervals, id="hub_interval"
            )

        if type == "cron":
            self.scheduler.add_job(self._request_job, type, hour="0", id="hub-cron")

    def _request_job(self):
        asyncio.run(run_process(self.subdirs))

    def __del__(self):
        self.scheduler.shutdown()

    # def request_job(self):
    #     self.url = "http://localhost:3000/api/anomalies/"
    #     res = requests.post(
    #         self.url,
    #         headers={"Content-Type": "application/json; charset=utf-8"},
    #         data=self.data,
    #     )
