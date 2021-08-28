"""
client

"""
import os
import time
import random
import asyncio
import requests
import json

from utils.logger import Logger

logger = Logger().get_logger()
THRESHOLD = 0.4


class AWSClient:
    """
    Client for AWS backend api server

    """

    def __init__(self, config):
        self.init_session(config)

    def init_session(self, config):
        self.protocol = config["protocol"]
        self.host = config["host"]
        self.port = config["port"]
        self.region = config["region"]
        self.path = config["path"]

        self.base_url = f"{self.protocol}{self.host}.{self.region}:{self.port}"
        self.url = os.path.join(self.base_url, self.path)
        self.header = self.init_header()

    def init_header(self):
        header_base = {"Content-Type": "application/json; charset=utf-8"}
        return header_base

    def send_anomaly(self, data):
        url = f"{self.base_url}/api/anomalies/logs"

        try:
            print(f"Send data to {url} : \n {data}")
            response = requests.post(url, headers=self.header, data=json.dumps(data))
            return response
        except Exception as e:
            logger.warning(e)

        return None

    async def server_api(self, dirpath):
        files = os.listdir(dirpath)

        (flag, data) = await self.run_model(dirpath, files[-1])

        if flag is True:
            print(f"SEND DATA TO BACKEND {data}")
            res = requests.post(
                self.url,
                headers=self.header,
                data=json.dumps(data),
            )
            return res
        return data

    async def run_model(self, dirpath, filepath):
        print(f"  Run Model {filepath} at {dirpath}...")

        ## RUN MODEL
        score = abs(random.normalvariate(mu=0, sigma=0.2))
        anomal = True if score >= THRESHOLD else False
        output = {
            "video": {
                "record_date": "2021-07-17 21:00:00",
                "cctv_mac": "125454545460",
                "storage_name": dirpath,
            },
            "anomaly_type": "폭행" if anomal else None,
            "start_time": "2021-07-17 00:00:00" if anomal else None,
            "end_time": "2021-07-17 01:00:00" if anomal else None,
        }
        ## Done MODEL
        print(f"            {filepath} anomaly score is : {score * 100:.2f} %")

        await asyncio.sleep(2)
        return (anomal, output)
