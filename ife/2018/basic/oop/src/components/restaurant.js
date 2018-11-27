import {
  STAFF_WAITER,
  STAFF_COOK,
} from './constants';

import {
  $log,
} from '../utils';

import Menu from './menu';

let STAFF_ID = 0;

export default class Restaurant {
  constructor({
    cash = 0,
    seats = 0,
    staffs = [],
    customers = [],
  }) {
    this.cash = cash;
    this.seats = seats;
    this.staffs = staffs;
    this.customers = customers;
    this.menus = new Menu();
  }

  /* eslint-disable */
  nextStaffID() {
    STAFF_ID += 1;
    return STAFF_ID;
  }
  /* eslint-enable */

  getMenus() {
    return this.menus;
  }

  getFreeStaff(type) {
    return this.staffs.filter(staff => (
      // staff.getType() === type && staff.isFree()
      staff.getType() === type
    ));
  }

  // @TODO: add seatID to each customer
  serve(customer) {
    $log(`[Enter] customer '${customer.name}' ...`);

    if (this.seats > 0) {
      const index = this.customers.indexOf(customer);

      if (index === -1) {
        this.seats -= 1;
        this.customers.push(customer);

        const [waiter] = this.getFreeStaff(STAFF_WAITER);
        const [cook] = this.getFreeStaff(STAFF_COOK);

        $log(`serve for customer '${customer.name}' ...`);

        return waiter.work(customer)
          .then(([order, _waiter]) => {
            $log(`customer '${customer.name}' ordered (${order.map(food => food.name).join(', ')}) !`);
            return cook.work(order, _waiter);
          })
          .then((leftOrder) => {
            $log(`customer '${customer.name}' left order (${leftOrder.map(food => food.name).join(', ')}) !`);
          });
      }

      $log(`customer '${customer.name}' already in !`);
      return Promise.resolve();
    }

    $log(`No seats for costomer '${customer.name}' !`);
    return Promise.resolve();
  }

  depart(customer) {
    const index = this.customers.indexOf(customer);

    if (index !== -1) {
      this.seats += 1;
      this.customers.splice(index, 1);
    }

    $log(`[Left] customer '${customer.name}' ...`);
  }

  hire(staff) {
    if (this.staffs.indexOf(staff) === -1
      && staff.isUnemployed()) {
      staff.enter(this);
      this.staffs.push(staff);
    }
  }

  fire(staff) {
    const index = this.staffs.indexOf(staff);

    if (index !== -1) {
      this.staffs[index].leave();
      this.staffs.splice(index, 1);
    }
  }
}
