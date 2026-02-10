import React from 'react'
import "./App.css"
import {BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Home from './views/Home'
import ScrollToHash from './components/ScrollToHash'
import Login from './views/Login'
import Signup from './views/Signup'
import Dashboard from './views/Dashboard'
import {Toaster} from "sonner"
import Guide from './components/Guide'
import OAuth from './views/OAuth'
import Plans from './views/Plans'
import Navbar from './components/Navbar'
import PaymentSuccess from './views/PaymentSuccess'
import Admin from './views/Admin'
import NotFound from "./views/NotFound"

const App = () => {
  return (
    <BrowserRouter>
    <Toaster theme='dark' position='bottom-left' visibleToasts={2}/>
    <ScrollToHash/>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/signup" element ={<Signup/>}/>
          <Route path="/auth" element={<OAuth/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/plans' element={<Plans/>}/>
          <Route path='/success' element={<PaymentSuccess/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='*' element={<NotFound/>}/>
       </Routes>
     </BrowserRouter>
  )
}

export default App