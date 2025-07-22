import React from 'react'
import { useModal } from '../../context/ModalContext'
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal'
import UpdateProductModal from '../modals/UpdateProductModal'

const ProductTable = () => {
    const { openModal } = useModal()
    return (
        <section className="my-10 px-4 sm:px-6 lg:px-8">
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

                        <tr className="hover:bg-gray-50 transition">
                            {/* <!-- Product Name + ID --> */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">Nike Air Max</div>
                                <div className="text-xs text-gray-500">#64f8c298a9</div>
                            </td>

                            {/* <!-- Price + Stock --> */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div>₹6,999</div>
                                <div className="text-xs text-gray-500">Stock: 24 pcs</div>
                            </td>

                            {/* <!-- Category --> */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">Footwear</span>
                            </td>

                            {/* <!-- Actions --> */}
                            <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                                <button onClick={() => openModal('update')}
                                    className="px-3 py-1 text-xs bg-black text-white rounded hover:bg-gray-800">
                                    <i className='fas fa-pencil'></i>
                                </button>
                                <UpdateProductModal />
                                <button onClick={() => openModal('delete')}
                                    className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                                    <i className='fas fa-trash'></i>
                                </button>
                                <DeleteConfirmationModal title={'Delete'} body={'this product'}/>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default ProductTable