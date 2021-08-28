from datetime import datetime


def to_file_format(datetime=datetime.now()):
    datetime = datetime.isoformat(timespec="seconds")
    datetime = datetime.replace(":", "")
    datetime = datetime.replace("T", "_")
    return datetime
