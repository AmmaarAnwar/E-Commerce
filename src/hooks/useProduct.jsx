// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { fetchAllProducts } from '../services/productService';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        fetchAllProducts()
            .then(data => mounted && setProducts(data))
            .catch(err => mounted && setError(err))
            .finally(() => mounted && setLoading(false));
        return () => { mounted = false; };
    }, []);

    return { products, loading, error };
};
