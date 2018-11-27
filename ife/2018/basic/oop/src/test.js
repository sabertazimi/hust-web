import {
  Restaurant,
  Waiter,
  Cook,
  Consumer,
} from './components';

const test = () => {
  const ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 1,
    staffs: [],
  });

  const waiter = new Waiter('Sily', 10000);
  const cook = new Cook('Tony', 10000);
  const consumer = new Consumer('Saber');

  ifeRestaurant.hire(waiter);
  ifeRestaurant.hire(cook);

  consumer.enter(ifeRestaurant);
  consumer.enter(ifeRestaurant);
  consumer.leave(ifeRestaurant);
  consumer.leave(ifeRestaurant);
  consumer.enter(ifeRestaurant);
  consumer.leave(ifeRestaurant);
};

export default test;
