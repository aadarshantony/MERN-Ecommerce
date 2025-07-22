import Navlinks from './Navlinks'
import SearchBar from './SearchBar'

const ResponsiveNavlinks = ({ menuOpen }) => {
  return (
    <div className={`${menuOpen ? 'border-gray-200 flex flex-col absolute top-22 right-0 max-w-xl w-full p-4 bg-white space-y-8 shadow-xl' : 'hidden'}`}>
      <Navlinks />
      <div className='flex justify-between items-center '>
        <SearchBar />
        <div >
          <i className='fas fa-user mr-3'></i>
          <i className='fas fa-bucket'></i>
        </div>
      </div>

    </div>
  )
}

export default ResponsiveNavlinks