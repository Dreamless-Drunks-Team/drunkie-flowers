class BouquetFactory {
    createBouquet(type) {
      switch (type) {
        case 'wedding':
          return new WeddingBouquetBuilder().getResult();
        case 'birthday':
          return new BirthdayBouquetBuilder().getResult();
        default:
          return new DefaultBouquetBuilder().getResult();
      }
    }
  }
  
  class WeddingBouquetBuilder extends BouquetBuilder {
    // Логіка для створення весільного букету
  }
  
  class BirthdayBouquetBuilder extends BouquetBuilder {
    // Логіка для створення букету на день народження
  }
  
  class DefaultBouquetBuilder extends BouquetBuilder {
    // Логіка для створення типового букету
  }
  