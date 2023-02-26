import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import FirstScreen from './components/FirstScreen'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Todo from './components/Todo'
import { AuthContextProvider } from './context/ContextAuth'
import './index.css'

function App() {
  <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"></link>
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<FirstScreen />} />
          <Route path='/sign' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
