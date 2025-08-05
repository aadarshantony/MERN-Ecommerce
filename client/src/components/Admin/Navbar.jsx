import { Link } from 'react-router-dom';

const Navbar = () => {

    return (

        <nav className='border-b border-gray-200 w-full '>
            <div className='max-w-[1800px] mx-auto px-4 h-20 flex justify-between items-center bg-white relative'>
                {/*logo */}
                <div className='flex items-center justify-between gap-32'>
                    <Link to={'/'} className='text-3xl font-extrabold'>Logo</Link>
                </div>

                {/* NavSearchbar and utils */}
                <div className='xl:flex items-center gap-3.5 hidden'>
                    <i className='fas fa-user mr-3'></i>
                    <i className="fas fa-right-from-bracket text-red-500 text-xl"></i>

                </div>
            </div>
        </nav>
    )
}

export default Navbar