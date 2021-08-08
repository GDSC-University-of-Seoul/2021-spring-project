"""
core.py

"""

import asyncio
from clients.client import AWSClient
from utils.logger import Logger
from utils.config import Config
from utils.scheduler import Scheduler
from utils.updater import check_update

logger = Logger().get_logger()

"""
Run python core.py [--config {config yaml file path}] 

"""


class KidsKeeper:
    """
    Kids Keeper

    """

    def __init__(self):
        # Updater
        self.synchronize()

        # Setting configuration
        config = Config()

        # AWS backend api client
        self.awsclient = AWSClient(config.client)

        # Process Scheduler
        self.scheduler = Scheduler(config.scheduler)

    def synchronize(self):
        # Check Update Things Github Repository
        check_update()

    def run(self):
        # Run process
        asyncio.run(self._run())

    async def _run(self):
        try:
            self.scheduler.add_job("interval")
            self.scheduler.start()
        except:
            logger.warn("Abort")
            self.scheduler.kill()


if __name__ == "__main__":
    kk = KidsKeeper()
    kk.run()
