import React from 'react'
import "./App.css"
import {BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Home from './views/Home'
import ScrollToHash from './components/ScrollToHash'
import Login from './views/Login'
import Signup from './views/Signup'
import Dashboard from './views/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToHash/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/signup" element ={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
       </Routes>
     </BrowserRouter>
  )
}

export default App