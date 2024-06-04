class BouquetBuilder {
    constructor() {
      this.bouquet = new Bouquet();
    }
    
    addFlowers() {
      this.bouquet.addFlower()
    }
    
    setWrapping() {
      // Логіка для вибору упаковки
    }
    
    setDelivery() {
      // Логіка для вибору способу доставки
    }
    
    build() {
      return this.bouquet;
    }
  }