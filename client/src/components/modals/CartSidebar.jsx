import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useModal } from '../../context/ModalContext';
import { deleteFromCart, getCartItems, updateCartQty } from '../../services/cartServices';
import LoadingSpinner from '../LoadingSpinner';
import InternalServerError from '../InternalServerError';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { submitOrder } from '../../services/orderServices';

const CartSidebar = () => {
    const queryClient = useQueryClient();
    const { toggleCart, isCartOpen } = useModal();

    const [quantities, setQuantities] = useState({});

    const { data, isLoading, isError, error, } = useQuery({
        queryKey: ['cart'],
        queryFn: getCartItems,
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });

    const { mutate: updateQuantity } = useMutation({
        mutationFn: updateCartQty,
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        },
        onError: (err) => {
            toast.error(err?.message || 'Failed to update quantity');
        }
    });

    const { mutate: placeOrder, isLoading: isSubmitting } = useMutation({
        mutationFn: submitOrder,
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
            toast.success('Order placed successfully!');
            toggleCart();
        },
        onError: (err) => {
            toast.error(err?.message || 'Failed to place order');
        }
    });

    useEffect(() => {
        if (data?.cart?.items) {
            const initial = {};
            data.cart.items.forEach(item => {
                initial[item.product._id] = item.quantity;
            });
            setQuantities(initial);
        }
    }, [data]);

    const cartDeleteHandler = async (productId) => {
        try {
            await deleteFromCart(productId);
            await queryClient.invalidateQueries(['cart']);
            toast.success('Product removed from cart');
        } catch (err) {
            console.log("Error removing product from cart: ", err);
            toast.error(err?.message);
        }
    };

    const incrementQty = (productId) => {
        const item = cartItems.find(item => item.product._id === productId);
        const currentQty = quantities[productId] || item.quantity;
        const maxStock = item.product.stock;

        if (currentQty < maxStock) {
            const newQty = currentQty + 1;
            setQuantities(prev => ({ ...prev, [productId]: newQty }));
            updateQuantity({ productId, qty: newQty });
        } else {
            toast.error(`Only ${maxStock} in stock`);
        }
    };


    const decrementQty = (productId) => {
        const item = cartItems.find(item => item.product._id === productId);
        const currentQty = quantities[productId] || item.quantity;

        if (currentQty > 1) {
            const newQty = currentQty - 1;
            setQuantities(prev => ({ ...prev, [productId]: newQty }));
            updateQuantity({ productId, qty: newQty });
        }
    };


    if (!isCartOpen) return null;

    const cartItems = data?.cart.items || [];

    const totalPrice = cartItems.reduce((acc, item) => {
        const qty = quantities[item.product._id] || item.quantity;
        return acc + item.product.price * qty;
    }, 0);

    return (
        <div id="cart-sidebar-modal" tabIndex="-1" aria-hidden="true"
            className="fixed inset-0 z-200 overflow-y-auto overflow-x-hidden backdrop-brightness-50">
            <div className="relative w-full p-4">
                <div className="absolute bg-white shadow-lg h-screen w-96 top-0 right-0">

                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800">Your Cart</h3>
                        <button
                            type="button"
                            className="text-gray-400 cursor-pointer border border-gray-300 hover:text-red-600 hover:border-red-300 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
                            onClick={toggleCart}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="p-3 flex flex-col justify-between h-[calc(100%-80px)]">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <LoadingSpinner />
                            </div>
                        ) : isError ? (
                            <InternalServerError error={error} />
                        ) : cartItems.length === 0 ? (
                            <div className="flex justify-center items-center h-full text-gray-600 text-sm">
                                Nothing in your cart. Start adding some products!
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-1">
                                    {cartItems.map(item => {
                                        const productId = item.product._id;
                                        const quantity = quantities[productId] || item.quantity;

                                        return (
                                            <div key={productId} className="flex items-center justify-between border border-gray-200 rounded-lg shadow-lg p-2">
                                                <img
                                                    src={item.product.thumbnail}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />

                                                <div className="flex-1 px-4">
                                                    <p className="font-medium text-gray-700 mb-2">{item.product.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => decrementQty(productId)} className="px-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">-</button>
                                                        <span className="text-sm font-medium">{quantity}</span>
                                                        <button onClick={() => incrementQty(productId)} className="px-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">+</button>
                                                        <i onClick={() => cartDeleteHandler(productId)} className="fas fa-trash text-red-500 ml-1 p-1 rounded text-sm cursor-pointer hover:border hover:border-red-400"></i>
                                                    </div>
                                                </div>

                                                <p className="text-gray-800 font-semibold">₹{item.product.price}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Footer */}
                                <div className="mt-6 border-t pt-4 w-full p-3">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-lg font-semibold text-gray-700">Total</p>
                                        <p className="text-lg font-bold text-gray-900">₹{totalPrice}</p>
                                    </div>
                                    <button
                                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                                        onClick={() => placeOrder()}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Placing Order...' : 'Proceed to Checkout'}
                                    </button>

                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartSidebar;
