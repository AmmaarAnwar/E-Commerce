// src/components/FilterSidebar/FilterSidebar.jsx
import React from "react";

export default function FilterSidebar({
  categories,
  priceOptions,
  filters,
  onChange,
  isOpen = true,
  onToggle,
}) {
  const { category, minRating, price } = filters;

  const handleFilterChange = (filterType, value) => {
    onChange((f) => ({ ...f, [filterType]: value }));
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      <div className="mb-4 lg:hidden">
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full px-4 py-3 space-x-2 font-medium text-gray-900 transition-colors border rounded-lg bg-amazon-yellow border-amazon-yellow hover:bg-yellow-400"
        >
          <span className="font-plex">Filters</span>
          <svg
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <aside
        className={`
        ${isOpen ? "block" : "hidden"} 
        lg:block 
        w-full 
        lg:w-64 
        p-4 
        space-y-6 
        lg:border-r 
        bg-white 
        lg:bg-transparent
        rounded-lg 
        lg:rounded-none 
        shadow-lg 
        lg:shadow-none
        mb-4 
        lg:mb-0
        border border-gray-200
        lg:border-r-gray-200
        lg:border-t-0
        lg:border-b-0
        lg:border-l-0
      `}
      >
        <section>
          <h3 className="mb-3 font-semibold text-gray-800 font-plex">
            Category
          </h3>
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center mb-2 space-x-2 transition-colors cursor-pointer hover:text-amazon-blue"
            >
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={() => handleFilterChange("category", cat)}
                className="text-amazon-orange focus:ring-amazon-orange"
              />
              <span className="text-sm font-plex">{cat}</span>
            </label>
          ))}
        </section>

        <section>
          <h3 className="mb-3 font-semibold text-gray-800 font-plex">
            Min Rating
          </h3>
          {[0, 1, 2, 3, 4].map((r) => (
            <label
              key={r}
              className="flex items-center mb-2 space-x-2 transition-colors cursor-pointer hover:text-amazon-blue"
            >
              <input
                type="radio"
                name="rating"
                value={r}
                checked={minRating === r}
                onChange={() => handleFilterChange("minRating", r)}
                className="text-amazon-orange focus:ring-amazon-orange"
              />
              <span className="text-sm font-plex">
                {r === 0 ? "All" : "⭐".repeat(r)}
              </span>
            </label>
          ))}
        </section>

        <section>
          <h3 className="mb-3 font-semibold text-gray-800 font-plex">Price</h3>
          {priceOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center mb-2 space-x-2 transition-colors cursor-pointer hover:text-amazon-blue"
            >
              <input
                type="radio"
                name="price"
                value={opt.value}
                checked={price === opt.value}
                onChange={() => handleFilterChange("price", opt.value)}
                className="text-amazon-orange focus:ring-amazon-orange"
              />
              <span className="text-sm font-plex">{opt.label}</span>
            </label>
          ))}
        </section>

        <section className="pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              onChange({ category: "All", minRating: 0, price: "All" });
              if (window.innerWidth < 1024) {
                onToggle();
              }
            }}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 font-plex"
          >
            Clear All Filters
          </button>
        </section>
      </aside>
    </>
  );
}
