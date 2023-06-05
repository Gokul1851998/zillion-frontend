import React, { useState, useRef, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Transition from './Transition';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '../../../redux/adminSlice';



function UserMenu() {
  const dispatch =useDispatch()
  const navigate = useNavigate();
  const admin = useSelector(state=>state.admin.admin)
  
  const logoutAdmin = () => {
    localStorage.removeItem("SuperAdminToken");
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("Admin2");
    dispatch(setAdmin(''))
    navigate("/");
  };

  useEffect(()=>{
    const token = localStorage.getItem('SuperAdminToken');
    const adminToken = localStorage.getItem('AdminToken');
    const admin2 = localStorage.getItem('Admin2');
    if(token || adminToken || admin2){
         console.log('admin');
    }else{
        navigate('/')
    }
  },[])

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img className="w-8 h-8 rounded-full" src="https://png.pngtree.com/png-clipart/20190613/original/pngtree-send-icon-png-image_3581535.jpg" width="32" height="32" alt="User" />
        <div className="flex items-center truncate">
            
        {admin==='UserAdmin'? (
  <span className="truncate ml-2 text-white text-md font-large group-hover:text-slate-800">User Admin</span>
) :admin === 'Admin'? (
    <span className="truncate ml-2 text-white text-md font-large group-hover:text-slate-800">Admin</span>
) : (
    <span className="truncate ml-2 text-white text-md font-large group-hover:text-slate-800">Super Admin</span>
)}

          
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
          { admin==='UserAdmin' ? (
  <div className="font-medium text-slate-800">User Admin</div>
) :admin==='Admin'? (
  <div className="font-medium text-slate-800">Admin</div>
) : (
  <div className="font-medium text-slate-800">Super Admin</div>
)}
            
            <div className="text-xs text-slate-500 italic">Administrator</div>
          </div>
          <ul>
         
            <li>
              <a
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={logoutAdmin}
              >
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default UserMenu;