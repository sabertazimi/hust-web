import {
  Restaurant,
  Cook,
} from '../components';

const test = ($log) => {
  const ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staffs: [],
  });

  const newCook = new Cook('Tony', 10000);

  ifeRestaurant.hire(newCook);
  $log(ifeRestaurant.staffs);

  ifeRestaurant.fire(newCook);
  $log(ifeRestaurant.staffs);
};

export default test;
