import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductImage from "../components/ProductImage";
import ProductDetails from "../components/ProductDetails";
import CustomerReviews from "../components/CustomerReviews";
import { fetchProductById } from "../services/productService";
import { addToCart } from "../redux/cartSlice";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const productId = id || "1"; // Default to product 1

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleAddToCart = (product, quantity) => {
    if (userInfo) {
      const itemToAdd = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: quantity,
      };
      dispatch(addToCart(itemToAdd));
      alert(`${quantity} x ${product.title} was added to your cart!`);
    } else {
      alert("Please sign in to add items to your cart.");
      navigate("/signin");
    }
  };

  const handleBuyNow = (product, quantity) => {
    if (userInfo) {
      // Add item to cart first
      const itemToAdd = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: quantity,
      };
      dispatch(addToCart(itemToAdd));

      // Navigate to cart page
      navigate("/cart");
    } else {
      alert("Please sign in to purchase this item.");
      navigate("/signin");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container px-4 py-8 mx-auto">
          <div className="space-y-4 animate-pulse">
            <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="bg-gray-200 rounded h-96"></div>
              </div>
              <div className="space-y-4 lg:col-span-4">
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/4 h-8 bg-gray-200 rounded"></div>
              </div>
              <div className="lg:col-span-3">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container px-4 py-8 mx-auto">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Product Not Found
            </h1>
            <p className="text-gray-600">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 border-b bg-gray-50">
        <div className="container mx-auto">
          <button
            onClick={() => navigate("/product")}
            className="flex items-center space-x-2 transition-colors text-amazon-blue hover:text-amazon-orange"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-medium">Back to Products</span>
          </button>
        </div>
      </div>

      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ProductImage
              images={product.images}
              image={product.image}
              productName={product.title}
            />
          </div>

          <div className="lg:col-span-4">
            <ProductDetails
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              isAuthenticated={!!userInfo}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="sticky p-6 bg-white border border-gray-200 rounded-lg shadow-sm top-4">
              <div className="space-y-6">
                <div className="text-3xl font-normal text-red-600">
                  ${product.price}
                </div>
                <div className="text-sm text-gray-600">
                  Free delivery by Tomorrow.{" "}
                  <a href="#" className="text-amazon-blue hover:underline">
                    Details
                  </a>
                </div>
                <div className="text-sm">
                  <span className="font-medium">
                    Delivery to Riyadh - Update Location
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">
                    Usually ships within 4 to 5 days
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">Quantity:</span>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="px-3 py-2 text-sm border border-gray-300 rounded"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleAddToCart(product, quantity)}
                    className="w-full px-4 py-3 font-medium text-gray-900 transition-colors border rounded bg-amazon-yellow hover:bg-yellow-400 border-amazon-yellow"
                  >
                    {userInfo ? "Add to Cart" : "Sign in to Add to Cart"}
                  </button>
                  <button
                    onClick={() => handleBuyNow(product, quantity)}
                    className="w-full px-4 py-3 font-medium text-white transition-colors rounded bg-amazon-orange hover:bg-orange-600"
                  >
                    {userInfo ? "Buy Now" : "Sign in to Buy"}
                  </button>
                </div>

                {!userInfo && (
                  <div className="p-3 text-sm border border-yellow-200 rounded bg-yellow-50">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-yellow-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-yellow-800">
                        Sign in to purchase this item
                      </span>
                    </div>
                  </div>
                )}

                <div className="pt-6 space-y-2 text-sm border-t">
                  <div>
                    Ships from <span className="font-medium">Amazon</span>
                  </div>
                  <div>
                    Sold by <span className="font-medium">Amazon</span>
                  </div>
                  <div>
                    Payment{" "}
                    <span className="font-medium">Secure transaction</span>
                  </div>
                </div>

                <button className="w-full text-sm text-left text-amazon-blue hover:text-amazon-orange hover:underline">
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>

        <CustomerReviews
          reviews={[
            {
              user: "Sarah Johnson",
              rating: 5,
              title: "Excellent product!",
              date: "December 15, 2024",
              comment:
                "This product exceeded my expectations. The quality is outstanding and it works perfectly. Highly recommend to anyone looking for a reliable solution.",
            },
            {
              user: "Mike Chen",
              rating: 4,
              title: "Great value for money",
              date: "December 10, 2024",
              comment:
                "Very good product for the price. The features work well and the build quality is solid. Would definitely recommend to others.",
            },
            {
              user: "Emily Rodriguez",
              rating: 5,
              title: "Perfect for my needs",
              date: "December 8, 2024",
              comment:
                "I use this product daily and it's been reliable and efficient. The design is user-friendly and it performs exactly as advertised.",
            },
            {
              user: "David Thompson",
              rating: 4,
              title: "Good quality product",
              date: "December 5, 2024",
              comment:
                "Solid product with good features. The quality is consistent and it meets all my requirements. Would buy again.",
            },
          ]}
          overallRating={product.rating?.rate || 0}
        />
      </div>

      <section className="w-full bg-[#37475A] text-white text-center py-4 hover:bg-[#0C3353] transition-colors">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm hover:underline"
        >
          Back to Top
        </button>
      </section>
    </div>
  );
};

export default SingleProductPage;
