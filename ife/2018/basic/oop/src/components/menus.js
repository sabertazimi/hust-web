import Food from './food';

export default class Menus {
  constructor() {
    this.list = [
      new Food('apple', 500, 3000, 3),
      new Food('orange', 500, 3000, 4),
      new Food('cola', 500, 3000, 5),
    ];
  }

  generateOrder() {
    const index = Math.floor(Math.random() * this.list.length);
    return this.list.slice(index, index + 1);
  }
}
