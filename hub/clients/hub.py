"""
client

"""
import os
import json
import random
import asyncio
from datetime import datetime, timedelta
from utils.logger import Logger
from utils.files import dirlist, search_file


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
    def __init__(self, path, mac_id=None):
        self.path = path
        self.cctv_mac = mac_id

        self.target_file = None

    def fetch_latest_file(self, extension="None"):
        # Fetch Latest updated File
        files = search_file(directory=self.path, extension=extension)
        target_file = files[-1]
        # File name is ordered by time
        if self.target_file is None or self.target_file != target_file:
            self.target_file = files[-1]
        else:
            logger.info("No new files were found.")
            # raise

    def fetch_ctime(self):
        # Fetch file created time
        ctime = os.path.getctime(self.target_file)

        ctime = datetime.fromtimestamp(ctime)
        stime = ctime + timedelta(seconds=random.randrange(2))
        etime = stime + timedelta(seconds=random.randrange(2))

        self.record_date = ctime.strftime("%Y-%m-%d %H:%M:%S")
        self.start_time = stime.strftime("%Y-%m-%d %H:%M:%S")
        self.end_time = etime.strftime("%Y-%m-%d %H:%M:%S")
        os.remove(self.target_file)

    def fetch_mac_id(self):
        # TODO:
        # 현재 mac주소는 랜덤값으로 설정해서 db에 저장하기 위한 데이터로 활용
        # 실제 데이터로 연동할 때에는 cctv mac 주소 고정
        with open("data/mac.json", mode="r", encoding="utf-8") as f:
            centers = json.load(f)

        self.cctv_mac = centers[random.randrange(len(centers))]["cctv_mac"]

    async def analize_video(self):
        # Connect Analize Code
        await asyncio.sleep(10)

        self.score = self.scoring_func()
        self.anomal, self.anomal_type = self.detect_anomaly(self.score)

        return self.anomal, self.anomal_type

    def scoring_func(self):
        # TEMP CODE
        # Randomize option
        return abs(random.normalvariate(mu=0, sigma=0.7))

    def detect_anomaly(self, score, threshold=0.7):
        # TEMP CODE
        ANOMALY_LIST = ["폭행", "싸움", "실신"]
        if score >= threshold:
            return True, ANOMALY_LIST[random.randrange(3)]

        return False, None

    def output(self):
        return {
            "video": {
                "record_date": self.record_date,
                "cctv_mac": self.cctv_mac,
                "storage_name": self.path,
            },
            "anomaly_type": self.anomal_type,
            "start_time": self.start_time,
            "end_time": self.end_time,
        }

    # async def run(self):
    #     print(f"  Run Model at {self.path}...")
    #     await asyncio.sleep(2)
    #     ## RUN MODEL
    #     score = self.scoring_func()
    #     anomal = self.detect_anomaly(score)

    #     output = {
    #         "video": {
    #             "record_date": "2021-07-17 21:00:00",
    #             "cctv_mac": "125454545460",
    #             "storage_name": self.path,
    #         },
    #         "anomaly_type": "폭행" if anomal else None,
    #         "start_time": "2021-07-17 00:00:00" if anomal else None,
    #         "end_time": "2021-07-17 01:00:00" if anomal else None,
    #     }
    #     ## Done MODEL
    #     print(f"    {self.path} anomaly score is : {score * 100:.2f} %")
    #     await asyncio.sleep(2)
    #     return (anomal, output)

    # def scoring_func(self):
    #     # TEMP CODE
    #     # Randomize option
    #     return abs(random.normalvariate(mu=0, sigma=0.2))

    # def detect_anomaly(self, score, threshold=0.7):
    #     if score >= threshold:
    #         return True

    #     return False
