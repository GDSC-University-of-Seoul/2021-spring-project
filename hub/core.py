"""
core.py

"""
import os
import time
import asyncio
import random
from clients.aws import AWSClient
from clients.hub import HubClient
from utils.logger import Logger
from utils.config import Config
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
            time.sleep(self.intervals)
            asyncio.run(self.process())
            # asyncio.run(self.scheduling(self.process))

    async def process(self):
        logger.info(f"Run Process ( Interval : {self.intervals} )")

        subclients = self.hub_client.sub_clients
        coroutines = [self.analize(sub.path) for sub in subclients]
        await asyncio.wait(coroutines)

    async def analize(self, path):
        print(f"  Run Model at {path}...")
        await asyncio.sleep(2)
        ## RUN MODEL
        score = self.scoring_func()
        anomal = self.detect_anomaly(score)

        output = {
            "video": {
                "record_date": "2021-07-17 21:00:00",
                "cctv_mac": "125454545460",
                "storage_name": path,
            },
            "anomaly_type": "폭행" if anomal else None,
            "start_time": "2021-07-17 00:00:00" if anomal else None,
            "end_time": "2021-07-17 01:00:00" if anomal else None,
        }
        ## Done MODEL
        print(f"    {path} anomaly score is : {score * 100:.2f} %")
        
        if anomal is True:
            print(f" {path} is anomaly!!!")
            self.aws_client.send_anomaly(data=output)
            await asyncio.sleep(2)
        return (anomal, output)

    def scoring_func(self):
        # TEMP CODE
        # Randomize option
        return abs(random.normalvariate(mu=0, sigma=1))
        
    
    def detect_anomaly(self, score, threshold=0.7):
        if score >= threshold:
            return True
        return False    


def init_runner():
    def runner():
        kidskeeper = KidsKeeper()
        kidskeeper.start()
        
    return runner

if __name__ == "__main__":
    runner = init_runner()
    runner()
