import {
  $log,
  sleep,
} from '../utils';

export default class Customer {
  constructor(name = '') {
    this.name = name;
    this.order = [];
  }

  enter(restaurant) {
    return restaurant.serve(this);
  }

  leave(restaurant) {
    restaurant.depart(this);
  }

  getOrder(menus) {
    return sleep(3).then(() => {
      const order = menus.generateOrder();
      $log(`customer '${this.name}' is ordering ...`);
      this.order = [...order];
      return [...this.order];
    });
  }

  eat(cookedOrder) {
    return cookedOrder.reduce((promise, food) => (
      promise.then(() => {
        $log(`customer '${this.name}' is eating ${food.name} ...`);
        this.order = this.order.filter(_food => _food.name !== food.name);
        return sleep(3).then(() => [...this.order]);
      })
    ), Promise.resolve());
  }
}
