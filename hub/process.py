import os
import time
import asyncio
from utils.logger import Logger
from models.utils.video import extract_video

logger = Logger().get_logger()

async def run_process(video_dirpath):
    start = time.time()
    logger.info("Process Run")
    
    coroutines = [analize(path) for path in video_dirpath]

    await asyncio.wait(coroutines)
    end = time.time()

    logger.info(f">>> Process time : {end - start:2.3f}s")
    

async def analize(path):
    logger.info(f"Path ({path})")
    
    ## Check New video file
    
    ## Run the Humanpose model
