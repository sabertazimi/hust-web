import {
  STAFF_COOK,
} from './constants';

import {
  $log,
  sleep,
} from '../utils';

import Staff from './staff';

export default class Cook extends Staff {
  constructor(name = '', salary = 0) {
    super(name, salary);

    this.type = STAFF_COOK;
    this.order = [];
  }

  // @TODO: map for (customer, order)
  /**
   * @override
   * @memberof Waiter
   */
  work(order, waiter) {
    return order.reduce((promise, food) => (
      promise.then(() => {
        $log(`cook ${this.name} is cooking ${food.name} ...`);
        return sleep(food.time).then(() => waiter.work([...food]));
      })
    ), Promise.resolve());
  }
}
