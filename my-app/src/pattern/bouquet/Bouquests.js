// BouquetBuilder.js
class Bouquet {
    constructor() {
      this.flowers = [];
      this.wrapping = false;
      this.delivery = false;
    }
    
    addFlower(flower) {
      this.flowers.push(flower);
    }
    
    setWrapping(wrapping) {
      this.wrapping = wrapping;
    }
    
    setDelivery(delivery) {
      this.delivery = delivery;
    }
  }
  