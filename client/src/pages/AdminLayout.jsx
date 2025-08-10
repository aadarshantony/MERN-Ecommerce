import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Admin/Navbar';
import Sidebar from '../components/Admin/Sidebar';
import { ModalProvider } from '../context/ModalContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ModalProvider>
      <div className="bg-[#f9fafb] h-screen flex flex-col">
        {/* Top Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content Area */}
        <div className="flex flex-1 max-w-[1800px] w-full mx-auto overflow-hidden relative">
          {/* Sidebar */}
          <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden absolute h-full z-30 lg:static lg:w-64 lg:block`} >
            <Sidebar />
          </div>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default AdminLayout;
