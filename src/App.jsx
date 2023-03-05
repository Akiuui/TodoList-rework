import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import FirstScreen from './components/FirstScreen'
// import LogIn from './components/LogIn'
import LoginRework from './components/LoginRework'
import { ProtectedRoute1, ProtectedRoute2 } from './components/ProtectedRoutes'
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
          <Route path='/' element={
            // <ProtectedRoute2>
            <FirstScreen />
            // </ProtectedRoute2>
          } />
          <Route path='/sign' element={
            // <ProtectedRoute2>
            <SignUp />
            // </ProtectedRoute2>
          } />
          <Route path='/login' element={
            // <ProtectedRoute2>
            <LoginRework />
            // </ProtectedRoute2>
          }
          />
          <Route path='/todo' element={
            // <ProtectedRoute1>
            <Todo />
            //</ProtectedRoute1>
          } />
          <Route path='/log' element={
            // <ProtectedRoute2>
            <LoginRework />
            // </ProtectedRoute2>
          } />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
