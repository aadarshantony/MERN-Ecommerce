import React from 'react';

const ProductHome = ({ product }) => {
  if (!product) return null;

  return (
    <div className='p-2 rounded-2xl hover:shadow-2xl transition cursor-pointer border border-gray-200'>
      <div className='h-[400px] rounded-2xl '>
        <img
          src={product.thumbnail || "home2.jpg"}
          alt={product.name || "product image"}
          className='h-full w-full object-cover object-top rounded-2xl'
        />
      </div>
      <div className='pt-2 px-2'>
        <div className='flex justify-between items-center'>
          <h2 className='font-medium text-lg'>{product.name}</h2>
        </div>
        <p className='text-sm font-medium'>{product.category}</p>
        <p className='text-xl font-medium mt-2'>₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductHome;
