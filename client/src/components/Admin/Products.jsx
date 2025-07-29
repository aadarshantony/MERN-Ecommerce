import ProductTable from '../tables/ProductTable';
import AddProductModal from '../modals/AddProductModal';
import UpdateProductModal from '../modals/UpdateProductModal';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import { useModal } from '../../context/ModalContext';

const Products = () => {
    const { openModal, modalConfig } = useModal();

    return (
        <div className='ml-2 bg-white border border-gray-200 shadow-md w-full rounded-md'>
            <div className='m-8 flex justify-between items-center'>
                <div>
                    <h2 className='text-2xl font-bold'>Products Overview</h2>
                    <p>Here, you can see an overview of all the available products</p>
                </div>
                <button
                    onClick={() => openModal('add')}
                    className="px-5 py-2.5 cursor-pointer text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-md"
                >
                    Add Product <i className='fas fa-plus'></i>
                </button>
            </div>

            <ProductTable />

            {/* Conditionally Render Modals */}
            {modalConfig.modalName === 'add' && <AddProductModal />}
            {modalConfig.modalName === 'update' && (
                <UpdateProductModal productId={modalConfig.productId} />
            )}
            {modalConfig.modalName === 'delete' && (
                <DeleteConfirmationModal
                    title="Delete"
                    body="this product"
                    productId={modalConfig.productId}
                />
            )}
        </div>
    );
};

export default Products;
