import {
  STAFF_UNEMPLOYED,
  STAFF_FREE,
  STAFF_BUSY,
} from './constants';

export default class Staff {
  constructor(name = '', salary = 0) {
    this.id = STAFF_UNEMPLOYED;
    this.type = STAFF_UNEMPLOYED;
    this.status = STAFF_FREE;
    this.name = name;
    this.salary = salary;
  }

  setID(id = STAFF_UNEMPLOYED) {
    this.id = id;
  }

  getType() {
    return this.type;
  }

  isFree() {
    return (this.status === STAFF_FREE);
  }

  isBusy() {
    return (this.status === STAFF_BUSY);
  }

  setFree() {
    this.status = STAFF_FREE;
  }

  setBusy() {
    this.status = STAFF_BUSY;
  }

  getMenus() {
    return this.menus;
  }

  enter(restaurant) {
    this.setID(restaurant.nextStaffID());
    this.menus = restaurant.getMenus();
  }

  leave() {
    this.setID(STAFF_UNEMPLOYED);
    this.menus = STAFF_UNEMPLOYED;
  }

  isEmployed() {
    return !this.isUnemployed();
  }

  isUnemployed() {
    return this.id === STAFF_UNEMPLOYED;
  }

  work() {
    return this.name;
  }
}
