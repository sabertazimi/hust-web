import {
  STAFF_COOK,
} from './constants';
import Staff from './staff';

export default class Cook extends Staff {
  constructor(name = '', salary = 0) {
    super(name, salary);

    this.type = STAFF_COOK;
    this.menus = [];
  }

  /**
   * @override
   * @memberof Waiter
   */
  work(menus) {
    this.cook(menus);
  }
}
