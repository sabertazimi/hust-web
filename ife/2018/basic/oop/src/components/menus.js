import Food from './food';

export default class Menus {
  constructor() {
    this.list = [
      new Food('apple', 500, 3000),
      new Food('orange', 500, 3000),
      new Food('cola', 500, 3000),
    ];
  }

  generateOrder() {
    const index = Math.floor(Math.random() * this.list.length);
    return this.list.slice(index, index + 1);
  }
}
