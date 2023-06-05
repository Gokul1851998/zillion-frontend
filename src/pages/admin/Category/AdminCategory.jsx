import React, { useState } from 'react'

import Header from '../../../component/admin/AdminHeader/Header';
import Sidebar from '../../../component/admin/AdminSidebar/Sidebar';
import Category from '../../../component/admin/AdminCategory/Category';


export default function AdminCategory() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
      <div>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-row" style={{minHeight:'100vh'}}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Category/>
          </div>
      </div>
    )
}