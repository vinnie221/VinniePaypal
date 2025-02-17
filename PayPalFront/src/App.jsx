import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Vinnie from './vinnie'
import PaypalTest from './PaypalTest'

function App() {
  const [count, setCount] = useState(0)
  //console.log("Test ENV:", process.env.REACT_APP_TEST_VAR);


  return (
    <div>
      <PaypalTest/>

    </div>
    
  )
}

export default App
