import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { userLogin, userSignin } from '../../apiCall/user'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Login() {
  const [showModal,setShowModal] = useState(false)
  const [loginEmail,setLoginEmail] = useState('')
  const [loginPassword,setLoginPassword] = useState('')
  const [signModal,setSignModal] = useState(false)
  const [signName,setSignName] = useState('')
  const [signEmail,setSignEmail] = useState('')
  const [signPassword,setSignPassword] = useState('')
  const [isLogin,setIsLogin] = useState(false)

  const userSign={
    signName,
    signEmail,
    signPassword
  }

  const userData={
    loginEmail,
    loginPassword
  }

  

  const SignUp=async(e)=>{
    e.preventDefault()
    const response = await userSignin(userSign)
    if(response.success){
      toast.success(response.message)
    }else{
        toast.error(response.message)
    }
    setSignModal(false)
    setShowModal(true)
  }

  

  const userSignIn=async(e)=>{
    e.preventDefault()
    const response = await userLogin(userData)
    if(response?.success){
        toast.success(response.message)
        if (response.data.token) {              
            localStorage.setItem('userToken',response.data?.token)
            setShowModal(false)
            setIsLogin(true)
            localStorage.setItem("userName",response.data.user.signName)
        }
    }else{
        toast.error(response.message)
    }
  }
  return (
    <div>
       <button onClick={()=>setShowModal(true)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login</button>
    
       
        {showModal ? (
      <>
      <div className=" modal flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-75 bg-gray-900">
        <div className="card">
        <div className="card-header text-center">
          <h3 className='text-xl'>Sign in</h3>
         </div>
          <div className="card-body">
            <form onSubmit={userSignIn} >
              <div className="input-group form-group mb-2">
               
                  <span className="input-group-text bg-warning"><i className="fas fa-user" /></span>
    
                <input type="text" onChange={(e) => setLoginEmail(e.target.value)} className="form-control" placeholder="Email Id" />
              </div>
              <div className="input-group form-group">
                
                  <span className="input-group-text bg-warning"><i className="fas fa-key" /></span>
            
                <input type="password" onChange={(e) => setLoginPassword(e.target.value)} className="form-control" placeholder="password" />
              </div>
              <div className="mt-2">
                <button type="submit" defaultValue="Login" className="btn float-right btn-success bg-green-600" >Login</button>
              </div>
            </form>
          </div>
          <div className="card-footer " >
            <div className="d-flex justify-content-center links">
             
              <button onClick={() => {
                setSignModal(true),setShowModal(false)
              }} type="button" className="btn btn-md mb-1 text-primary text-bold " >
            Sign Up
          </button>
            </div>
           
            <button
              
              type="button"
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '1rem',
                color: 'red'
              }}
            >
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
    
      ) : null}

{signModal ? (
      <>
      <div className=" modal flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-75 bg-gray-900">
        <div className="card">
        <div className="card-header text-center">
          <h3 className='text-xl'>Sign Up</h3>
         </div>
          <div className="card-body">
            <form onSubmit={SignUp}>
            <div className="input-group form-group mb-2">
               
               <span className="input-group-text bg-warning"><i className="fas fa-user" /></span>
 
             <input type="text" onChange={(e) => setSignName(e.target.value)} className="form-control" placeholder="User Name" />
           </div>
              <div className="input-group form-group mb-2">
               
                  <span className="input-group-text bg-warning"><i className="fas fa-user" /></span>
    
                <input type="text" onChange={(e) => setSignEmail(e.target.value)} className="form-control" placeholder="Email Id" />
              </div>
              <div className="input-group form-group">
                
                  <span className="input-group-text bg-warning"><i className="fas fa-key" /></span>
            
                <input type="password" onChange={(e) => setSignPassword(e.target.value)} className="form-control" placeholder="password" />
              </div>
              <div className="mt-2">
                <button type="submit" defaultValue="Login" className="btn float-right btn-success bg-green-600" >Submit</button>
              </div>
            </form>
          </div>
          <div className="card-footer " >
           
            <button
              
              type="button"
              onClick={() => setSignModal(false)}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '1rem',
                color: 'red'
              }}
            >
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
    
      ) : null}
    </div>
  )
}
