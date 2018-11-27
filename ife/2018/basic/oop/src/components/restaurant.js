import {
  STAFF_WAITER,
  STAFF_COOK,
} from './constants';

import Menus from './menus';

let STAFF_ID = 0;

export default class Restaurant {
  constructor({
    cash = 0,
    seats = 0,
    staffs = [],
    consumers = [],
  }) {
    this.cash = cash;
    this.seats = seats;
    this.staffs = staffs;
    this.consumers = consumers;
    this.menus = new Menus();
  }

  getMenus() {
    return this.menus;
  }

  getFreeStaff(type) {
    return this.staffs.filter(staff => staff.getType() === type);
  }

  serve(consumer) {
    if (this.seats > 0) {
      const index = this.consumers.indexOf(consumer);

      if (index === -1) {
        this.seats -= 1;
        this.consumers.push(consumer);

        const [waiter] = this.getFreeStaff(STAFF_WAITER);
        const [cook] = this.getFreeStaff(STAFF_COOK);
        const orders = waiter.work(consumer);
        const cookedOrders = cook.work(orders);
        waiter.work(consumer, cookedOrders);
      }
    }
  }

  depart(consumer) {
    const index = this.consumers.indexOf(consumer);

    if (index !== -1) {
      this.seats += 1;
      this.consumers.splice(index, 1);
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

  /* eslint-disable */
  nextStaffID() {
    STAFF_ID += 1;
    return STAFF_ID;
  }
  /* eslint-enable */
}
