import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import { userLogin, userSignin } from '../../apiCall/user'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAdmin } from '../../redux/adminSlice'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showModal,setShowModal] = useState(false)
  const [loginEmail,setLoginEmail] = useState('')
  const [loginPassword,setLoginPassword] = useState('')
  const [signModal,setSignModal] = useState(false)
  const [signName,setSignName] = useState('')
  const [signEmail,setSignEmail] = useState('')
  const [signPassword,setSignPassword] = useState('')
   const[displayName,setDisplayName] = useState()
   const[isLogin,setIsLogin] = useState(false)

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
        }else if(response.data.Superadmintoken){
          localStorage.setItem('SuperAdminToken',response.data?.Superadmintoken)
            setShowModal(false)
            dispatch(setAdmin(''))
            navigate('/admin/adminUsers')
        }else if(response.data.Admin2){
          localStorage.setItem('Admin2',response.data?.Admin2)
            setShowModal(false)
            dispatch(setAdmin(response.data.user.status))
            navigate('/admin/adminProduct')
        }else{
          localStorage.setItem('AdminToken',response.data?.admintoken)
            setShowModal(false)
             dispatch(setAdmin(response.data.user.status))
              navigate('/admin/admin-approval')
         
        }
    }else{
        toast.error(response.message)
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem('userToken');
    const userName = localStorage.getItem("userName")
    setDisplayName(userName)
    if(token){
      setIsLogin(true)
    }
  },[isLogin])

  const goToCart = async()=>{
    navigate('/cart',{state:displayName})
  }

  const Logout =()=>{
    localStorage.removeItem("userToken"),
    localStorage.removeItem("userName")
    setIsLogin(false)
  }
  return (
    <>
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex justify-center text-white font-bold pl-6 pr-3" style={{fontSize: "24px"}}>
      <h2><span className="text-danger font-bold">Zillion</span>-Kart</h2><hr className="border-t-2 bg-white" />
    </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button onClick={goToCart}
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400  focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                
                  <div>
             
                  <i className="fas fa-shopping-cart " />
                  <button className="w-6 h-5 rounded-full 
                       bg-grey-900  text-white border-white">
        0
      </button>
        <span className="badge text-secondary   " id="cartCount" >
        </span>
      </div>
                </button>

                {/* Profile dropdown */}
                {isLogin? (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://e7.pngegg.com/pngimages/223/244/png-clipart-computer-icons-avatar-user-profile-avatar-heroes-rectangle.png"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={Logout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> 
                ):(
                  <button onClick={()=>setShowModal(true)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login</button>
                )}
               <div className='ml-2'>
               <h2 className='text-white text-bold'> {displayName}</h2>
               </div>
                
              </div>
              
            </div>
            
          </div>
       
      
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
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
    </>
  )
}
