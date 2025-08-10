import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useModal } from '../../context/ModalContext';
import { editProduct, getProductById } from '../../services/productServices';
import LoadingScreen from '../LoadingScreen';
import InternalServerError from '../InternalServerError';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { uploadImageToCloudinary } from '../../services/imageUpload';
import LoadingSpinner from '../LoadingSpinner';
import toast from 'react-hot-toast';

const EditProductSchema = yup.object().shape({
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
});

const UpdateProductModal = ({ productId }) => {
    const queryClient = useQueryClient();
    const { closeModal } = useModal();

    const [isCoverUploading, setIsCoverUploading] = useState(false);
    const [isGalleryUploading, setIsGalleryUploading] = useState({ loading: false, idx: null });
    const [coverImage, setCoverImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId),
        enabled: !!productId
    });

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(EditProductSchema),
        defaultValues: {
            size: []
        }
    });

    useEffect(() => {
        if (data?.product) {
            reset({
                name: data.product.name,
                description: data.product.description,
                price: data.product.price,
                stock: data.product.stock,
                category: data.product.category || 'Mens Wear',
                subCategory: data.product.subCategory || 'Tops',
                size: data.product.size || [],
            });

            if (data.product.thumbnail) {
                setCoverImage({ url: data.product.thumbnail, changed: false });
            }
            if (data.product.gallery) {
                setGalleryImages(data.product.gallery.map(url => ({ url, changed: false })));
            }
        }
    }, [data, reset]);

    const handleCoverReplace = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setIsCoverUploading(true);
            const preview = await uploadImageToCloudinary(file);
            setCoverImage({ url: preview, changed: true });
        } catch (err) {
            console.error("Upload failed", err);
            toast.error("Cover image upload failed");
        } finally {
            setIsCoverUploading(false);
        }
    };

    const handleGalleryReplace = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setIsGalleryUploading({ loading: true, idx: index });
            const preview = await uploadImageToCloudinary(file);
            const updated = [...galleryImages];
            updated[index] = { url: preview, changed: true };
            setGalleryImages(updated);
        } catch (err) {
            console.error("Upload failed", err);
            toast.error("Gallery image upload failed");
        } finally {
            setIsGalleryUploading({ loading: false, idx: null });
        }
    };

    const handleAddGalleryImage = async (e) => {
        const file = e.target.files[0];
        if (!file || galleryImages.length >= 4) return;
        try {
            setIsGalleryUploading({ loading: true, idx: null });
            const preview = await uploadImageToCloudinary(file);
            setGalleryImages(prev => [...prev, { url: preview, changed: true }]);
        } catch (err) {
            console.error("Upload failed", err);
            toast.error("Gallery image upload failed");
        } finally {
            setIsGalleryUploading({ loading: false, idx: null });
        }
    };

    const { mutate: updateProduct } = useMutation({
        mutationFn: ({ id, data }) => editProduct(id, data),
        onMutate: () => setIsUpdating(true),
        onSuccess: () => {
            queryClient.invalidateQueries(['product', productId]);
            queryClient.invalidateQueries(['products']);
            closeModal();
            toast.success("Product updated successfully");
        },
        onError: (err) => {
            console.error("Product updation failed:", err);
            toast.error("Product updation failed");
        },
        onSettled: () => setIsUpdating(false)
    });

    const handleFormSubmit = (formData) => {
        if (!coverImage) {
            toast.error("Please upload a cover photo");
            return;
        }

        const dataToSubmit = {
            ...formData,
            thumbnail: coverImage.url,
            gallery: galleryImages.map(img => img.url),
        };

        console.log("Submitting form with data:", dataToSubmit);
        updateProduct({ id: productId, data: dataToSubmit });
    };

    const selectedSizes = watch('size');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50">
            <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg p-4 mx-4 md:mx-0">
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800">Edit Product</h3>
                    <button onClick={closeModal} className="text-gray-400 hover:text-red-600 text-lg rounded-lg">
                        ✕
                    </button>
                </div>

                {isLoading ? (
                    <LoadingScreen />
                ) : isError ? (
                    <InternalServerError error={error} />
                ) : (
                    <div className="p-6 overflow-y-auto max-h-[70vh]">
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                        <input
                                            {...register('name')}
                                            type="text"
                                            className="w-full border p-2.5 rounded-md"
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            {...register('description')}
                                            rows="3"
                                            className="w-full border p-2.5 rounded-md"
                                        />
                                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                            <input
                                                {...register('price')}
                                                type="number"
                                                className="w-full border p-2.5 rounded-md"
                                            />
                                            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                                            <input
                                                {...register('stock')}
                                                type="number"
                                                className="w-full border p-2.5 rounded-md"
                                            />
                                            {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <select
                                            {...register("category")}
                                            className="w-full border p-2.5 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black"
                                        >
                                            <option value="" disabled>Select category</option>
                                            <option value="Mens Wear">Mens Wear</option>
                                            <option value="Womens Wear">Womens Wear</option>
                                            <option value="Kids Wear">Kids Wear</option>
                                        </select>
                                        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mt-3">Sub Category</label>
                                        <select
                                            {...register("subCategory")}
                                            className="w-full border p-2.5 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black"
                                        >
                                            <option value="" disabled>Select sub category</option>
                                            <option value="Tops">Tops</option>
                                            <option value="Shirts">Shirts</option>
                                            <option value="Jackets">Jackets</option>
                                            <option value="Pants">Pants</option>
                                            <option value="Skirts">Skirts</option>
                                        </select>
                                        {errors.subCategory && <p className="text-sm text-red-500">{errors.subCategory.message}</p>}
                                    </div>

                                    {/* Sizes checkboxes */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">Sizes</label>
                                        <div className="flex gap-3 flex-wrap">
                                            {['XS', 'S', 'M', 'L', 'XL'].map(sz => (
                                                <label key={sz} className="inline-flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        value={sz}
                                                        {...register("size")}
                                                        checked={selectedSizes.includes(sz)}
                                                        readOnly
                                                        className="form-checkbox"
                                                    />
                                                    <span>{sz}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.size && <p className="text-sm text-red-500">{errors.size.message}</p>}
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                    <div className="relative w-full h-48 border rounded-md bg-gray-100 overflow-hidden group">
                                        {isCoverUploading ? (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <LoadingSpinner />
                                            </div>
                                        ) : (
                                            <img
                                                src={coverImage?.url}
                                                alt="Cover Preview"
                                                className="w-full h-full object-contain"
                                            />
                                        )}

                                        <div className="absolute inset-0 group-hover:bg-white group-hover:bg-opacity-60 flex items-center justify-center transition">
                                            <i className="fas fa-pen text-gray-700 text-xl opacity-0 group-hover:opacity-100"></i>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCoverReplace}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className='block text-sm font-medium text-gray-700 pb-2'>Gallery Images</h2>
                                <div className="flex flex-wrap gap-4">
                                    {galleryImages.map((img, index) => (
                                        <div key={index} className="relative group w-24 h-24">
                                            <div className="rounded shadow-lg border border-gray-200 w-full h-full overflow-hidden">
                                                {isGalleryUploading.idx === index && isGalleryUploading.loading ? (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                        <LoadingSpinner />
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={img?.url}
                                                        alt={`Gallery ${index}`}
                                                        className="w-full h-full object-cover rounded"
                                                    />
                                                )}
                                            </div>

                                            <div className="absolute inset-0 group-hover:bg-white group-hover:bg-opacity-60 flex items-center justify-center transition rounded">
                                                <i className="fas fa-pen text-gray-700 text-xl opacity-0 group-hover:opacity-100"></i>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => handleGalleryReplace(e, index)}
                                            />
                                        </div>
                                    ))}

                                    {galleryImages.length < 4 && (
                                        <label className="w-24 h-24 flex items-center justify-center border rounded cursor-pointer">
                                            {isGalleryUploading.loading ? (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                    <LoadingSpinner />
                                                </div>
                                            ) : (
                                                <i className="fas fa-plus text-xl text-gray-500" />
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleAddGalleryImage}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="text-right border-t border-t-gray-300 pt-4">
                                <button
                                    type="submit"
                                    className="bg-black text-white px-6 py-2.5 rounded-md hover:bg-gray-900"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? (
                                        <>
                                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                            </svg>
                                            Updating...
                                        </>
                                    ) : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateProductModal;