import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';
const BACKEND_URL = 'http://127.0.0.1:5001'; // Replace with your Flask backend URL

// Fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

// Add an item to the cart
export const addToCart = async (product) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/cart/add`, product);
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

// Fetch cart items
export const fetchCart = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/cart`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};
export const updateCartItem = async (itemId, newQuantity) => {
    console.log(`Sending request to update item ${itemId} to quantity ${newQuantity}`);
    try {
      const response = await fetch(`${BACKEND_URL}/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
  
      console.log('Response received:', response.status, response.statusText);
      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  export const removeFromCart = async (itemId) => {
    await axios.delete(`${BACKEND_URL}/cart/${itemId}`);
};