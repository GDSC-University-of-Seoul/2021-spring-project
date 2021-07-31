import os
import time
import asyncio
from utils.logger import Logger

logger = Logger().get_logger()

async def run_process(video_dirpath):
    start = time.time()
    logger.info("Process Run")
    
    coroutines = [train(path) for path in video_dirpath]

    await asyncio.wait(coroutines)
    end = time.time()

    logger.info(f">>> Process time : {end - start:2.3f}s")
    

async def train(path):
    logger.info(f"Model Train is start Pid( {os.getpid()} ) Path ({path})")
