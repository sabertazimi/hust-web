import {
  Restaurant,
  Waiter,
  Cook,
  Customer,
} from './components';

const test = () => {
  const ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 1,
    staffs: [],
  });

  const waiter = new Waiter('Sily', 10000);
  const cook = new Cook('Tony', 10000);
  const customer = new Customer('Saber');

  ifeRestaurant.hire(waiter);
  ifeRestaurant.hire(cook);

  customer.enter(ifeRestaurant);
  customer.enter(ifeRestaurant);
  customer.leave(ifeRestaurant);
  customer.leave(ifeRestaurant);
  customer.enter(ifeRestaurant);
  customer.leave(ifeRestaurant);
};

export default test;
