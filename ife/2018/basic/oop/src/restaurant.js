export default class Restaurant {
  constructor({
    cash = 0,
    seats = 0,
    staffs = [],
  }) {
    this.cash = cash;
    this.seats = seats;
    this.staffs = staffs;
  }

  hire(staff) {
    if (this.staffs.indexOf(staff) === -1) {
      this.staffs.push(staff);
    }
  }

  fire(staff) {
    const index = this.staffs.indexOf(staff);

    if (index !== -1) {
      this.staffs.splice(index, 1);
    }
  }
}
