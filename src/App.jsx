import React,{ Fragment } from 'react'
import {BrowserRouter,Route,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import User from './Routes/user/user'
import Admin from './Routes/admin/Admin'

function App(){
  // const {loading} = useSelector((state) => state.loaders)
  return (
    <Fragment>
      
      <BrowserRouter>
      <Toaster/>
        <Routes>
          <Route path='/*' element={<User/>} />
          <Route path='/admin/*' element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;