import {
  STAFF_WAITER,
  STAFF_COOK,
} from './constants';

import $log from '../log';

import Menus from './menus';

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
    this.menus = new Menus();
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
    return this.staffs.filter(staff => staff.getType() === type);
  }

  // @TODO: add seatID to each customer
  serve(customer) {
    if (this.seats > 0) {
      const index = this.customers.indexOf(customer);

      if (index === -1) {
        $log(`[Enter] customer '${customer.name}' ...`);

        this.seats -= 1;
        this.customers.push(customer);

        const [waiter] = this.getFreeStaff(STAFF_WAITER);
        const [cook] = this.getFreeStaff(STAFF_COOK);

        $log(`serve for customer '${customer.name}'`);

        const orders = waiter.work(customer);
        $log(`customer '${customer.name}' order list: ${JSON.stringify(orders)}`);

        const cookedOrders = cook.work(orders);
        $log(`cook '${cook.name}' cooked list: ${JSON.stringify(cookedOrders)}`);

        const leftOrders = waiter.work(customer, cookedOrders);
        $log(`customer '${customer.name}' left order list: ${JSON.stringify(leftOrders)}`);
      } else {
        $log(`customer ${customer.name} already in`);
      }
    } else {
      $log('No seats!');
    }
  }

  depart(customer) {
    const index = this.customers.indexOf(customer);

    if (index !== -1) {
      $log(`[Left] customer '${customer.name}' ...`);
      this.seats += 1;
      this.customers.splice(index, 1);
    }
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
