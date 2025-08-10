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

export const getFilteredProducts = async (filters) => {
    try {
        const params = new URLSearchParams();

        if (filters.category) {
            const categories = Array.isArray(filters.category) 
                ? filters.category 
                : [filters.category];
            params.append("category", categories.join(","));
        }

        if (filters.subCategory) {
            const subCategories = Array.isArray(filters.subCategory) 
                ? filters.subCategory 
                : [filters.subCategory];
            params.append("subCategory", subCategories.join(","));
        }

        if (filters.size) {
            const sizes = Array.isArray(filters.size) 
                ? filters.size 
                : [filters.size];
            params.append("size", sizes.join(","));
        }

        if (filters.priceMin != null && filters.priceMin !== "") {
            params.append("priceMin", filters.priceMin);
        }
        if (filters.priceMax != null && filters.priceMax !== "") {
            params.append("priceMax", filters.priceMax);
        }

        const res = await api.get(`/products/filter?${params.toString()}`);
        console.log("Filter response: ", res);
        return res.data.products;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
};



export const editProduct = async (id, data) => {
    try {
        const res = await api.patch(`/products/${id}`, data);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await api.delete(`/products/${id}`)
        return res.data;
    } catch (err) {
        console.error(err);
        throw err.response?.data || err;
    }
}