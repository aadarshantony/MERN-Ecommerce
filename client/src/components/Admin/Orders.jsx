import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import StatusCard from "./StatusCard";
import { getOrders, updateOrderStatus } from "../../services/orderServices";
import LoadingScreen from "../LoadingScreen";
import InternalServerError from "../InternalServerError";

const Orders = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });

    const mutation = useMutation({
        mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
        },
    });

    const handleStatusChange = (orderId, newStatus) => {
        mutation.mutate({ orderId, status: newStatus });
    };

    const orders = data?.orders || [];

    return (
        <div className="m-3">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Product Orders</h2>
                    <p>Here, you can see and update the orders and their status</p>
                </div>
            </div>

            <StatusCard orders={orders}/>

            {isLoading ? (
                <LoadingScreen />
            ) : isError ? (
                <InternalServerError error={error} />
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="mt-16 space-y-6">
                    {orders.map(order => {
                        // Calculate total price for the order
                        const orderTotal = order.items.reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                        );

                        return (
                            <div
                                key={order._id}
                                className="bg-white w-screen-xl shadow-md border border-gray-200 p-4 rounded-md"
                            >
                                <div className="flex justify-between items-center mb-4 flex-wrap">
                                    <div>
                                        <h3 className="font-semibold text-lg">Order ID: <span className="text-gray-400">{order._id}</span></h3>
                                        <p className="text-gray-600 text-sm">Status: <span className="capitalize">{order.status}</span></p>
                                    </div>
                                    <div>
                                        <select
                                            name="status"
                                            id={`orderstatus-${order._id}`}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="border border-gray-300 rounded py-1 mt-3"
                                        >
                                            <option value="placed">Order Placed</option>
                                            <option value="confirmed">Order Confirmed</option>
                                            <option value="dispatched">Dispatched</option>
                                            <option value="out-for-delivery">Out for Delivery</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {order.items.map(item => (
                                        <div
                                            key={item.productId}
                                            className="flex justify-between border-b border-gray-200 pb-2"
                                        >
                                            <div>
                                                <h4 className="font-medium">{item.name}</h4>
                                                <p className="text-sm text-gray-600">
                                                    Quantity: {item.quantity}, Price: ₹{item.price}
                                                </p>
                                            </div>
                                            <p className="font-semibold">₹{item.quantity * item.price}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Order total */}
                                <div className="mt-4 flex justify-end text-lg font-semibold text-gray-800">
                                    Total: ₹{orderTotal}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Orders;
