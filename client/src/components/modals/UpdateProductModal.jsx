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
        .required('Category is required'),
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

    useEffect(() => {
        if (data?.product) {
            if (data.product.thumbnail) {
                setCoverImage({ url: data.product.thumbnail, changed: false });
            }
            if (data.product.gallery) {
                setGalleryImages(data.product.gallery.map(url => ({ url, changed: false })));
            }
        }
    }, [data]);



    const handleCoverReplace = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setIsCoverUploading(true)
            const preview = await uploadImageToCloudinary(file)
            setCoverImage({ url: preview, changed: true });
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setIsCoverUploading(false)
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
        } finally {
            setIsGalleryUploading({ loading: false, idx: null });
        }
    };

    const handleAddGalleryImage = async (e) => {
        const file = e.target.files[0];
        if (!file || galleryImages.length >= 4) return;
        try {
            setIsGalleryUploading({ loading: true, idx: null });
            const preview = await uploadImageToCloudinary(file)
            setGalleryImages(prev => [...prev, { url: preview, changed: true }]);
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setIsGalleryUploading({ loading: false, idx: null });
        }
    };

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(EditProductSchema) })


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
    })

    const handleFormSubmit = (data) => {
        if (!coverImage) {
            return toast.error("Please upload a cover photo");
        }
        const formData = {
            ...data,
            thumbnail: coverImage.url,
            gallery: galleryImages.map(img => img.url)
        }

        updateProduct({ id: productId, data: formData })

    }

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
                                        <input {...register('name')} name="name" type="text" className="w-full border p-2.5 rounded-md" defaultValue={data.product.name} />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea {...register('description')} name="description" rows="3" className="w-full border p-2.5 rounded-md" defaultValue={data.product.description}></textarea>
                                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                            <input {...register('price')} type="number" name="price" className="w-full border p-2.5 rounded-md" defaultValue={data.product.price} />
                                            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                                            <input {...register('stock')} type="number" name="stock" className="w-full border p-2.5 rounded-md" defaultValue={data.product.stock} />
                                            {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <select {...register('category')} name="category" className="w-full border p-2.5 rounded-md bg-white" defaultValue={data.product.category}>
                                            <option>Footwear</option>
                                            <option>Clothing</option>
                                            <option>Accessories</option>
                                        </select>
                                        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
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
                                            name="cover"
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
                                    className="bg-black text-white px-6 py-2.5 rounded-md hover:bg-gray-900" disabled={isUpdating}
                                >
                                    {isUpdating ? (
                                        <>
                                            <LoadingSpinner />
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
