"""
client

"""
import os
import json
import requests

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
        url = f"{self.base_url}/api/anomalies"
        
        try:
            response = requests.post(url, headers=self.header, data=json.dumps(data))
            return response
        except:
            # TODO: Do Something
            pass
     
        return None