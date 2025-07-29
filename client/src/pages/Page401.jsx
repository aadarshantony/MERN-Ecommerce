import { Link } from 'react-router-dom';
import Img401 from '../assets/401.svg';

const Page401 = () => {
    return (
        <div className='flex flex-col h-screen w-full justify-center items-center'>
            <img src={Img401} alt="403Img" className='h-[500px]' />
            <Link to={'/login'} className='btn-primary'>Go to Login Page</Link>
            <a href="https://storyset.com/internet" className='text-gray-400 font-light pt-3'>Internet illustrations by Storyset</a>
        </div>
    )
}

export default Page401