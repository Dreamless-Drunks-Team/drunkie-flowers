class Order {
    constructor(date, bouquetName, bouquet, status) {
        this.date = date;
        this.bouquetName = bouquetName;
        this.bouquet = bouquet;
        this.status = status;
    }

    // Метод для зміни статусу замовлення
    changeStatus(newStatus) {
        this.status = newStatus;
    }

    // Метод для встановлення дати отримання
    setReceivedDate(receivedDate) {
        this.receivedDate = receivedDate;
    }
}
