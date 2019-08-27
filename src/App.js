import React from 'react'
import { Typography } from '@material-ui/core'
import DndPlayground from './components/DndPlayground'
import './App.css'

function App() {
  return (
    <div className="App" style={{ borderBottom: '2px solid #97D700', height: 'calc(100% - 2px)' }}>
      <Typography variant="h4" align="center" className="heading">Form Builder</Typography>
      <DndPlayground />
    </div>
  );
}

export default App;
