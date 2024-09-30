import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Userlist from './Userlist'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Userlist />
    </>
  )
}

export default App
