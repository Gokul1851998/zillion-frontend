import React, { useState } from 'react'
import Sidebar from '../../../component/admin/AdminSidebar/Sidebar'
import Header from '../../../component/admin/AdminHeader/Header';

export default function AdminHome() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
      <div>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-row" style={{minHeight:'100vh'}}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          </div>
      </div>
    )
}
