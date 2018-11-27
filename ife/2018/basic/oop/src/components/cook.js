import {
  STAFF_COOK,
} from './constants';

import {
  $log,
} from '../utils';

import Staff from './staff';

export default class Cook extends Staff {
  constructor(name = '', salary = 0) {
    super(name, salary);

    this.type = STAFF_COOK;
    this.order = [];
  }

  cook(food) {
    $log(`cook ${this.name} is cooking ${food.name} ...`);
  }

  // @TODO: map for (customer, order)
  /**
   * @override
   * @memberof Waiter
   */
  work(order) {
    order.forEach(this.cook.bind(this));
    return order;
  }
}
