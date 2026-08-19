import { useState } from 'react'
import LoginForm from './auth/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LoginForm />
    </>
  )
}

export default App
