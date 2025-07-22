import '../index.css'
import ProductHome from '../components/product/ProductHome'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <>
            <main className='max-w-screen-xl mx-auto px-4 flex lg:flex-row flex-col justify-between h-[850px] pt-32'>
                <div className='flex flex-col justify-center max-lg:text-center m-auto'>
                    <h2 className='text-5xl font-extrabold lg:pr-10 mb-2 max-lg:pt-8 max-[472px]:text-4xl'>Effortless Fashion <br />For the Modern You</h2>
                    <p className='max-w-xl lg:pr-2'>Discover pieces that blend clean design with everyday comfort. Our modern collections make it easy to look good without trying too hard — timeless fashion made simple</p>
                    <div className='mt-4'>
                        <Link to={'/products'} className='btn-primary mr-4'>Shop Now</Link>
                        <button className='btn-outline'>Most Wanted</button>
                    </div>
                </div>
                <div className='lg:grow relative '>
                    <div className='bg-gray-600 h-[300px] w-[350px] max-[383px]:w-full m-auto rounded-2xl absolute top-32'>
                        <img src="home3.jpg" alt="heroimg3" className='w-full h-full object-cover rounded-2xl' />
                    </div>
                    <div className='bg-gray-700 h-[500px] w-[350px] rounded-2xl lg:absolute max-[383px]:w-full static m-auto max-lg:mt-4  lg:left-[40%] top-3 '>
                        <img src="home2.jpg" alt="heroimg2" className='w-full h-full object-cover rounded-2xl' />
                    </div>
                    <div className='bg-gray-600 h-[300px] w-[350px] rounded-2xl absolute max-[383px]:w-full right-0 bottom-0'>
                        <img src="home1.jpg" alt="heroimg1" className='w-full h-full object-cover rounded-2xl' />
                    </div>
                </div>
            </main>
            <section className='max-w-screen-xl m-auto px-4 my-6 max-lg:mt-30 max-[374px]:pt-30'>
                <div>
                    <h2 className='font-bold text-4xl'>Curated Styles for Every Mood</h2>
                    <p className='mt-2 max-w-3xl'>Discover fashion that fits your vibe—bold, minimal, or effortlessly cool. Browse through our handpicked collection of trending apparel made for modern lifestyles.</p>
                </div>
                <div className='flex gap-3 flex-wrap'>
                    <button className='mt-4 btn-primary'>All</button>
                    <button className='mt-4 btn-outline'>T-Shirt</button>
                    <button className='mt-4 btn-outline'>Jackets</button>
                    <button className='mt-4 btn-outline'>Shirt</button>
                    <button className='mt-4 btn-outline'>Tops</button>
                    <button className='mt-4 btn-outline'>Pants</button>
                    <button className='mt-4 btn-outline'>Shoes</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
                    <ProductHome />
                    <ProductHome />
                    <ProductHome />
                    <ProductHome />
                    <ProductHome />
                    <ProductHome />
                </div>

                <div className='m-auto max-w-screen-3xl flex justify-center items-center'>
                    <Link to={'/products'} className='btn-outline'>Browse Store <i className='fas fa-arrow-up rotate-45'></i></Link>
                </div>
            </section>
        </>


    )
}

export default Home