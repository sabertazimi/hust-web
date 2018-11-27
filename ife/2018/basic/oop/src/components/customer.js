import {
  $log,
  sleep,
} from '../utils';

import {
  CUSTOMER_EATING_TIME, CUSTOMER_ORDERING_TIME,
} from './constants';

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

  getOrder(menu) {
    return sleep(CUSTOMER_ORDERING_TIME).then(() => {
      const order = menu.generateOrder();
      $log(`customer '${this.name}' is ordering ...`);
      this.order = [...order];
      return [...this.order];
    });
  }

  eat(cookedOrder) {
    return cookedOrder.reduce((promise, food) => (
      promise.then(() => {
        $log(`customer '${this.name}' is eating (${food.name}) (${CUSTOMER_EATING_TIME} s) ...`);
        this.order = this.order.filter(_food => _food.name !== food.name);
        return sleep(CUSTOMER_EATING_TIME).then(() => {
          $log(`customer '${this.name}' ate (${food.name}) !`);
          return [...this.order];
        });
      })
    ), Promise.resolve());
  }
}
