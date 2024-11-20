import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import { reducer } from './states'

const store = createStore(reducer)
createRoot(document.getElementById('root')).render(<App store={store} />)
