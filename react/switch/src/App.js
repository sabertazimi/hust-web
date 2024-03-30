import React, { useState } from 'react'
import './App.css'
import Switch from './Switch.jsx'

/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [value, setValue] = useState(false)

  return (
    <div className="app">
      <Switch
        isOn={value}
        onColor="#EF476F"
        handleToggle={() => setValue(!value)}
      />
    </div>
  )
}

export default App
