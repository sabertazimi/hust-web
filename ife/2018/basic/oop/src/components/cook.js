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
  }

  // @TODO: map for (customer, order)
  /**
   * @override
   * @memberof Waiter
   */
  work(order, waiter) {
    return order.reduce((promise, food) => (
      promise.then(() => {
        $log(`cook '${this.name}' is cooking ${food.name} ...`);
        return (
          sleep(food.time)
            .then(() => {
              $log(`cook '${this.name}' cooked ${food.name}!`);
              return waiter.work([food]);
            })
            .then(([leftOrder]) => leftOrder)
        );
      })
    ), Promise.resolve());
  }
}
