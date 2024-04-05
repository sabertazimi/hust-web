import { $log } from '../utils'
import { STAFF_COOK, STAFF_WAITER } from './constants'

import Menu from './menu'

export default class Restaurant {
  constructor({ cash = 0, seats = 0, staffs = [], customers = [] }) {
    this.cash = cash
    this.seats = seats
    this.staffs = staffs
    this.customers = customers
    this.menu = new Menu()
    this.STAFF_ID = 5
  }

  nextStaffID() {
    this.STAFF_ID += 1
    return this.STAFF_ID
  }

  getMenu() {
    return this.menu
  }

  getFreeStaff(type) {
    return this.staffs.filter(
      staff =>
        // staff.getType() === type && staff.isFree()
        staff.getType() === type,
    )
  }

  // @TODO: add seatID to each customer
  serve(customer) {
    $log(`[Enter] customer '${customer.name}' ...`)

    if (this.seats > 0) {
      const index = this.customers.indexOf(customer)

      if (index === -1) {
        this.seats -= 1
        this.customers.push(customer)

        const [waiter] = this.getFreeStaff(STAFF_WAITER)
        const [cook] = this.getFreeStaff(STAFF_COOK)

        $log(`serve for customer '${customer.name}' ...`)

        return waiter
          .work(customer)
          .then(([order, _waiter]) => {
            $log(
              `customer '${customer.name}' ordered (${order
                .map(food => food.name)
                .join(', ')}) !`,
            )
            return cook.work(order, _waiter)
          })
          .then(([order, leftOrder]) => {
            const eatenOrder = order.filter(food => !leftOrder.includes(food))
            const sales = eatenOrder.reduce(
              (sale, food) => sale + food.price,
              0,
            )
            this.cash += sales

            $log(
              `customer '${customer.name}' eaten (${eatenOrder
                .map(food => food.name)
                .join(', ')}) !`,
            )
            $log(`customer '${customer.name}' paid $${sales} !`)
            $log(`restaurant cash is $${this.cash} !`)
            return this.cash
          })
      }

      $log(`customer '${customer.name}' already in !`)
      return Promise.resolve()
    }

    $log(`No seats for costomer '${customer.name}' !`)
    return Promise.resolve()
  }

  depart(customer) {
    const index = this.customers.indexOf(customer)

    if (index !== -1) {
      this.seats += 1
      this.customers.splice(index, 1)
    }

    $log(`[Left] customer '${customer.name}' ...`)
  }

  hire(staff) {
    if (!this.staffs.includes(staff) && staff.isUnemployed()) {
      staff.enter(this)
      this.staffs.push(staff)
    }
  }

  fire(staff) {
    const index = this.staffs.indexOf(staff)

    if (index !== -1) {
      this.staffs[index].leave()
      this.staffs.splice(index, 1)
    }
  }
}
