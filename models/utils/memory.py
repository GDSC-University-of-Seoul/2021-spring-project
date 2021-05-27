import time
import psutil


def check_memory_usage(py: psutil.Process):
    """
    Check the memory usage of input process.
    """

    while True:
        try:
            memoryUse = py.memory_info()[0] / 2.0 ** 30  # memory use in GB...I think
            print(f"memory use: {memoryUse:.4f} GB")
            time.sleep(1)
        except psutil.NoSuchProcess:
            print("Process is no longer exists")
            break
        except KeyboardInterrupt:
            break


if __name__ == "__main__":
    pid = int(input("Input the target process id : "))
    py = psutil.Process(pid)
    check_memory_usage(py)
