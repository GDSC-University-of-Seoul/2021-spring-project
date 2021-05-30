from scheduler import Scheduler, dump_anomaly_data

if __name__ == "__main__":

    sample_filename = "20210530_1_LOCAL.wmv"
    sample_data = {
        "start_time": "2021-05-30 12:00:00",
        "end_time": "2021-05-30 12:00:30",
        "follow_up": "이상행동감지",
    }
    anomaly_data = dump_anomaly_data(sample_filename, **sample_data)
    print(anomaly_data)

    scheduler = Scheduler()
    scheduler.get_data(anomaly_data)
    scheduler.add("interval")
    scheduler.start()
