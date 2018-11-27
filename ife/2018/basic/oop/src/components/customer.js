export default class Customer {
  constructor(name = '') {
    this.name = name;
    this.order = [];
  }

  enter(restaurant) {
    restaurant.serve(this);
  }

  leave(restaurant) {
    restaurant.depart(this);
  }

  getOrder(menus) {
    const order = menus.generateOrder();
    this.order = [...order];

    return [...this.order];
  }

  eat(cookedOrder) {
    this.order = this.order.filter(food => !cookedOrder.includes(food));

    return [...this.order];
  }
}
