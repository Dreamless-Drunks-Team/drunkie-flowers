from kafka import KafkaProducer
from observability.loggers.logger import Logger, LEVEL_SELECTION_MAP


class KafkaLogger(Logger):
    def __init__(self, topic, bootstrap_servers=['localhost:9092']):
        self.topic = topic
        self.producer = KafkaProducer(bootstrap_servers=bootstrap_servers)
        self.level = 1

    def log(self, message: str, level: int):
        self.producer.send(self.topic, f"{LEVEL_SELECTION_MAP[level].ljust(15)}: {message}".encode())