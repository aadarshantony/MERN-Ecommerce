import ProductDetails from '../components/product/ProductDetails'
import FeaturedProducts from '../components/product/FeaturedProducts'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/productServices'
import LoadingScreen from '../components/LoadingScreen'
import InternalServerError from '../components/InternalServerError'
import sampleImg from '../assets/product.svg'

const Product = () => {
  const { id: productId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId
  })
  return (
    <div className='max-w-screen-xl min-h-screen m-auto mt-30'>

      {
        isLoading ? <LoadingScreen /> : isError ? <InternalServerError error={error} /> : (
          <>
            <section className='flex'>
              <aside className='m-4'>
                <div className=' w-[350px] h-[400px] rounded-md bg-gray-300'>
                  <img src={data.product.thumbnail || sampleImg} alt="Product image" className='h-full w-full object-cover rounded-md' />
                </div>
                <div className='flex gap-0.5 max-w-[350px] overflow-x-scroll'>
                  {
                    data.product.gallery?.map(url => (
                      <div className='h-[100px] w-[100px] bg-gray-500 mt-2'>
                        <img src={url || sampleImg} alt="Extra images" className='h-full w-full object-cover cursor-pointer'/>
                      </div>
                    ))
                  }
                </div>
                <button className=' bg-amber-300 w-full mt-4 h-10 rounded-md cursor-pointer hover:bg-amber-400'>Add to Cart <i className='fas fa-cart-shopping'></i></button>
              </aside>
              <ProductDetails product={data.product} />
            </section>

            {/*Featured products*/}
            <section className='p-4 mt-6'>
              <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
              <FeaturedProducts />
            </section>

            {/*Ratings and review section */}
            <section className="mx-auto p-4 py-10">
              <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
              <div className="md:flex gap-10">

                <div className="w-full md:w-1/2 space-y-2">
                  <div className="text-3xl font-bold text-yellow-500">★ 4.1</div>
                  <p className="text-sm text-gray-600">7,512 global ratings</p>


                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-16">5 star</span>
                      <div className="w-full h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-orange-400 rounded w-[58%]"></div>
                      </div>
                      <span>58%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-16">4 star</span>
                      <div className="w-full h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-orange-400 rounded w-[21%]"></div>
                      </div>
                      <span>21%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-16">3 star</span>
                      <div className="w-full h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-orange-400 rounded w-[8%]" ></div>
                      </div>
                      <span>8%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-16">2 star</span>
                      <div className="w-full h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-orange-400 rounded w-[3%]"></div>
                      </div>
                      <span>3%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-16">1 star</span>
                      <div className="w-full h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-orange-400 rounded w-[10%]"></div>
                      </div>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 mt-10 md:mt-0">
                  <h3 className="text-lg font-semibold mb-2">Submit Your Review</h3>
                  <form className="space-y-3">
                    <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" required />
                    <textarea placeholder="Write your review..." className="w-full p-2 border rounded h-24" required></textarea>
                    <select className="w-full p-2 border rounded" required>
                      <option value="">Rate the product</option>
                      <option>⭐☆☆☆☆</option>
                      <option>⭐⭐☆☆☆</option>
                      <option>⭐⭐⭐☆☆</option>
                      <option>⭐⭐⭐⭐☆</option>
                      <option>⭐⭐⭐⭐⭐</option>
                    </select>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Submit Review</button>
                  </form>
                </div>
              </div>
            </section>
          </>
        )
      }
    </div>
  )
}

export default Product