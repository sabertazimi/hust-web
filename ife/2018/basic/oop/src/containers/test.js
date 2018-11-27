import {
  Restaurant,
  Waiter,
  Cook,
  Consumer,
} from '../components';

const test = ($log) => {
  const ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 1,
    staffs: [],
  });

  const waiter = new Waiter('Sily', 10000);
  const cook = new Cook('Tony', 10000);
  ifeRestaurant.hire(waiter);
  ifeRestaurant.hire(cook);

  $log('Staffs:');
  $log(waiter);
  $log(cook);

  const consumer = new Consumer('Saber');

  $log('Consumer:');
  $log(consumer);

  consumer.enter(ifeRestaurant);
  consumer.enter(ifeRestaurant);
  consumer.leave(ifeRestaurant);
  consumer.leave(ifeRestaurant);
  consumer.enter(ifeRestaurant);
  consumer.leave(ifeRestaurant);
};

export default test;
