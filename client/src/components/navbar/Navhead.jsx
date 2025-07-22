import React from 'react'

const Navhead = () => {
  return (
    <div className='bg-black w-full text-white'>
      <div className='max-w-screen-xl lg:mx-auto px-4 h-8 flex justify-between items-center text-sm'>
        <div className='flex items-center gap-2'>
          <i className='fas fa-phone'></i>
          <span>+91 9876543210</span>
        </div>

        <div className='flex items-center gap-2 '>
          <i className='fas fa-location-dot'></i>
          <span>Location</span>
        </div>
      </div>
    </div>
  )
}

export default Navhead
