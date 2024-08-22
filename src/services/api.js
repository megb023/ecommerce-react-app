import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

// Fetch all products

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fethcing products:', error);
        throw error;
    }
};

// Fetch a single product by ID

export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`);
        return response.data;
    }   catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};