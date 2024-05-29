from observability.loggers.logger import Logger, LEVEL_SELECTION_MAP


class StdoutLogger(Logger):
    def __init__(self):
        self.level = 1

    def set_level(self, level: int):
        self.level = level

    def log(self, message: str, level: int):
        if level < self.level:
            return
        print(f"{LEVEL_SELECTION_MAP[level].ljust(15)}: {message}")
