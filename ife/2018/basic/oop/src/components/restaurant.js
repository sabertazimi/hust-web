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
  }

  serve(consumer) {
    if (this.seats > 0) {
      const index = this.consumers.indexOf(consumer);

      if (index === -1) {
        this.seats -= 1;
        this.consumers.push(consumer);
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
      staff.getJob(STAFF_ID);
      STAFF_ID += 1;
      this.staffs.push(staff);
    }
  }

  fire(staff) {
    const index = this.staffs.indexOf(staff);

    if (index !== -1) {
      this.staffs[index].loseJob();
      this.staffs.splice(index, 1);
    }
  }
}
