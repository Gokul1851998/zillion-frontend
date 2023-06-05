import React, { useState } from 'react'

import Header from '../../../component/admin/AdminHeader/Header';
import Sidebar from '../../../component/admin/AdminSidebar/Sidebar';
import UserList from '../../../component/admin/AdminUser/UserList';

export default function Users() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
      <div>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-row" style={{minHeight:'100vh'}}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <UserList/>
          </div>
      </div>
    )
}
