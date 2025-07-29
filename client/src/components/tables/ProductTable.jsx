import { useModal } from '../../context/ModalContext'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../services/productServices'
import LoadingScreen from '../LoadingScreen'
import InternalServerError from '../InternalServerError'

const ProductTable = () => {
    const { openModal } = useModal();
    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    });

    return (
        <section className="my-10 px-4 sm:px-6 lg:px-8">
            {isLoading ? <LoadingScreen /> : isError ? <InternalServerError error={error} /> : (
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-500 border-b border-b-gray-400">
                            <tr>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Price / Stock</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                products.map(product => (
                                    <tr key={product._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{product.name}</div>
                                            <div className="text-xs text-gray-500">{product._id}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>${product.price}</div>
                                            <div className="text-xs text-gray-500">Stock: {product.stock}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">{product.category}</span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                                            <button
                                                onClick={() => openModal('update', product._id)}
                                                className="px-3 py-1 text-xs bg-black text-white rounded hover:bg-gray-800"
                                            >
                                                <i className='fas fa-pencil'></i>
                                            </button>

                                            <button
                                                onClick={() => openModal('delete', product._id)}
                                                className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                <i className='fas fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    )
}

export default ProductTable