import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="bg-white border border-gray-200 shadow-md h-full overflow-y-auto">
      <div className="border-b border-b-gray-200">
        <h2 className="text-xl font-bold p-4">Dashboard</h2>
      </div>
      <div className="flex flex-col">
        <Link className="p-4 border-t border-t-gray-200 hover:bg-gray-200" to="/admin/products">
          Products
        </Link>
        <Link className="p-4 border-t border-t-gray-200 hover:bg-gray-200" to="/admin/orders">
          Orders
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
