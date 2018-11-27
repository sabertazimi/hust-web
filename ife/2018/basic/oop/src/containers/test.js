import {
  Restaurant,
  Waiter,
  Cook,
  Consumer,
} from '../components';

const test = () => {
  const ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 1,
    staffs: [],
  });

  const waiter = new Waiter('Sily', 10000);
  const cook = new Cook('Tony', 10000);
  ifeRestaurant.hire(cook);
  ifeRestaurant.hire(waiter);

  const consumer = new Consumer('Saber');
  consumer.enter(ifeRestaurant);
  consumer.leave(ifeRestaurant);
};

export default test;
