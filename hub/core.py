"""
core.py

"""

import asyncio
from utils.logger import Logger
from utils.config import Config
from utils.scheduler import Scheduler
from utils.updater import check_update

logger = Logger().get_logger()

"""
Run python core.py [--data {config yaml file path}] 

"""


async def main():
    """
    Main Process for run kids keepr scheduler

    """

    logger.info("<< Run Kids Keeper Process >>")

    config = Config()
    sched = Scheduler(config.scheduler)

    try:
        sched.add_job("interval")
        sched.start()
    except:
        logger.warn("Abort")
        sched.kill()
        await asyncio.wait(10)


if __name__ == "__main__":
    check_update()
    asyncio.run(main())
