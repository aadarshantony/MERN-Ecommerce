import { Outlet } from 'react-router-dom';
import Navbar from '../components/Admin/Navbar';
import Sidebar from '../components/Admin/Sidebar';
import { ModalProvider } from '../context/ModalContext';

const AdminLayout = () => (
  <ModalProvider>
    <div className="bg-[#f9fafb] h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-1 max-w-[1800px] w-full mx-auto overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
          <Outlet />
        </div>
      </div>
    </div>
  </ModalProvider>
);

export default AdminLayout;
