// src/pages/ProductsPage.jsx
import React, { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProduct";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  // 1️⃣ Filter state
  const [filters, setFilters] = useState({
    category: "All",
    minRating: 0,
    price: "All",
  });

  // 2️⃣ Responsive sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 3️⃣ Derive category list from data
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["All", ...cats];
  }, [products]);

  // 4️⃣ Price ranges
  const priceOptions = [
    { label: "All", value: "All" },
    { label: "≤ $50", value: "0-50" },
    { label: "$50–$100", value: "50-100" },
    { label: "$100–$500", value: "100-500" },
    { label: "> $500", value: "500+" },
  ];

  // 5️⃣ Filter logic
  const filtered = useMemo(() => {
    return products.filter((p) => {
      // category filter
      if (filters.category !== "All" && p.category !== filters.category)
        return false;

      // rating filter
      if (p.rating.rate < filters.minRating) return false;

      // price filter
      if (filters.price !== "All") {
        const price = p.price;
        const [low, high] = filters.price.split("-");
        if (high === "+") {
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
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="lg:w-64 lg:flex-shrink-0">
            <FilterSidebar
              categories={categories}
              priceOptions={priceOptions}
              filters={filters}
              onChange={setFilters}
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>

          <main className="flex-1">
            <div className="mb-6">
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Products
              </h1>
              <p className="text-gray-600">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg text-gray-500">
                  No products match your filters.
                </p>
                <button
                  onClick={() =>
                    setFilters({ category: "All", minRating: 0, price: "All" })
                  }
                  className="px-4 py-2 mt-4 text-sm font-medium text-gray-700 transition-colors bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 font-plex"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
