import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'
import { Provider } from './medux'
import store from './store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
