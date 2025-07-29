import React from 'react'
import loadinSvg from '../../assets/productsLoading.svg'

const ProductsLoading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <img src={loadinSvg} alt="loading-img" className='h-[500px]' />
      <a href="https://storyset.com/web" className="text-gray-400 font-light pt-3">Web illustrations by Storyset</a>
    </div>
  )
}

export default ProductsLoading