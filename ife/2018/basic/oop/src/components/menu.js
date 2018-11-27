import Food from './food';

export default class Menu {
  constructor() {
    this.list = [
      new Food('Sweet and Sour Pork', 50, 100, 3),
      new Food('Kung Pao Chicken', 40, 80, 4),
      new Food('Ma Po Tofu', 30, 60, 3),
      new Food('Dumplings', 35, 70, 3),
      new Food('Spring Rolls', 20, 50, 3),
      new Food('Peking Roasted Duck', 100, 200, 5),
    ];
  }

  generateOrder() {
    const index = Math.floor(Math.random() * (this.list.length - 1));
    return this.list.slice(index, index + 3);
  }
}
