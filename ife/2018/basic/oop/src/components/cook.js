import {
  STAFF_COOK,
} from './constants';
import Staff from './staff';

export default class Cook extends Staff {
  constructor(name = '', salary = 0) {
    super(name, salary);

    this.type = STAFF_COOK;
    this.orders = [];
  }

  // @TODO: map for (consumer, orders)
  cook(orders) {
    this.orders.push(orders);
    this.orders.splice(0);
  }

  /**
   * @override
   * @memberof Waiter
   */
  work(orders) {
    this.cook(orders);
    return orders;
  }
}
