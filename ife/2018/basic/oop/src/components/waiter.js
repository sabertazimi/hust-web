import {
  STAFF_WAITER,
} from './constants';
import Staff from './staff';

export default class Waiter extends Staff {
  constructor(name = '', salary = 0) {
    super(name, salary);

    this.type = STAFF_WAITER;
    this.orders = [];
  }

  /**
   * @param {*} customer
   * @returns customer order list
   * @memberof Waiter
   */
  // @TODO: map for (customer, orders)
  order(customer) {
    const orders = customer.order(this.getMenus());
    this.orders.push(...orders);
    return [...this.orders];
  }

  /**
   * @param {*} customer
   * @param {*} cookedOrders
   * @returns left order list
   * @memberof Waiter
   */
  // @TODO: map for (customer, orders)
  serve(customer, cookedOrders) {
    this.orders = customer.eat(cookedOrders);
    return [...this.orders];
  }

  /**
   * @override
   * @memberof Waiter
   */
  work(customer, orders) {
    if (orders) {
      return this.serve(customer, orders);
    }

    return this.order(customer);
  }
}
