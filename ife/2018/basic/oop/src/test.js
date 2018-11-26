import Restaurant from './restaurant';
import Cook from './cook';

const Test = ($log) => {
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

export default Test;
