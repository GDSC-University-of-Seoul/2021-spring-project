"""
client

"""
import random
import asyncio
from utils.logger import Logger
from utils.files import dirlist

logger = Logger().get_logger()

class HubClient:
    """
    Client for Hub

    """

    def __init__(self, config):
        self.config = config
        self.init_dir_params(self.config["path"])
        self.sub_clients = [VideoClient(path) for path in self.subdirs]
        
    def init_dir_params(self, path):
        self.subdirs = dirlist(path)
        self.n_subdir = len(self.subdirs)
        
    def job_lists(self):
        jobs = list()

        for id, client in enumerate(self.sub_clients):
            jobs.append((client.run, f"client_{str(id)}"))

        return jobs
        
    
class VideoClient:
    def __init__(self, path):
        self.path = path
        
    async def run(self):
        print(f"  Run Model at {self.path}...")
        await asyncio.sleep(2)
        ## RUN MODEL
        score = self.scoring_func()
        anomal = self.detect_anomaly(score)

        output = {
            "video": {
                "record_date": "2021-07-17 21:00:00",
                "cctv_mac": "125454545460",
                "storage_name": self.path,
            },
            "anomaly_type": "폭행" if anomal else None,
            "start_time": "2021-07-17 00:00:00" if anomal else None,
            "end_time": "2021-07-17 01:00:00" if anomal else None,
        }
        ## Done MODEL
        print(f"    {self.path} anomaly score is : {score * 100:.2f} %")
        await asyncio.sleep(2)
        return (anomal, output)
    
    def scoring_func(self):
        # TEMP CODE
        # Randomize option
        return abs(random.normalvariate(mu=0, sigma=0.2))
        
    
    def detect_anomaly(self, score, threshold=0.7):
        if score >= threshold:
            return True
        
        return False    