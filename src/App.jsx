import React from 'react'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Otp from './pages/Otp'


const App = () => {
  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      
    </Routes>
  )
}

export default App;