import React, { useState } from 'react';
import ProductHome from '../components/product/ProductHome';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFilteredProducts } from '../services/productServices';

const subCategories = ['All', 'Tops', 'Shirts', 'Jackets', 'Pants', 'Skirts'];

const Home = () => {
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');

    // If "All" is selected, send undefined (no filter)
    // Otherwise, send an array with one subcategory string
    const subCategoryFilter =
        selectedSubCategory === 'All' ? undefined : [selectedSubCategory];

    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ['filteredProducts', subCategoryFilter],
        queryFn: () => getFilteredProducts({ subCategory: subCategoryFilter }),
        keepPreviousData: true,
    });

    const displayedProducts = Array.isArray(products) ? products.slice(0, 8) : [];

    return (
        <>
            <main className="max-w-screen-xl mx-auto px-4 flex lg:flex-row flex-col justify-between h-[850px] pt-32">
                <div className="flex flex-col justify-center max-lg:text-center m-auto">
                    <h2 className="text-5xl font-extrabold lg:pr-10 mb-2 max-lg:pt-8 max-[472px]:text-4xl">
                        Effortless Fashion <br />
                        For the Modern You
                    </h2>
                    <p className="max-w-xl lg:pr-2">
                        Discover pieces that blend clean design with everyday comfort. Our
                        modern collections make it easy to look good without trying too
                        hard — timeless fashion made simple
                    </p>
                    <div className="mt-4">
                        <Link to={'/products'} className="btn-primary mr-4">
                            Shop Now
                        </Link>
                        <button className="btn-outline">Most Wanted</button>
                    </div>
                </div>
                <div className="lg:grow relative ">
                    <div className="bg-gray-600 h-[300px] w-[350px] max-[383px]:w-full m-auto rounded-2xl absolute top-32">
                        <img
                            src="home3.jpg"
                            alt="heroimg3"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="bg-gray-700 h-[500px] w-[350px] rounded-2xl lg:absolute max-[383px]:w-full static m-auto max-lg:mt-4  lg:left-[40%] top-3 ">
                        <img
                            src="home2.jpg"
                            alt="heroimg2"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="bg-gray-600 h-[300px] w-[350px] rounded-2xl absolute max-[383px]:w-full right-0 bottom-0">
                        <img
                            src="home1.jpg"
                            alt="heroimg1"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </div>
            </main>

            <section className="max-w-screen-xl m-auto px-4 my-6 max-lg:mt-30 max-[374px]:pt-30">
                <div>
                    <h2 className="font-bold text-4xl">Curated Styles for Every Mood</h2>
                    <p className="mt-2 max-w-3xl">
                        Discover fashion that fits your vibe—bold, minimal, or effortlessly
                        cool. Browse through our handpicked collection of trending apparel
                        made for modern lifestyles.
                    </p>
                </div>

                {/* Subcategory filter buttons */}
                <div className="flex gap-3 flex-wrap">
                    {subCategories.map((subCat) => (
                        <button
                            key={subCat}
                            onClick={() => setSelectedSubCategory(subCat)}
                            className={`mt-4 ${selectedSubCategory === subCat ? 'btn-primary' : 'btn-outline'
                                }`}
                        >
                            {subCat}
                        </button>
                    ))}
                </div>

                {/* Products grid and loading/error handling */}
                {isLoading ? (
                    <p className="mt-8 text-center">Loading products...</p>
                ) : isError ? (
                    <p className="mt-8 text-center text-red-600">Failed to load products.</p>
                ) : displayedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
                        {displayedProducts.map((product) => (
                            <ProductHome key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center col-span-full mt-8">No products found.</p>
                )}

                <div className="m-auto max-w-screen-3xl flex justify-center items-center">
                    <Link to={'/products'} className="btn-outline">
                        Browse Store <i className="fas fa-arrow-up rotate-45"></i>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Home;
