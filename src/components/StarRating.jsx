import React from "react";

const StarRating = ({
  rating,
  totalStars = 5,
  showCount = false,
  reviewCount = 0,
}) => {
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${
          i <= rating ? "text-amazon-yellow" : "text-gray-300"
        }`}
      >
        ★
      </span>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="star-rating">{stars}</div>
      <span className="text-sm text-amazon-blue font-medium">{rating}</span>
      {showCount && (
        <span className="text-sm text-amazon-blue underline cursor-pointer">
          {reviewCount} ratings
        </span>
      )}
    </div>
  );
};

export default StarRating;
