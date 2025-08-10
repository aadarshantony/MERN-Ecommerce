import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../components/LoadingScreen";
import InternalServerError from "../components/InternalServerError";
import { getMyOrders } from "../services/orderServices";

const MyOrders = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["my-orders"],
        queryFn: getMyOrders,
        refetchOnWindowFocus: true,
    });

    if (isLoading) return <LoadingScreen />;
    if (isError) return <InternalServerError error={error} />;

    const orders = data?.orders || [];

    if (orders.length === 0) {
        return (
            <div className="max-w-screen-xl min-h-screen m-auto mt-30 p-6 flex items-center justify-center">
                <p className="text-gray-600 text-lg">You haven’t placed any orders yet.</p>
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl min-h-screen m-auto mt-30 p-6">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>

            <div className="space-y-8">
                {orders.map(order => {
                    const orderTotal = order.items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                    );

                    return (
                        <section
                            key={order._id}
                            className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white"
                        >
                            <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID</p>
                                    <p className="font-mono text-gray-800">{order._id}</p>
                                </div>
                                <div className="mt-3 sm:mt-0">
                                    <span className="text-sm text-gray-500">Status:</span>{" "}
                                    <span
                                        className={`font-semibold capitalize px-3 py-1 rounded ${order.status === "delivered"
                                                ? "bg-green-100 text-green-700"
                                                : order.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </header>

                            <div className="space-y-4 mb-4">
                                {order.items.map(item => (
                                    <div
                                        key={item.productId}
                                        className="flex justify-between border-b border-gray-200 pb-3"
                                    >
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity} × ₹{item.price}
                                            </p>
                                        </div>
                                        <p className="font-semibold">
                                            ₹{item.quantity * item.price}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <footer className="flex justify-between font-semibold text-gray-800 text-lg">
                                <span>Total:</span>
                                <span>₹{orderTotal}</span>
                            </footer>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default MyOrders;
