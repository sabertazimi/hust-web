import Food from './food';

export default class Menus {
  constructor() {
    this.menus = [
      new Food('apple', 500),
      new Food('orange', 500),
      new Food('cola', 500),
    ];
  }

  order() {
    const index = Math.floor(Math.random() * this.menus.length);
    return this.menus.slice(index, 1);
  }
}
