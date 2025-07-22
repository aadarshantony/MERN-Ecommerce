import React from 'react'

const Price = () => {
    return (
        <div className='p-4'>
            <h2 className='text-xl '>Price</h2>
            <input type="range" min="0" max="500" className="w-full h-2 cursor-pointer bg-gray-200 rounded-lg" />
            <div className="flex justify-between text-sm text-gray-600">
                <span>$0</span>
                <span>$500+</span>
            </div>
        </div>
    )
}

export default Price