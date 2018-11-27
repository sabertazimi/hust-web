import {
  STAFF_WAITER,
} from './constants';
import Staff from './staff';

export default class Waiter extends Staff {
  // @TODO: map for (customer, order)
  constructor(name = '', salary = 0) {
    super(name, salary);

    this.type = STAFF_WAITER;
    this.order = [];
  }

  /**
   * @param {*} customer
   * @returns customer order list
   * @memberof Waiter
   */
  getOrderFrom(customer) {
    // command pattern: set receiver
    this.customer = customer;

    const order = this.customer.getOrder(this.getMenus());
    this.order.push(...order);
    return [...this.order];
  }

  /**
   * @param {*} customer
   * @param {*} cookedOrder
   * @returns left order list
   * @memberof Waiter
   */
  serveFor(cookedOrder) {
    this.order = this.customer.eat(cookedOrder);
    return [...this.order];
  }

  /**
   * @override
   * @memberof Waiter
   */
  work(arg) {
    if (arg && Array.isArray(arg)) {
      // serve order to customer
      const order = arg;
      return this.serveFor(order);
    }

    const customer = arg;
    return this.getOrderFrom(customer);
  }
}
