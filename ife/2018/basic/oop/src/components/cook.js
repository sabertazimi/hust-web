import { $log, sleep } from '../utils'
import { STAFF_COOK } from './constants'

import Staff from './staff'

export default class Cook extends Staff {
  constructor(name = '', salary = 0) {
    super(name, salary)

    this.type = STAFF_COOK
  }

  // @TODO: map for (customer, order)
  /**
   * @override
   * @memberof Waiter
   */
  work(order, waiter) {
    return order.reduce(
      (promise, food, index, array) =>
        promise
          .then(() => {
            $log(
              `cook '${this.name}' is cooking (${food.name}) (${food.time} s) ...`,
            )
            return sleep(food.time)
          })
          .then(() => {
            $log(`cook '${this.name}' cooked (${food.name}) !`)

            if (index === array.length - 1) {
              // only wait for last food in order list
              return waiter.work([food])
            }

            waiter.work([food])
            return []
          })
          .then(([leftOrder]) => [order, leftOrder]),
      Promise.resolve(),
    )
  }
}
