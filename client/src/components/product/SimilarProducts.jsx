import React, { useEffect, useState } from 'react';
import ProductCard from '../shoppingList/ProductCard';
import { getFilteredProducts } from '../../services/productServices';

const SimilarProducts = ({ category, subCategory, productId }) => {
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const filters = { category, subCategory };
                const products = await getFilteredProducts(filters);

                const filtered = products.filter(p => p._id !== productId);

                setSimilarProducts(filtered);
            } catch (error) {
                console.error("Failed to load similar products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (category) fetchSimilar();
    }, [category, subCategory, productId]);

    if (loading) return <p>Loading similar products...</p>;

    if (similarProducts.length === 0) return <p className='text-gray-400'>No similar products found.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {similarProducts.map(product => (
                <ProductCard
                    key={product._id}
                    productId={product._id}
                    name={product.name}
                    category={product.category}
                    image={product.thumbnail}
                    price={product.price}
                />
            ))}
        </div>
    );
};

export default SimilarProducts;
