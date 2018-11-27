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

  getJob(id) {
    this.setID(id);
  }

  loseJob() {
    this.setID(STAFF_UNEMPLOYED);
  }

  isEmployed() {
    return !this.isUnemployed();
  }

  isUnemployed() {
    return this.id === STAFF_UNEMPLOYED;
  }

  work(...args) {
    console.log(`${this.name} working with ${args}`);
  }
}
