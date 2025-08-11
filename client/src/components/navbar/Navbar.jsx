import Navhead from './Navhead'
import SearchBar from './SearchBar'
import { useState } from "react";
import ResponsiveNavlinks from "./ResponsiveNavlinks";
import Navlinks from "./Navlinks";
import { Link } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import CartSidebar from '../modals/CartSidebar';
import { useQuery } from '@tanstack/react-query';
import { getCartItems } from '../../services/cartServices';

const Navbar = () => {
  const { toggleCart } = useModal()
  const [menuOpen, setMenuOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
    refetchOnWindowFocus: false,
    retry: false
  });

  const cartCount = data?.cart?.items?.length || 0;

  return (
    <>
      <nav className='border-b border-gray-200 fixed  top-0 left-0 w-full z-100'>
        <Navhead />
        <div className='max-w-screen-xl mx-auto px-4 h-20 flex justify-between items-center bg-white relative'>
          {/* Navlinks and logo */}
          <div className='flex items-center justify-between gap-32'>
            <Link to={'/'} className='text-3xl font-extrabold'>Logo</Link>
            <div className="xl:flex gap-10 hidden">
              <Navlinks />
            </div>
          </div>

          {/* NavSearchbar and utils */}
          <div className='xl:flex items-center gap-3.5 hidden'>
            <SearchBar />
            <div>
              <Link to={'/signup'}>
                <i className='fas fa-user mr-3 cursor-pointer rounded-full p-2 transition-all hover:border-gray-400 hover:border hover:bg-gray-300'></i>
              </Link>
              <i onClick={toggleCart} className="fas fa-cart-shopping cursor-pointer rounded-full p-2 transition-all hover:border-gray-400 hover:border hover:bg-gray-200 relative">
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 inline-block h-3 w-3 rounded-full bg-red-600 border-2 border-white"></span>
                )}
              </i>
            </div>
          </div>

          <button className="xl:hidden" onClick={() => setMenuOpen(prev => !prev)}>
            <i className="fas fa-bars text-2xl"></i>
          </button>
          <ResponsiveNavlinks menuOpen={menuOpen} />
        </div>
      </nav>
      <CartSidebar />
    </>
  )
}

export default Navbar