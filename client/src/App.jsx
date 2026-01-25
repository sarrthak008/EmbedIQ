import React from 'react'
import "./App.css"
import {BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Home from './views/Home'
import ScrollToHash from './components/ScrollToHash'

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToHash/>
       <Routes>
          <Route path='/' element={<Home/>}/>
       </Routes>
     </BrowserRouter>
  )
}

export default App