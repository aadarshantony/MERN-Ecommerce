import { Link } from "react-router-dom"
import dummyImg from '../../assets/product.svg'

const ProductCard = ({ productId, name, category, image , price }) => {
    return (
        <Link to={`/products/${productId}`} className="border-1 border-gray-200  rounded-md bg-white shadow-sm p-4 hover:shadow-md transition cursor-pointer">
            <img src={image || dummyImg} alt="Product" className="rounded w-full h-60 object-cover" />
            <h3 className="mt-4 font-semibold text-lg">{name}</h3>
            <p className="text-sm text-gray-500 mb-2">{category}</p>
            <div className="flex items-center justify-between">
                <span className="text-yellow-500 font-bold">₹{price}</span>
            </div>
        </Link>
    )
}

export default ProductCard