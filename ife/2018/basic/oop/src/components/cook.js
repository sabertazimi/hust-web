import Staff from './staff';

export default class Cook extends Staff {
  constructor(name = '', salary = 0) {
    super(name, salary);
  }

  /**
   * @override
   * @memberof Waiter
   */
  work(menus) {
    this.cook(menus);
  }
}
