import React, { useState } from 'react'
import { useModal } from '../../context/ModalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteProduct } from '../../services/productServices';

const DeleteConfirmationModal = ({ title, body, productId }) => {
    const { closeModal } = useModal();
    const [isDeleting, setIsDeleting] = useState(false);
    const queryClient = useQueryClient()

    const { mutate: deleteMutation } = useMutation({
        mutationFn: (id) => deleteProduct(id),
        onMutate: () => setIsDeleting(true),
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            toast.success('Product deleted successfully');
        },
        onError: (err) => {
            console.error('Product deletion failed:', err);
            toast.error('Failed to delete product');
        },
        onSettled: () => setIsDeleting(false)
    })

    const handleDeletion = (e) => {
        e.preventDefault();
        deleteMutation(productId)
        closeModal()
    }

    return (
        <div id="delete-modal" tabindex="-1" aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto backdrop-brightness-50 backdrop-blur-sm">
            <div className="relative w-full max-w-md p-4">
                <div className="relative bg-white rounded-xl shadow-lg">
                    {/* <!-- Header --> */}
                    <div className="flex justify-between items-center p-5 border-b">
                        <h3 className="text-lg font-semibold text-gray-800">{title} Confirmation</h3>
                        <button type="button" onClick={closeModal}
                            className="text-gray-400 hover:text-gray-700 text-lg">✕</button>
                    </div>

                    {/* <!-- Body --> */}
                    <div className="p-6 space-y-4 text-left">
                        <p className="text-gray-700">Are you sure you want to {title} {body}?</p>
                        <p className="text-sm text-gray-500">This action cannot be undone.</p>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                                Cancel
                            </button>
                            <form onSubmit={(e) => handleDeletion(e)}>
                                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" disabled={isDeleting}>
                                    {isDeleting ? <LoadingSpinner /> : 'Delete Product'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal