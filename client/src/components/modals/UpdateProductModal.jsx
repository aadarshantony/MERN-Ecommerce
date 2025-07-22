import React from 'react'
import { useModal } from '../../context/ModalContext'

const UpdateProductModal = () => {
    const { modalType, closeModal } = useModal();
    if (modalType !== 'update') return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto backdrop-brightness-50 backdrop-blur-sm px-4 py-6"
            aria-hidden="true"
        >
            <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800">Edit Product</h3>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="text-gray-400 hover:text-red-600 text-lg rounded-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <form action="/api/products/:id" method="POST" className="space-y-6">
                        {/* Inputs + Cover Image */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="w-full border p-2.5 rounded-md"
                                        placeholder="Product Name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        rows="3"
                                        className="w-full border p-2.5 rounded-md"
                                    ></textarea>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            className="w-full border p-2.5 rounded-md"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            className="w-full border p-2.5 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        name="category"
                                        className="w-full border p-2.5 rounded-md bg-white"
                                    >
                                        <option>Footwear</option>
                                        <option>Clothing</option>
                                        <option>Accessories</option>
                                    </select>
                                </div>
                            </div>

                            {/* Right Column - Cover Image */}
                            <div className="space-y-4 flex flex-col">
                                <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                <div className="h-48 border rounded-md bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                                    Existing Cover
                                </div>
                                <input
                                    type="file"
                                    name="cover"
                                    className="w-full border rounded-md"
                                />
                            </div>
                        </div>

                        {/* Gallery */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Update Gallery</label>
                            <input
                                type="file"
                                name="images"
                                multiple
                                className="w-full border p-2.5 rounded-md"
                            />
                        </div>
 */}
                        {/* Submit Button */}
                        <div className="text-right border-t border-t-gray-300 pt-4">
                            <button
                                type="submit"
                                className="bg-black text-white px-6 py-2.5 rounded-md hover:bg-gray-900"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProductModal
