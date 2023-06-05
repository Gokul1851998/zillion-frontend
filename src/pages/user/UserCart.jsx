import React from 'react'
import Header from '../../component/user/Header'

import Footer from '../../component/user/Footer'
import Cart from '../../component/user/UserCart/Cart'

export default function UserCart() {
  return (
    <div>
      <Header/>
      <div style={{minHeight:'100vh'}}>
      <Cart/>
      </div>
      <Footer/>
    
    </div>
  )
}
