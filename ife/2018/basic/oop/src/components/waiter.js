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

  order(consumer) {
    const orders = consumer.order(this.getMenus());
    this.orders.push(...orders);
    return [...this.orders];
  }

  serve(consumer, args) {
    this.orders = this.orders.filter(menu => !args.includes(menu));
    consumer.eat(args);
    return [...this.orders];
  }

  /**
   * @override
   * @memberof Waiter
   */
  work(consumer, ...args) {
    if (args.length > 0) {
      return this.serve(consumer, args);
    }

    return this.order(consumer);
  }
}
