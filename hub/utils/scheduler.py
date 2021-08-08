"""
Scheduler.py

"""

import time
import asyncio
from apscheduler.jobstores.base import JobLookupError
from apscheduler.schedulers.background import BlockingScheduler
from utils.files import dirlist
from utils.logger import Logger
from utils.api import server_api

logger = Logger().get_logger()


class Scheduler:
    """
    Scheduler
    """

    def __init__(self, config):
        directory = config["path"]
        self.subdirs = dirlist(directory)
        self.intervals = config["interval"]

        self.scheduler = self.init_scheduler()

    def init_scheduler(self):
        """
        Initiate the scheduler by checking target directories and assign instances
        """
        max_instance = str(len(self.subdirs) * 2)

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
        asyncio.run(self.process(self.subdirs))

    async def process(self, target):
        """
        Run to process
        """
        start = time.time()
        logger.info("Process Run")

        coroutines = [self.analize(path) for path in target]

        await asyncio.wait(coroutines)
        end = time.time()

        logger.info(f">>> Process time : {end - start:2.3f}s")

    async def analize(self, path):
        """
        TODO: Connect Model Analize process
        """
        logger.info(f"Path ({path})")

        res = await server_api(path)
        print("server api", res)

    def __del__(self):
        self.scheduler.shutdown()
