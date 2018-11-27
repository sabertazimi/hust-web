export default class Consumer {
  constructor(name = '') {
    this.name = name;
    this.orders = [];
  }

  enter(restaurant) {
    restaurant.serve(this);
  }

  leave(restaurant) {
    restaurant.depart(this);
  }

  order(menus) {
    const orders = menus.order();
    this.orders = [...orders];

    return [...this.orders];
  }

  eat(cookedOrders) {
    this.orders = this.orders.filter(order => !cookedOrders.includes(order));
    // this.orders = this.orders.filter(order => (
    //   !cookedOrders.map(food => food.name).includes(order.name)
    // ));

    return [...this.orders];
  }
}
