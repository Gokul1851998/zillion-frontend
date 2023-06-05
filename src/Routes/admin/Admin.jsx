import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import AdminHome from '../../pages/admin/AdminHome/AdminHome'
import ProductManagement from '../../pages/admin/AdminProduct/ProductManagement'
import Users from '../../pages/admin/AdminUsers/Users'
import AdminApproval from '../../pages/admin/ProductAppoval/AdminApproval'
import AdminCategory from '../../pages/admin/Category/AdminCategory'


export default function Admin() {
  return (
    <div>
      <Routes>
      <Route exact path='/adminHome' element={<AdminHome/>}/>
      <Route exact path='/adminProduct' element={<ProductManagement/>}/>
      <Route exact path='/adminUsers' element={<Users/>}/>
      <Route exact path='/admin-approval' element={<AdminApproval/>}/>
      <Route exact path='/admin-category' element={<AdminCategory/>}/>
      </Routes>
    </div>
  )
}
