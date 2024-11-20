import { createRoot } from 'react-dom/client'
import App from './App.js'
import { Provider } from './medux'
import store from './store.js'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
