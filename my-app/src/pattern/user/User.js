class User {
    constructor(firstName, lastName, phoneNumber, email, notifications, clientCardType) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.phoneNumber = phoneNumber;
      this.email = email;
      this.notifications = notifications; // {news: False, orders: False; bonuses: False}
      this.clientCardType = clientCardType;
    }
  
    toggleNewsNotifications() {
      this.notifications.news = !this.notifications.news;
    }
  
    toggleOrderStatusNotifications() {
      this.notifications.orderStatus = !this.notifications.orderStatus;
    }
  
    toggleBonusesNotifications() {
      this.notifications.bonuses = !this.notifications.bonuses;
    }
  }
  