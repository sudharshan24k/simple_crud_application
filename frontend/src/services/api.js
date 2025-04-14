import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  // Get all items
  getAllItems: async () => {
    try {
      console.log('Fetching all items...');
      const response = await apiClient.get('/items');
      console.log('Items fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
        throw error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw { message: 'No response from server' };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        throw { message: error.message };
      }
    }
  },

  // Get single item
  getItem: async (id) => {
    try {
      const response = await apiClient.get(`/items/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching item:', error);
      throw error.response?.data || { message: 'Error fetching item' };
    }
  },

  // Create item
  createItem: async (itemData) => {
    try {
      const response = await apiClient.post('/items', itemData);
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error.response?.data || { message: 'Error creating item' };
    }
  },

  // Update item
  updateItem: async (id, itemData) => {
    try {
      const response = await apiClient.put(`/items/${id}`, itemData);
      return response.data;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error.response?.data || { message: 'Error updating item' };
    }
  },

  // Delete item
  deleteItem: async (id) => {
    try {
      const response = await apiClient.delete(`/items/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error.response?.data || { message: 'Error deleting item' };
    }
  },

  // Test API connection
  testConnection: async () => {
    try {
      const response = await apiClient.get('/test');
      return response.data;
    } catch (error) {
      console.error('Error testing connection:', error);
      throw error.response?.data || { message: 'Error testing connection' };
    }
  }
};

export default api;
