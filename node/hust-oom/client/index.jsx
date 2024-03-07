import React from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import App from './App'
import { reducer } from './states'

const store = createStore(reducer)
createRoot(document.getElementById('root')).render(<App store={store} />)
