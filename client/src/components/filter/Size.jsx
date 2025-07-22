import React from 'react'

const Size = () => {
  return (
    <div className='p-4'>
        <h2 className='text-xl '>Size</h2>
        <div className="flex gap-2 flex-wrap mt-3">
            <button className="border rounded px-3 py-1 text-gray-600 hover:bg-gray-200 cursor-pointer">XS</button>
            <button className="border rounded px-3 py-1 text-gray-600 hover:bg-gray-200 cursor-pointer">S</button>
            <button className="border rounded px-3 py-1 text-gray-600 hover:bg-gray-200 cursor-pointer">M</button>
            <button className="border rounded px-3 py-1 text-gray-600 hover:bg-gray-200 cursor-pointer">L</button>
            <button className="border rounded px-3 py-1 text-gray-600 hover:bg-gray-200 cursor-pointer">XL</button>
          </div>
    </div>
  )
}

export default Size