import {
  STAFF_UNEMPLOYED,
} from './constants';

export default class Staff {
  constructor(name = '', salary = 0) {
    this.id = STAFF_UNEMPLOYED;
    this.type = STAFF_UNEMPLOYED;
    this.name = name;
    this.salary = salary;
  }

  setID(id = STAFF_UNEMPLOYED) {
    this.id = id;
  }

  getType() {
    return this.type;
  }

  getMenus() {
    return this.menus;
  }

  enter(restaurant) {
    this.setID(restaurant.nextStaffID());
    this.menus = restaurant.getMenus();
    // this.restaurant = restaurant;
  }

  leave() {
    this.setID(STAFF_UNEMPLOYED);
    this.menus = STAFF_UNEMPLOYED;
    // this.restaurant = STAFF_UNEMPLOYED;
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
