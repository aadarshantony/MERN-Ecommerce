import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authServices';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const handleLogout = async () => {
        try {
            await logoutUser();
            queryClient.removeQueries(['me']);
            toast.success("Current session ended.")
            navigate('/');
        } catch (err) {
            toast.error("Error occoured while loggin out. please try again later.")
            console.error("Logout failed:", err);
        }
    }
    return (
        <nav className="border-b border-gray-200 w-full">
            <div className="max-w-[1800px] mx-auto px-4 h-20 flex justify-between items-center bg-white relative">

                {/* Left Section: Toggle + Logo */}
                <div className="flex items-center gap-4">
                    {/* Toggle Sidebar Button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded hover:bg-gray-100 lg:hidden"
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>

                    <Link to="/" className="text-3xl font-extrabold">
                        Logo
                    </Link>
                </div>

                {/* User Utils */}
                <div className="xl:flex items-center gap-3.5">
                    <Link to="/">
                        <i className="fas fa-home mr-3"></i>
                    </Link>
                    <i className="fas fa-right-from-bracket text-red-500 text-xl cursor-pointer" onClick={handleLogout}></i>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
