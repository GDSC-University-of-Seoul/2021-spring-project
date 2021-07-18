import os
import time
import random
import asyncio
import requests


TOTAL_DIRECTORY = 4
DIRECTORY = "data/cctv"
THRESHOLD = 0.4


async def run_process():
    start = time.time()
    print("Process Run")

    coroutines = [check_directory(x) for x in range(1, TOTAL_DIRECTORY + 1)]

    await asyncio.wait(coroutines)
    end = time.time()

    print(f">>> Process time : {end - start:2.3f}s")


async def check_directory(n):
    dirpath = f"data/cctv{n}"
    files = os.listdir(dirpath)
    (flag, data) = await run_model(dirpath, files[-1])

    if flag is True:
        print(f"SEND DATA TO BACKEND {data}")
        res=requests.post('http://ec2-13-124-81-25.ap-northeast-2.compute.amazonaws.com:3000/api/anomalies', data)
        print(res)
    return data


async def run_model(dirpath, filepath):
    print(f"  Run Model {filepath} at {dirpath}...")

    ## RUN MODEL
    score = abs(random.normalvariate(mu=0, sigma=0.2))
    anomal = True if score >= THRESHOLD else False
    output = {
        "video": {
            "record_date": "2021-07-17 21:00:00",
            "cctv_mac": "125454545460",
            "storage_name": "data/cctv1/",
        },
        "anomaly_type": "폭행" if anomal else None,
        "start_time": "2021-07-17 00:00:00" if anomal else None,
        "end_time": "2021-07-17 01:00:00" if anomal else None,
    }
    ## Done MODEL
    print(f"            {filepath} anomaly score is : {score * 100:.2f} %")

    await asyncio.sleep(2)
    return (anomal, output)


"""
"video_id": f"{dirpath}_{filepath}",
        "start_time": "2021-07-15-12:07:00" if anomal else None,
        "end_time": "2021-07-15-12:07:30" if anomal else None,
        "anomaly_type": "ASSERT" if anomal else None,
        "follow_up": None,
"""
