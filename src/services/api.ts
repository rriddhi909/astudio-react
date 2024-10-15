import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// Fetch users with pagination
export const fetchUsersData = (filterBy?: string) => {
  return api.get(`/users${filterBy}`);
};

// Fetch products with pagination
export const fetchProductsData = (filterBy?: string) => {
  return api.get(`/products${filterBy}`);
};
