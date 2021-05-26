import sys
import logging
import structlog


def init_logger():
    """
    Initaing log configuration
    """
    logging.basicConfig(format="%(message)s", stream=sys.stdout, level=logging.INFO)
    structlog.configure(logger_factory=structlog.stdlib.LoggerFactory())


class Logger:
    """
    Logger class
    """

    def __init__(self):
        self.logger = structlog.get_logger()

    def log(self, msg=None, log_type="info", level=0):
        # FIXME : THIS IS TEMPORARY CODE
        msg = str(" ".ljust((level * 3))) + str(msg)

        if log_type == "info":
            self.logger.info(msg)
        elif log_type == "warn":
            self.logger.warn(msg)

    def warn(self, msg=None, log_type="warn", level=0):
        # FIXME : THIS IS TEMPORARY CODE
        self.log(msg, log_type, level)
