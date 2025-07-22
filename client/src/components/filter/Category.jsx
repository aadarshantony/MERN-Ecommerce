import React from 'react'

const Category = ({ categoryName, categoryList }) => {
    return (
        <div className='p-4'>
            <h2 className='text-xl '>{categoryName}</h2>
            <div className='mt-3 text-gray-600'>
                {categoryList.map(category => (
                    <div className='flex items-center gap-2' key={category}>
                        <input className='rounded-md' type="checkbox" name={category} id={category.toLowerCase()} />
                        <label htmlFor={category.toLowerCase()}>{category}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category