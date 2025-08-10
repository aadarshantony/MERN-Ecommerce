import React from 'react'

const ProductDetails = ({ product }) => {
    return (
        <div className='w-full p-4'>
            {/* Product name and category */}
            <div>
                <h2 className='text-3xl font-normal'>{product?.name}</h2>
                <p className='font-light text-md pt-2'>{product?.category}</p>
                {product?.subCategory && (
                    <p className='font-light text-sm text-gray-600'>{product?.subCategory}</p>
                )}
            </div>

            {/* Price */}
            <div className='mt-3 flex items-center gap-4'>
                <p className='text-green-500 text-xl font-semibold'>
                    ₹{product?.price}
                    <span className='text-gray-400 line-through text-sm ml-2'>$79.99</span>
                </p>
            </div>
            {/* Sizes */}
            {product?.size && product?.size.length > 0 && (
                <div className="flex items-center gap-2 mt-3">
                    <span className="font-semibold text-gray-700">Sizes:</span>
                    {product?.size.map((sz) => (
                        <span
                            key={sz}
                            className="border border-gray-400 rounded px-2 py-0.5 text-sm text-gray-600"
                        >
                            {sz}
                        </span>
                    ))}
                </div>
            )}

            {/* Offer section */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded mt-4">
                <p className="font-semibold">Offers</p>
                <ul className="text-sm mt-1 space-y-1 list-disc list-inside text-gray-700">
                    <li>10% off on HDFC Bank Credit Cards</li>
                    <li>₹50 Cashback on PayTM Wallet</li>
                    <li>Buy 2 Get 1 Free</li>
                </ul>
            </div>

            {/* Product Description and other stuff */}
            <div className='mt-6'>
                <div>
                    <h2 className='text-xl font-normal'>Description</h2>
                    <p className='font-light mt-2'>{product?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails