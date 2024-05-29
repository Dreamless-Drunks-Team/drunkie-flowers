from logging import Logger

from observability.loggers.logger import LEVEL_SELECTION_MAP, LogLevel


class StdoutLogger(Logger):
    def __init__(self):
        self.level = LogLevel.INFO

    def set_level(self, level: LogLevel):
        self.level = level

    def log(self, message: str, level: int):
        if level < self.level:
            return
        print(f"{LEVEL_SELECTION_MAP[level].ljust(15)}: {message}")
