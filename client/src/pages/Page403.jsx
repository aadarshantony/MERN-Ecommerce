import { Link } from 'react-router-dom';
import Img403 from '../assets/403.svg';

const Page403 = () => {
  return (
    <div className='flex flex-col h-screen w-full justify-center items-center'>
      <img src={Img403} alt="403Img" className='h-[500px]' />
      <Link to={'/'} className='btn-primary'>Go back to Home</Link>
      <a href="https://storyset.com/worker" className='text-gray-400 font-light pt-3'>Worker illustrations by Storyset</a>
    </div>
  )
}

export default Page403