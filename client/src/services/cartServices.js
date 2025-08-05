import api from "../api";

export const getCartItems = async () => {
    try {
        const res = await api.get('/cart');
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}

export const addToCart = async (productId) => {
    try {
        const res = await api.post('/cart/add', { productId });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}

export const updateCartQty = async ({ productId, qty }) => {
    try {
        const res = await api.patch(`/cart/${productId}`, { qty });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}

export const deleteFromCart = async (productId) => {
    try {
        const res = await api.delete(`/cart/${productId}`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}