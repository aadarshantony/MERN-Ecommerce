import React from 'react'
import { useModal } from '../../context/ModalContext';

const DeleteConfirmationModal = ({ title, body }) => {
    const { modalType, closeModal } = useModal();

    if (modalType !== 'delete') return null;

    return (
        <div id="delete-modal" tabindex="-1" aria-hidden="true"
            class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto backdrop-brightness-50 backdrop-blur-sm">
            <div class="relative w-full max-w-md p-4">
                <div class="relative bg-white rounded-xl shadow-lg">
                    {/* <!-- Header --> */}
                    <div class="flex justify-between items-center p-5 border-b">
                        <h3 class="text-lg font-semibold text-gray-800">{title} Confirmation</h3>
                        <button type="button" onClick={closeModal}
                            class="text-gray-400 hover:text-gray-700 text-lg">✕</button>
                    </div>

                    {/* <!-- Body --> */}
                    <div class="p-6 space-y-4 text-left">
                        <p class="text-gray-700">Are you sure you want to {title} {body}?</p>
                        <p class="text-sm text-gray-500">This action cannot be undone.</p>

                        <div class="flex justify-end gap-3 pt-4 border-t">
                            <button onClick={closeModal}
                                class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                                Cancel
                            </button>
                            <form action="/api/products/:id" method="POST">
                                <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                    Confirm Delete
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