import React from 'react'

const ProductDetails = () => {
    return (
        <div className='w-full p-4'>
            {/*Product name and category */}
            <div>
                <h2 className='text-3xl font-normal'>Lady Top</h2>
                <p className='font-light text-md pt-4'>Womens Wear</p>
            </div>

            {/*Price Section & Rating*/}
            <div className='mt-3'>
                <p className='text-green-500 text-xl'>$49.99 <span className='text-gray-400 line-through text-sm'>$79.99</span></p>
            </div>

            {/*Offer section */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded mt-2">
                <p className="font-semibold">Offers</p>
                <ul className="text-sm mt-1 space-y-1 list-disc list-inside text-gray-700">
                    <li>10% off on HDFC Bank Credit Cards</li>
                    <li>₹50 Cashback on PayTM Wallet</li>
                    <li>Buy 2 Get 1 Free</li>
                </ul>
            </div>

            {/*Product Description and other stuff */}
            <div className='mt-6'>
                <div>
                    <h2 className='text-xl font-normal'>Description</h2>
                    <p className='font-light mt-2'>This lady top is made with high-quality materials and fits perfectly for any occasion. Stylish, comfortable, and a must-have in your wardrobe.</p>
                </div>
            </div>

        </div>
    )
}

export default ProductDetails