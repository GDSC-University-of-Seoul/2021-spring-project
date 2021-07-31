import asyncio
from utils.scheduler import Scheduler
from utils.config import get_configs


async def main():
    cfg = get_configs()

    sched = Scheduler(cfg)
    
    try:
        sched.add_scheduler("interval")
        sched.start_scheduler()
    except:
        print("Abort")
        await asyncio.wait(30)        

        
if __name__ == "__main__":
    asyncio.run(main())
