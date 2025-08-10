import api from "../api";

export const submitOrder = async (orderData) => {
    try {
        const res = await api.post('/orders/submit', orderData);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}

export const getOrders = async () => {
    try {
        const res = await api.get('/orders');
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}

export const getMyOrders = async () => {
    try {
        const res = await api.get('/orders/my-orders');
        return res.data;
    } catch (err) {
        console.error("Error fetching my orders:", err);
        throw err.response?.data || err;
    }
};


export const updateOrderStatus = async (orderId, status) => {
    try {
        const res = await api.put(`/orders/${orderId}`, { status });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}
