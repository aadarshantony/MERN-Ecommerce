import { Link } from "react-router-dom"

const ProductCard = () => {
    return (
        <Link to={'/products/id'} className="border-1 border-gray-200  rounded-md bg-white shadow-sm p-4 hover:shadow-md transition cursor-pointer">
            <img src="https://i.imgur.com/0DElr0H.jpg" alt="Product" className="rounded w-full h-60 object-cover" />
            <h3 className="mt-4 font-semibold text-lg">Lady Top</h3>
            <p className="text-sm text-gray-500 mb-2">Women's Wear</p>
            <div className="flex items-center justify-between">
                <span className="text-yellow-500 font-bold">$49.99</span>
                <span className="text-xs text-gray-400">⭐ 4.5</span>
            </div>
        </Link>
    )
}

export default ProductCard