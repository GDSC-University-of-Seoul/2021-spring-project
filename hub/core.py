import asyncio
from utils.scheduler import Scheduler
from utils.config import get_configs
from utils.logger import Logger

logger = Logger().get_logger()

async def main():
    cfg = get_configs()

    sched = Scheduler(cfg)
    
    try:
        sched.add_scheduler("interval")
        sched.start_scheduler()
    except:
        logger.warn("Abort")
        await asyncio.wait(10)

        
if __name__ == "__main__":
    asyncio.run(main())
