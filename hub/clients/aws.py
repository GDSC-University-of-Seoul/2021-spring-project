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

        self.header = self.init_header()

        self.base_url = f"{self.protocol}{self.host}.{self.region}:{self.port}"
        self.url = os.path.join(self.base_url, self.path)
        self.anomal_url = f"{self.base_url}/api/anomalies/logs"

    def init_header(self):
        header_base = {"Content-Type": "application/json; charset=utf-8"}
        return header_base

    def send_anomaly(self, data):
        json_data = json.dumps(data)
        return requests.post(self.anomal_url, headers=self.header, data=json_data)
