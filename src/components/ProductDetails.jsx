import { useState } from "react";
import StarRating from "./StarRating";

const ProductDetails = ({
  product,
  onAddToCart,
  onBuyNow,
  isAuthenticated,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      <div className="text-sm text-amazon-blue">
        Brand:{" "}
        <span className="font-medium text-amazon-orange">
          {product.brand || "Unknown"}
        </span>
      </div>

      <h1 className="text-xl font-normal leading-tight text-gray-900 lg:text-2xl">
        {product.title}
      </h1>

      <div className="flex items-center space-x-4">
        <StarRating
          rating={product.rating?.rate || 0}
          showCount={true}
          reviewCount={product.rating?.count || 0}
        />
        <a
          href="#"
          className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
        >
          Search this page
        </a>
      </div>

      <div className="space-y-3">
        <div className="text-3xl font-normal text-red-600">
          ${product.price}
        </div>
        <div className="text-sm text-gray-600">All price include VAT.</div>
      </div>

      <div className="flex space-x-6 text-sm">
        <div className="flex flex-col items-center p-4 border rounded">
          <svg
            className="w-8 h-8 mb-2 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" />
          </svg>
          <span className="text-xs text-center">Electronic payment Only</span>
        </div>
        <div className="flex flex-col items-center p-4 border rounded">
          <svg
            className="w-8 h-8 mb-2 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs text-center">30 days Returnable</span>
        </div>
        <div className="flex flex-col items-center p-4 border rounded">
          <svg
            className="w-8 h-8 mb-2 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1-1-.257-.257A6 6 0 1118 8zm-2 0a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs text-center">Secure transaction</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900">About this item</h3>
        <div className="text-sm text-gray-700">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
