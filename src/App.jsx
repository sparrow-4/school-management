import React from 'react'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App;