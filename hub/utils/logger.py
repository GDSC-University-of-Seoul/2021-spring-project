import os
import logging
from utils.files import check_file

class Logger:
    # Fixme : fix logger option fard coding to config options
    def __init__(self, verbosity=1, logfile=None, logger_name=None, filelog=True):
        self.logger = self.logger_setup(verbosity, logfile, logger_name, filelog)
        
    def logger_setup(self, verbosity, logfile, logger_name, filelog):
        logger = logging.getLogger(logger_name)
        log_level = (3 - verbosity) * 10
        format = "[%(levelname)s] [%(asctime)s] %(module)s - %(process)d - %(message)s"
        formatter = logging.Formatter(format)
        logger.setLevel(log_level)
        logger.propagate = False

        # Add log console Handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(log_level)
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)

        # Add log file handler
        if filelog:
            logdir = "logs/"
            if not os.path.exists(logdir):
                os.makedirs(logdir)

            logname = __name__.split(".")[-1]
            logfile = logfile if logfile else f"{logdir}{logname}.log"
            file_handler = logging.FileHandler(logfile)
            file_handler.setLevel(logging.DEBUG)
            file_handler.setFormatter(formatter)
            logger.addHandler(file_handler)

        return logger

    def get_logger(self):
        return self.logger
        
    def log(self, msg=None, log_type="info", level=0):
        msg = str(" ".ljust((level * 3))) + str(msg)

        if log_type == "info":
            self.logger.info(msg)
        elif log_type == "warn":
            self.logger.warn(msg)

    def warn(self, msg=None, log_type="warn", level=0):
        self.log(msg, log_type, level)
