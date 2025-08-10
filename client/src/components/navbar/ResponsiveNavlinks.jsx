import Navlinks from './Navlinks'
import SearchBar from './SearchBar'
import { useModal } from '../../context/ModalContext';
import { useQuery } from '@tanstack/react-query';
import { getCartItems } from '../../services/cartServices';
import { Link } from 'react-router-dom';
import CartSidebar from '../modals/CartSidebar';

const ResponsiveNavlinks = ({ menuOpen }) => {
  const { toggleCart } = useModal()

  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
    refetchOnWindowFocus: false,
  });

  const cartCount = data?.cart?.items?.length || 0;
  return (
    <>
      <div className={`${menuOpen ? 'border-gray-200 flex flex-col absolute top-22 right-0 max-w-xl w-full p-4 bg-white space-y-8 shadow-xl' : 'hidden'}`}>
        <Navlinks />
        <div className='flex justify-between items-center '>
          <SearchBar />
          <div >
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
      </div>
      <CartSidebar />
    </>

  )
}

export default ResponsiveNavlinks