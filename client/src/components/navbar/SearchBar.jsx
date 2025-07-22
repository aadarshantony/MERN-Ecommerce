import React from 'react'

const SearchBar = () => {
  return (
    <div>
        <input id='search-input' name='search-input' type="text" placeholder='Search..' className='bg-gray-200 rounded-2xl p-1 pl-4 text-black focus:outline-2'/>
    </div>
  )
}

export default SearchBar