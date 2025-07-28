import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fakestoreapi.com/products',
    timeout: 5000,
});

export const fetchAllProducts = () =>
    api.get('/')
        .then(res => res.data);

export const fetchProductById = (id) =>
    api.get(`/${id}`)
        .then(res => res.data);
