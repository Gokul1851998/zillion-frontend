import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from '../../pages/user/Home'
import UserCart from '../../pages/user/UserCart'

export default function User() {
  return (
    <div>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/cart' element={<UserCart/>}/>
      </Routes>
    </div>
  )
}
