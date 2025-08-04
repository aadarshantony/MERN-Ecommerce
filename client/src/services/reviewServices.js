import api from "../api";

export const getReviews = async (productId) => {
    try {
        const res = await api.get(`/products/${productId}/reviews`)
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}

export const createReview = async (productId, reviewData) => {
    try {
        const res = await api.post(`/products/${productId}/reviews`, reviewData)
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}


export const deleteReview = async (productId, reviewId) => {
    try {
        const res = await api.delete(`/products/${productId}/reviews/${reviewId}`,)
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}