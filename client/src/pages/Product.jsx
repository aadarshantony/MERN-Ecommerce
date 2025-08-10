import ProductDetails from '../components/product/ProductDetails'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/productServices'
import LoadingScreen from '../components/LoadingScreen'
import InternalServerError from '../components/InternalServerError'
import sampleImg from '../assets/product.svg'
import ReviewForm from '../components/reviews/ReviewForm'
import ReviewBreakdown from '../components/reviews/ReviewBreakdown'
import ReviewDisplay from '../components/reviews/ReviewDisplay'
import { getReviews } from '../services/reviewServices'
import { addToCart } from '../services/cartServices'
import toast from 'react-hot-toast'
import SimilarProducts from '../components/product/SimilarProducts'

const Product = () => {
    const queryClient = useQueryClient();
    const { id: productId } = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId),
        enabled: !!productId
    })

    const { data: reviewData, isLoading: reviewIsLoading, isError: reviewIsError, error: reviewError } = useQuery({
        queryKey: ['reviews', productId],
        queryFn: () => getReviews(productId),
        enabled: !!productId,
    });


    const { mutate: updateCart } = useMutation({
        mutationFn: (id) => addToCart(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
            toast.success('Product added to cart!');
        },
        onError: (err) => {
            console.error("Couldn't add product to cart: ", err);
            toast.error(err?.message || 'Failed to add product to cart');
        },
    })

    return (
        <div className="max-w-screen-xl min-h-screen m-auto mt-32 px-4">

            {
                isLoading ? <LoadingScreen /> : isError ? <InternalServerError error={error} /> : (
                    <>
                        <section className="flex flex-col md:flex-row gap-6">
                            <aside className="flex-shrink-0 md:w-[350px] w-full">
                                <div className="w-full h-[400px] rounded-md bg-gray-300 overflow-hidden">
                                    <img
                                        src={data.product?.thumbnail || sampleImg}
                                        alt="Product image"
                                        className="h-full w-full object-cover rounded-md"
                                    />
                                </div>
                                {
                                    data.product?.gallery?.length > 0 && (
                                        <div className="flex gap-2 mt-2 max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                                            {
                                                data.product.gallery?.map((url, index) => (
                                                    <div key={index} className="h-[100px] w-[100px] bg-gray-500 rounded-md overflow-hidden flex-shrink-0 cursor-pointer">
                                                        <img
                                                            src={url || sampleImg}
                                                            alt="Extra images"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                <button
                                    onClick={() => updateCart(productId)}
                                    className="bg-amber-300 w-full mt-4 h-10 rounded-md cursor-pointer hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
                                >
                                    Add to Cart <i className="fas fa-cart-shopping"></i>
                                </button>
                            </aside>

                            <ProductDetails product={data.product} />
                        </section>

                        {/* Similar products */}
                        <section className="p-4 mt-8">
                            <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
                            <SimilarProducts
                                category={data.product?.category}
                                subCategory={data.product?.subCategory}
                                productId={data.product?._id}
                            />
                        </section>

                        {/* Ratings and review section */}
                        <section className="mx-auto p-4 py-10 max-w-screen">
                            <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                            {
                                reviewIsLoading ? (
                                    <LoadingScreen />
                                ) : reviewIsError ? (
                                    <InternalServerError error={reviewError} />
                                ) : (
                                    <>
                                        {reviewData?.reviews?.length > 0 ? (
                                            <>
                                                <div className="md:flex gap-10 flex-col md:flex-row">
                                                    <ReviewBreakdown reviews={reviewData.reviews} />
                                                    <ReviewForm productId={productId} />
                                                </div>
                                                <ReviewDisplay reviews={reviewData.reviews} productId={productId} />
                                            </>
                                        ) : (
                                            <div>
                                                <h2 className="text-gray-500 mb-4">No reviews yet! Be the first to review!</h2>
                                                <ReviewForm productId={productId} />
                                            </div>
                                        )}
                                    </>
                                )
                            }
                        </section>
                    </>
                )
            }
        </div>
    )
}

export default Product