import Staff from './staff';

export default class Waiter extends Staff {
  constructor(name = '', salary = 0) {
    super(name, salary);
    this.menus = [];
  }

  /**
   * @override
   * @memberof Waiter
   */
  work(...args) {
    if (args.length === 1) {
      this.serve(args);
    } else {
      this.addToMenus(args);
    }
  }
}
