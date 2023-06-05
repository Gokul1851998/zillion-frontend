import React from 'react'
import Header from '../../component/user/Header'
import Products from '../../component/user/Products'
import Footer from '../../component/user/Footer'

export default function Home() {
  return (
    <div>
      <Header/>
      <div style={{minHeight:'100vh'}}>
      <Products/>
      </div>
      <Footer/>
    
    </div>
  )
}
