import React, { useState } from 'react';
import './App.css';
import Switch from './Switch';

function App() {
  const [value, setValue] = useState(false);

  return (
    <div className="App">
      <Switch
        isOn={value}
        onColor="#EF476F"
        handleToggle={() => setValue(!value)}
      />
    </div>
  );
}

export default App;
