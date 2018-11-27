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
   * @param {*} consumer
   * @returns consumer order list
   * @memberof Waiter
   */
  order(consumer) {
    // @TODO: map for [consumer, orders]
    const orders = consumer.order(this.getMenus());
    this.orders.push(...orders);
    return [...this.orders];
  }

  /**
   * @param {*} consumer
   * @param {*} cookedOrders
   * @returns left order list
   * @memberof Waiter
   */
  serve(consumer, cookedOrders) {
    // @TODO: map for [consumer, orders]
    this.orders = consumer.eat(cookedOrders);
    return [...this.orders];
  }

  /**
   * @override
   * @memberof Waiter
   */
  work(consumer, orders) {
    if (orders) {
      return this.serve(consumer, orders);
    }

    return this.order(consumer);
  }
}
