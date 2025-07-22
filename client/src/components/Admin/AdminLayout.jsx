import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ModalProvider } from '../../context/ModalContext';

const AdminLayout = () => (
  <ModalProvider>
    <div className="bg-[#f9fafb]">
      <Navbar />
      <div className="h-[calc(100vh-100px)] max-h-screen max-w-[1800px] m-auto overflow-y-hidden bg-[#f9fafb] flex my-2">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  </ModalProvider>

);

export default AdminLayout;
