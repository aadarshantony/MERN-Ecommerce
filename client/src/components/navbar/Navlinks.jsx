import React from 'react'
import { Link } from 'react-router-dom'
const Navlinks = () => {
    return (
        <>
            <Link to='/'>Home</Link>
            <Link to='/products'>Shop</Link>
            <Link to=''>Most Wanted</Link>
            <Link to=''>Contact Us</Link>
        </>
    )
}

export default Navlinks