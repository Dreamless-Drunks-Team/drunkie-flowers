from enum import Enum


LEVEL_SELECTION_MAP = {0: "DEBUG", 1: "INFO", 2: "WARNING", 3: "ERROR", 4: "CRITICAL"}


class Logger:
    def __init__(self):
        pass

    def set_level(self, level: int):
        raise NotImplementedError

    def log(self, message: str, level: int):
        raise NotImplementedError

    def debug(self, message: str):
        self.log(message, 0)

    def info(self, message: str):
        self.log(message, 1)

    def warning(self, message: str):
        self.log(message, 2)

    def error(self, message: str):
        self.log(message, 3)

    def critical(self, message: str):
        self.log(message, 4)
