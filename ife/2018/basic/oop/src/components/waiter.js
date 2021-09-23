import { STAFF_WAITER } from './constants';

import Staff from './staff';

export default class Waiter extends Staff {
  constructor(name = '', salary = 0) {
    super(name, salary);

    this.type = STAFF_WAITER;
    this.order = [];
  }

  /**
   * @override
   * @memberof Waiter
   */
  work(arg) {
    if (arg && Array.isArray(arg)) {
      // serve order to customer
      const cookedOrder = arg;

      return this.customer.eat(cookedOrder).then(leftOrder => {
        this.order = leftOrder;
        return [[...this.order], this];
      });
    }

    const customer = arg;
    // command pattern: set receiver
    this.customer = customer;

    return this.customer.getOrder(this.getMenu()).then(order => {
      this.order.push(...order);
      return [[...this.order], this];
    });
  }
}
