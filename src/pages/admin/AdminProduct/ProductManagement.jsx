import React, { useState } from 'react'
import AdminProduct from '../../../component/admin/ProductMangement/AdminProduct';
import Header from '../../../component/admin/AdminHeader/Header';
import Sidebar from '../../../component/admin/AdminSidebar/Sidebar';

export default function ProductManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
      <div>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-row" style={{minHeight:'100vh'}}>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <AdminProduct/>
          </div>
      </div>
    )
}
