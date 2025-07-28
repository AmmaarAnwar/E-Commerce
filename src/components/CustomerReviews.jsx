import React from "react";
import StarRating from "./StarRating";

const CustomerReviews = ({ reviews, overallRating }) => {
  // Calculate rating distribution from actual reviews
  const calculateRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating]++;
    });

    const total = reviews.length;
    return [
      {
        stars: 5,
        percentage: total > 0 ? Math.round((distribution[5] / total) * 100) : 0,
      },
      {
        stars: 4,
        percentage: total > 0 ? Math.round((distribution[4] / total) * 100) : 0,
      },
      {
        stars: 3,
        percentage: total > 0 ? Math.round((distribution[3] / total) * 100) : 0,
      },
      {
        stars: 2,
        percentage: total > 0 ? Math.round((distribution[2] / total) * 100) : 0,
      },
      {
        stars: 1,
        percentage: total > 0 ? Math.round((distribution[1] / total) * 100) : 0,
      },
    ];
  };

  const ratingDistribution = calculateRatingDistribution();

  return (
    <div className="pt-8 mt-12 border-t">
      <h2 className="mb-6 text-xl font-medium">Customer Reviews</h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <div className="mb-6 text-center">
              <div className="mb-2 text-4xl font-bold text-gray-900">
                {reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : overallRating}
              </div>
              <div className="flex justify-center mb-2">
                <StarRating rating={reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : overallRating} showCount={false} />
              </div>
              <div className="text-sm text-gray-600">
                {reviews.length} global rating{reviews.length !== 1 ? 's' : ''}
              </div>
            </div>

              <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div
                  key={item.stars}
                  className="flex items-center space-x-3 text-sm"
                >
                  <div className="flex items-center w-16 space-x-1">
                    <span>{item.stars}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-yellow-400 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm text-gray-600">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {reviews.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="pb-6 border-b border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-gray-300 rounded-full">
                      <span className="text-sm font-medium text-gray-600">
                        {review.user.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="mb-1 font-medium text-gray-900">
                        {review.user}
                      </div>

                      <div className="flex items-center mb-2 space-x-2">
                        <StarRating rating={review.rating} showCount={false} />
                        <span className="font-medium text-gray-900">
                          {review.title}
                        </span>
                      </div>

                      <div className="mb-2 text-sm text-gray-500">
                        Reviewed on {review.date}
                      </div>

                      <p className="mb-3 text-sm leading-relaxed text-gray-700">
                        {review.comment}
                      </p>

                      <div className="text-xs">
                        <button className="text-amazon-blue hover:text-amazon-orange hover:underline">
                          Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
