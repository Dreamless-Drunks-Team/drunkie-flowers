


from enum import Enum




class LogLevel(Enum):
    DEBUG = 1
    INFO = 2
    WARNING = 3
    ERROR = 4
    CRITICAL = 5
    
LEVEL_SELECTION_MAP = {
    LogLevel.DEBUG: 'DEBUG',
    LogLevel.INFO: 'INFO',
    LogLevel.WARNING: 'WARNING',
    LogLevel.ERROR: 'ERROR',
    LogLevel.CRITICAL: 'CRITICAL'
}

class Logger:
    def __init__(self):
        pass
    
    def set_level(self, level: LogLevel):
        raise NotImplementedError

    def log(self, message: str, level: LogLevel):
        raise NotImplementedError
    
    def debug(self, message: str):
        self.log(message, LogLevel.DEBUG)
    
    def info(self, message: str):
        self.log(message, LogLevel.INFO)
    
    def warning(self, message: str):
        self.log(message, LogLevel.WARNING)
    
    def error(self, message: str):
        self.log(message, LogLevel.ERROR)
    
    def critical(self, message: str):
        self.log(message, LogLevel.CRITICAL)