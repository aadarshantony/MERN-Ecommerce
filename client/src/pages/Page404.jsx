import React from 'react'
import Img404 from '../assets/404.svg'
import { Link } from 'react-router-dom'
const Page404 = () => {
  return (
    <div className='flex flex-col h-screen w-full justify-center items-center'>
      <img src={Img404} alt="404Img" className='h-[500px]'/>
      <Link to={'/'} className='btn-primary'>Go back to Home</Link>
      <a href="https://storyset.com/web" className='text-gray-400 font-light pt-3 '>Web illustrations by Storyset</a>
    </div>
  )
}

export default Page404