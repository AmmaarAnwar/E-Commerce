// src/components/FilterSidebar/FilterSidebar.jsx
import React from 'react';

export default function FilterSidebar({
    categories,
    priceOptions,
    filters,
    onChange
}) {
    const { category, minRating, price } = filters;

    return (
        <aside className="w-64 p-4 space-y-6 border-r">
            {/* Category */}
            <section>
                <h3 className="font-semibold mb-2">Category</h3>
                {categories.map(cat => (
                    <label key={cat} className="flex items-center space-x-2 mb-1">
                        <input
                            type="radio"
                            name="category"
                            value={cat}
                            checked={category === cat}
                            onChange={() => onChange(f => ({ ...f, category: cat }))}
                        />
                        <span>{cat}</span>
                    </label>
                ))}
            </section>

            {/* Rating */}
            <section>
                <h3 className="font-semibold mb-2">Min Rating</h3>
                {[0, 1, 2, 3, 4].map(r => (
                    <label key={r} className="flex items-center space-x-2 mb-1">
                        <input
                            type="radio"
                            name="rating"
                            value={r}
                            checked={minRating === r}
                            onChange={() => onChange(f => ({ ...f, minRating: r }))}
                        />
                        <span>{'⭐'.repeat(r) || 'All'}</span>
                    </label>
                ))}
            </section>

            {/* Price */}
            <section>
                <h3 className="font-semibold mb-2">Price</h3>
                {priceOptions.map(opt => (
                    <label key={opt.value} className="flex items-center space-x-2 mb-1">
                        <input
                            type="radio"
                            name="price"
                            value={opt.value}
                            checked={price === opt.value}
                            onChange={() => onChange(f => ({ ...f, price: opt.value }))}
                        />
                        <span>{opt.label}</span>
                    </label>
                ))}
            </section>
        </aside>
    );
}
