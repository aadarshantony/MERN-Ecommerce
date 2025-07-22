import React from 'react'
import ProductCard from '../shoppingList/ProductCard'

const FeaturedProducts = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    )
}

export default FeaturedProducts