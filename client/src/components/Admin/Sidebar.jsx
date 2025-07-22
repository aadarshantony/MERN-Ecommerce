import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
      <div className='bg-white border border-gray-200 shadow-md w-3xs lg:h-[calc(100vh-80)] overflow-y-hidden rounded-md'>
        <div className='border-b border-b-gray-200'>
          <h2 className='text-xl font-bold p-4'>Dashboard</h2>
        </div>
        <div className='flex flex-col'>
          <Link className='p-4 border-t border-t-gray-200 hover:bg-gray-200' to='/admin'>Overview</Link>
          <Link className='p-4 border-t border-t-gray-200 hover:bg-gray-200' to='/admin/products'>Products</Link>
          <Link className='p-4 border-t border-t-gray-200 hover:bg-gray-200' to='/admin/orders'>Orders</Link>
          <Link className='p-4 border-t border-t-gray-200 hover:bg-gray-200' to='/admin/users'>Users</Link>
          <Link className='p-4 border-t border-t-gray-200 hover:bg-gray-200' to='/admin/analytics'>Analytics</Link>
        </div>
      </div>
    </>

  )
}

export default Sidebar