import time
import psutil

pid = int(input("Input the target process id : "))
py = psutil.Process(pid)

while True:
    try:
        memoryUse = py.memory_info()[0] / 2.0 ** 30  # memory use in GB...I think
        print(f"memory use: {memoryUse:.4f} GB")
        time.sleep(1)
    except KeyboardInterrupt:
        break
