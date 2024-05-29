from observability.loggers.logger import Logger


class Log:
    def __init__(self, logger: Logger, level : int):
        self.logger: Logger = logger
        self.level = level

    def set_logger(self, logger):
        self.logger = logger

    def set_level(self, level):
        self.logger.setLevel(level)

    def log(self, message):
        self.logger.log(self.level, message)

    def debug(self, message):
        self.logger.debug(message)

    def info(self, message):
        self.logger.info(message)

    def warning(self, message):
        self.logger.warning(message)

    def error(self, message):
        self.logger.error(message)
        

log = Log(None, 0)
