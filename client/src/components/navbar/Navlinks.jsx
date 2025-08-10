import React from 'react'
import { Link } from 'react-router-dom'
const Navlinks = () => {
    return (
        <>
            <Link to='/'>Home</Link>
            <Link to='/products'>Shop</Link>
            <Link to='/orders'>My Orders</Link>
        </>
    )
}

export default Navlinks