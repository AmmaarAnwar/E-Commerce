// src/pages/ProductsPage.jsx
import React, { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProduct';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
    const { products, loading, error } = useProducts();

    // 1️⃣ Filter state
    const [filters, setFilters] = useState({
        category: 'All',
        minRating: 0,
        price: 'All'
    });

    // 2️⃣ Derive category list from data
    const categories = useMemo(() => {
        const cats = new Set(products.map(p => p.category));
        return ['All', ...cats];
    }, [products]);

    // 3️⃣ Price ranges
    const priceOptions = [
        { label: 'All', value: 'All' },
        { label: '≤ $50', value: '0-50' },
        { label: '$50–$100', value: '50-100' },
        { label: '$100–$500', value: '100-500' },
        { label: '> $500', value: '500+' }
    ];

    // 4️⃣ Filter logic
    const filtered = useMemo(() => {
        return products.filter(p => {
            // category filter
            if (filters.category !== 'All' && p.category !== filters.category)
                return false;

            // rating filter
            if (p.rating.rate < filters.minRating) return false;

            // price filter
            if (filters.price !== 'All') {
                const price = p.price;
                const [low, high] = filters.price.split('-');
                if (high === '+') {
                    if (price <= Number(low)) return false;
                } else {
                    if (price < Number(low) || price > Number(high)) return false;
                }
            }

            return true;
        });
    }, [products, filters]);

    if (loading) return <p className="p-8">Loading...</p>;
    if (error) return <p className="p-8">Error loading products</p>;

    return (
        <div className="flex">
            <FilterSidebar
                categories={categories}
                priceOptions={priceOptions}
                filters={filters}
                onChange={setFilters}
            />

            <main className="flex-1 p-4">
                {filtered.length === 0
                    ? <p>No products match your filters.</p>
                    : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filtered.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                }
            </main>
        </div>
    );
}
