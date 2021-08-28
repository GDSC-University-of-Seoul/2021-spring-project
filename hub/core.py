"""
core.py

"""
import os
import time
import asyncio
import random
from datetime import datetime, timedelta
from clients.aws import AWSClient
from clients.hub import HubClient
from utils.logger import Logger
from utils.config import Config
from utils.time import to_file_format
from utils.updater import check_update

logger = Logger().get_logger()

"""
Run python core.py [--config {config yaml file path}] 

"""


class KidsKeeperException(Exception):
    pass


class KidsKeeper(object):
    """
    Kids Keeper

    """

    def __init__(self):
        super().__init__()

        # Setting configuration
        config = Config()
        self.intervals = config.scheduler["interval"]

        # AWS backend api client
        self.aws_client = AWSClient(config.client)
        self.hub_client = HubClient(config.hub)

        self.start_time = time.time()

    def start(self):
        check_update()
        logger.info("Kids Keeper - protect service is now running")
        while True:
            asyncio.run(self.process())

    async def process(self):
        logger.info(f"Run Process ( Interval : {self.intervals} sec )")

        subclients = self.hub_client.sub_clients
        coroutines = [self.analize(sub) for sub in subclients]
        await asyncio.wait(coroutines)

    async def analize(self, hub_client):
        logger.info(f"Run Model at {hub_client.path}...")

        cur_time = datetime.now()
        filename = os.path.join(hub_client.path, to_file_format(cur_time))

        with open(f"{filename}.mp4", mode="w") as f:
            f.write("")

        hub_client.fetch_latest_file(extension="mp4")
        hub_client.fetch_ctime()
        hub_client.fetch_mac_id()

        is_anomal, anomal_type = await hub_client.analize_video()

        logger.info(f"    {hub_client.path} score is : {hub_client.score * 100:.2f} %")
        if is_anomal:
            response = self.aws_client.send_anomaly(data=hub_client.output())
            logger.info(f" {hub_client.target_file} is anomaly!!! >> {response}")

        await asyncio.sleep(self.intervals)


def init_runner():
    def runner():
        kidskeeper = KidsKeeper()
        kidskeeper.start()

    return runner


if __name__ == "__main__":
    runner = init_runner()
    runner()
