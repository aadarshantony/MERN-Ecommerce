import { useState } from 'react'
import { useModal } from '../../context/ModalContext';
const AddProductModal = () => {

    const { modalType, closeModal } = useModal();
    const [imgUrl, setImgUrl] = useState('https://images.unsplash.com/photo-1606813902917-4aa3d3d3b1fa?w=500');

    const getCoverImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgUrl(URL.createObjectURL(file));
        }
    }

    if (modalType !== 'add') return null;

    return (
        <div id="add-product-modal" tabIndex="-1" aria-hidden="true"
            className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center backdrop-brightness-50 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl p-4">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-xl shadow-lg">

                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-5 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800">Add New Product</h3>
                        <button
                            type="button"
                            className="text-gray-400 cursor-pointer border border-gray-300 hover:text-red-600 hover:border-red-300 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
                            onClick={closeModal}
                        >
                            ✕
                        </button>

                    </div>

                    {/* <!-- Modal body --> */}
                    <div className="p-6">
                        <form action="/api/products" method="POST" encType="multipart/form-data" className="space-y-6">

                            {/* <!-- Two-column: Inputs + Cover image --> */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* <!-- Inputs --> */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input name="name" type="text" placeholder="Product name"
                                            className="w-full border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea name="description" rows="3" placeholder="Short product details"
                                            className="w-full border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-black"></textarea>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                            <input type="number" name="price"
                                                className="w-full border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                                            <input type="number" name="stock"
                                                className="w-full border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <select name="category"
                                            className="w-full border p-2.5 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black">
                                            <option value="">Select category</option>
                                            <option value="Clothing">Clothing</option>
                                            <option value="Footwear">Footwear</option>
                                            <option value="Accessories">Accessories</option>
                                        </select>
                                    </div>
                                </div>

                                {/* <!-- Cover image upload --> */}
                                <div className="flex flex-col items-center gap-4">
                                    <div
                                        className="w-full h-68 border rounded-md bg-gray-100 flex justify-center items-center text-sm text-gray-400">
                                        <img src={imgUrl} alt="cover_image" className='h-full w-full object-contain' />
                                    </div>
                                    <input type="file" name="images" accept="image/*" className="w-full border rounded-md text-sm" onChange={(e) => getCoverImg(e)} />
                                    <p className="text-xs text-gray-500">Upload main cover image</p>
                                </div>
                            </div>

                            {/* <!-- Gallery Upload --> */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
                                <input type="file" name="images" multiple accept="image/*" className="w-full border rounded-md" />
                                <p className="text-xs text-gray-500 mt-1">Upload 3–5 additional images</p>
                            </div>

                            {/* Submit */}
                            <div className="text-right">
                                <button type="submit" className="cursor-pointer bg-black text-white px-6 py-2.5 rounded-md hover:bg-gray-900">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProductModal