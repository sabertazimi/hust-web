export default class Staff {
  constructor(name = '', salary = 0) {
    this.name = name;
    this.salary = salary;
  }

  work() {
    console.log(`${this.name} working ...`);
  }
}
