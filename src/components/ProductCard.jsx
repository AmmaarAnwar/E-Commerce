import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  if (!product) return null;
  const { id, image, title, price, rating } = product;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (userInfo) {
      const itemToAdd = {
        id: id,
        title: title,
        image: image,
        price: price,
        quantity: 1,
      };
      dispatch(addToCart(itemToAdd));
      alert(`${title} was added to your cart!`);
    } else {
      alert("Please sign in to add items to your cart.");
      navigate("/signin");
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="flex flex-col p-4 transition-shadow border rounded-lg shadow cursor-pointer hover:shadow-lg"
      onClick={handleProductClick}
    >
      <img src={image} alt={title} className="object-contain h-48 mb-4" />

      <h2 className="mb-2 text-lg font-semibold line-clamp-2">{title}</h2>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-bold">${price.toFixed(2)}</span>
        <span className="text-sm text-yellow-500">⭐ {rating.rate}</span>
      </div>

      <button
        className="py-2 mt-auto text-black bg-yellow-400 rounded hover:bg-yellow-500"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
}
