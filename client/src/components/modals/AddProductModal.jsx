import { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addProduct } from '../../services/productServices';
import toast from 'react-hot-toast';
import { uploadImageToCloudinary } from '../../services/imageUpload';
import { useQueryClient } from '@tanstack/react-query';

const productSchema = yup.object().shape({
    name: yup
        .string()
        .required('Product name is required')
        .min(3, 'Product name must be at least 3 characters'),

    description: yup
        .string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),

    price: yup
        .number()
        .typeError('Price must be a number')
        .required('Price is required')
        .positive('Price must be greater than zero'),

    stock: yup
        .number()
        .typeError('Stock must be a number')
        .required('Stock is required')
        .min(0, 'Stock cannot be negative'),

    category: yup
        .string()
        .required('Category is required')
        .oneOf(['Mens Wear', 'Womens Wear', 'Kids Wear'], 'Invalid category'),

    subCategory: yup
        .string()
        .required('Sub Category is required')
        .oneOf(['Tops', 'Shirts', 'Jackets', 'Pants', 'Skirts'], 'Invalid sub category'),

    size: yup
        .array()
        .of(yup.string().oneOf(['XS', 'S', 'M', 'L', 'XL']))
        .min(1, 'At least one size must be selected')
        .required('Sizes are required'),


    thumbnail: yup
        .mixed()
        .test('required', 'Thumbnail image is required', (value) => {
            return value && value.length > 0;
        }),

    gallery: yup
        .mixed()
        .test('required', 'At least one gallery image is required', (value) => {
            return value && value.length > 0;
        })
        .test('max-files', 'You can upload up to 4 images only', (value) => {
            if (!value) return true;
            return value.length <= 4;
        }),
});

const AddProductModal = () => {
    const { closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState('https://images.unsplash.com/photo-1606813902917-4aa3d3d3b1fa?w=500');

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(productSchema) });

    const queryClient = useQueryClient();

    const onProductSubmit = async (data) => {
        try {
            setIsLoading(true);

            const thumbnailUrl = await uploadImageToCloudinary(data.thumbnail[0]);
            const galleryImgUrls = await Promise.all(
                Array.from(data.gallery).map(file => uploadImageToCloudinary(file))
            );

            const productData = {
                ...data,
                thumbnail: thumbnailUrl,
                gallery: galleryImgUrls
            };

            await addProduct(productData);
            queryClient.invalidateQueries(['products']);
            setIsLoading(false);
            closeModal();
            toast.success("Product added to your shop");
        } catch (err) {
            setIsLoading(false);
            toast.error("Error occurred while creating a new product. Please try again later.");
            console.error("Product Creation failed:", err);
        }
    };

    const getCoverImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div id="add-product-modal" tabIndex="-1" aria-hidden="true"
            className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center px-4 py-6 backdrop-brightness-50 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl ">
                <div className="relative bg-white rounded-xl shadow-lg">
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

                    <div className="p-6">
                        <form onSubmit={handleSubmit(onProductSubmit)} encType="multipart/form-data" className="space-y-6">

                            {/* Two-column: Inputs + Cover image */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Inputs */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name</label>
                                        <input {...register('name')} type="text" placeholder="Product name"
                                            className="w-full border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea {...register('description')} rows="3" placeholder="Short product details"
                                            className="w-full border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-black"></textarea>
                                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                            <input {...register('price')} type="number"
                                                className="w-full border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
                                            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                                            <input {...register('stock')} type="number"
                                                className="w-full border p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-black" />
                                            {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <select {...register("category")}
                                            className="w-full border p-2.5 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black">
                                            <option value="">Select category</option>
                                            <option value="Mens Wear">Mens Wear</option>
                                            <option value="Womens Wear">Womens Wear</option>
                                            <option value="Kids Wear">Kids Wear</option>
                                        </select>
                                        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Sub Category</label>
                                        <select {...register("subCategory")}
                                            className="w-full border p-2.5 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black">
                                            <option value="">Select sub category</option>
                                            <option value="Tops">Tops</option>
                                            <option value="Shirts">Shirts</option>
                                            <option value="Jackets">Jackets</option>
                                            <option value="Pants">Pants</option>
                                            <option value="Skirts">Skirts</option>
                                        </select>
                                        {errors.subCategory && <p className="text-sm text-red-500">{errors.subCategory.message}</p>}
                                    </div>
                                </div>

                                {/* Cover image upload */}
                                <div className="flex flex-col items-center gap-4">
                                    <div
                                        className="w-full h-68 border rounded-md bg-gray-100 flex justify-center items-center text-sm text-gray-400">
                                        <img src={imgUrl} alt="cover_image" className='h-full w-full object-contain' />
                                    </div>
                                    <input {...register('thumbnail')} type="file" accept="image/*" className="w-full border rounded-md text-sm" onChange={(e) => getCoverImg(e)} />
                                    <p className="text-xs text-gray-500">Upload main cover image</p>
                                    {errors.thumbnail && <p className="text-sm text-red-500">{errors.thumbnail.message}</p>}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Sizes</label>
                                        <div className="flex gap-3">
                                            {['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
                                                <label key={sz} className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        value={sz}
                                                        {...register('size', {
                                                            setValueAs: (v) => (v === false ? [] : v)
                                                        })}
                                                        className="form-checkbox"
                                                    />
                                                    <span className="ml-2">{sz}</span>
                                                </label>
                                            ))}

                                        </div>
                                        {errors.size && <p className="text-sm text-red-500">{errors.size.message}</p>}
                                    </div>


                                </div>



                            </div>

                            {/* Gallery Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gallery Images</label>
                                <input {...register('gallery')} type="file" multiple accept="image/*" className="w-full border rounded-md" />
                                <p className="text-xs text-gray-500 mt-1">Upload 2–4 additional images</p>
                                {errors.gallery && <p className="text-sm text-red-500">{errors.gallery.message}</p>}
                            </div>

                            {/* Submit */}
                            <div className="text-right">
                                <button type="submit" className={`cursor-pointer text-white px-6 py-2.5 rounded-md ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-900'}`} disabled={isLoading} >
                                    {isLoading ? (
                                        <>
                                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                            Adding...
                                        </>
                                    ) : (
                                        'Add Product'
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductModal;