import api from "../api";

export const getProducts = async () => {
    try {
        const res = await api.get('/products');
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}

export const addProduct = async (data) => {
    try {
        const res = await api.post('/products', data);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}

export const getProductById = async (id) => {
    try {
        const res = await api.get(`/products/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}

export const editProduct = async (id, data) => {
    try {
        const res = await api.patch(`/products/${id}`, data);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}

export const deleteProduct = async(id) => {
    try {
        const res = await api.delete(`/products/${id}`)
        return res.data;
    } catch(err) {
        console.error(err);
        throw err.response?.data || err;
    }
}