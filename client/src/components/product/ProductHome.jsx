import React from 'react'

const ProductHome = () => {
  return (
    <div className='p-2 rounded-2xl hover:shadow-2xl transition cursor-pointer border border-gray-200'>
        <div className='h-[400px] rounded-2xl '>
            <img src="home2.jpg" alt="productimg" className='h-full w-full object-cover object-top rounded-2xl' />
        </div>
        <div className=' pt-2 px-2'>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium text-lg'>Lady Top</h2>
                <i className='fas fa-star text-sm'>4.5</i>
            </div>
            <p className='text-sm font-medium'>Women's wear</p>
            <p className='text-xl font-medium mt-2'>$49.99</p>
        </div>
    </div>
  )
}

export default ProductHome