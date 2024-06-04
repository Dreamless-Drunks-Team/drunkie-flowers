// Клас спостерігача
class Observer {
    update(message) {
      console.log(`Отримано повідомлення: ${message}`);
    }
  }
  
  // Клас предмета (Subject)
  class Subject {
    constructor() {
      this.observers = [];
    }
  
    subscribe(observer) {
      this.observers.push(observer);
    }
  
    unsubscribe(observer) {
      this.observers = this.observers.filter(subscriber => subscriber !== observer);
    }
  
    notify(message) {
      this.observers.forEach(observer => observer.update(message));
    }
  }
  
  // Створення предмета
  const userNotifications = new Subject();
  
  // Створення спостерігачів
  const user1 = new Observer();
  const user2 = new Observer();
  
  // Підписка на отримання повідомлень
  userNotifications.subscribe(user1);
  userNotifications.subscribe(user2);
  
  // Відправлення повідомлення про новинки
  userNotifications.notify('Знижка на нові квіти!');
  
  // Відписка одного з користувачів
  userNotifications.unsubscribe(user1);
  
  // Відправлення іншого повідомлення
  userNotifications.notify('Ваш бонусний рахунок поповнено!');
  