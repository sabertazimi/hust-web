export default class Consumer {
  constructor(name = '') {
    this.name = name;
    this.menus = [];
  }

  enter(restaurant) {
    restaurant.serve(this);
  }

  leave(restaurant) {
    restaurant.depart(this);
  }
}
