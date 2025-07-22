import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full bg-black text-white py-4'>
            <div className='max-w-screen-xl m-auto sm:flex justify-between mt-20 px-4'>
                <div>
                    <h2 className='text-3xl font-extrabold mb-2'>Logo</h2>
                    <p>Designed with style. Powered by passion. <br />Your destination for timeless fashion</p>
                </div>
                <div className='max-[440px]:flex-col max-[440px]:mt-6 flex gap-16'>
                    <ul>
                        <li className='text-xl font-bold mb-4'>Shop</li>
                        <li className='font-medium mb-3'>All Collections</li>
                        <li className='font-medium mb-3'>Mens Wear</li>
                        <li className='font-medium mb-3'>Womens Wear</li>
                    </ul>
                    <ul>
                        <li className='text-xl font-bold mb-4'>Company</li>
                        <li className='font-medium mb-3'>About us</li>
                        <li className='font-medium mb-3'>Contact us</li>
                        <li className='font-medium mb-3'>Affiliates</li>
                    </ul>
                    <ul>
                        <li className='text-xl font-bold mb-4'>Support</li>
                        <li className='font-medium mb-3'>FAQs</li>
                        <li className='font-medium mb-3'>Privacy Policy</li>
                        <li className='font-medium mb-3'>Terms and Conditions</li>
                    </ul>
                </div>
                <div className='space-x-4'>

                    <p className='text-xl font-bold mb-4 max-[440px]:mt-6'>Social Media</p>
                    <ul className='flex items-center gap-3 [440px]:justify-between'>
                        <li className="text-lg">
                            <i className="fab fa-facebook-f"></i>
                        </li>
                        <li className="text-lg">
                            <i className="fab fa-instagram"></i>
                        </li>
                        <li className="text-lg">
                            <i className="fab fa-youtube"></i>
                        </li>

                    </ul>
                </div>
            </div>
            <div className='border-t-1 mt-20'>
                <p className='text-center text-sm pt-4'>Copyright <i className='fas fa-copyright'></i> 2025 All Rights Reserved <br /> Made by <a href='https://github.com/CodesByAda'>Adarsh Antony</a></p>
            </div>
        </footer>
    )
}

export default Footer