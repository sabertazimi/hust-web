import { Cook, Customer, Restaurant, Waiter } from './components'

import { sleep } from './utils'

import './index.css'

function app() {
  const ifeRestaurant = new Restaurant({
    cash: 0,
    seats: 1,
    staffs: [],
  })

  const waiter = new Waiter('Sily', 10000)
  const cook = new Cook('Tony', 10000)

  ifeRestaurant.hire(waiter)
  ifeRestaurant.hire(cook)

  let CUSTOMER_ID = 0

  const mainLoop = () => {
    const time = Math.floor(Math.random() * 3 + 3)

    sleep(time).then(() => {
      if (CUSTOMER_ID < 10) {
        CUSTOMER_ID += 1
        const customer = new Customer(`Customer ${CUSTOMER_ID}`)
        // eslint-disable-next-line promise/no-nesting -- Legacy code.
        customer.enter(ifeRestaurant).then(() => {
          return customer.leave(ifeRestaurant)
        // eslint-disable-next-line promise/no-nesting -- Legacy code.
        }).catch(console.error)
        mainLoop()
      }

      return true
    }).catch(console.error)
  }

  mainLoop()
}

app()
