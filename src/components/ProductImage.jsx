import { useState, useRef, useEffect } from "react";

const ProductImage = ({ images, productName, image }) => {
  // Use single image if images array is not provided
  const imageArray = images && images.length > 0 ? images : [image];

  const [selectedImage, setSelectedImage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const imageRef = useRef(null);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && selectedImage < imageArray.length - 1) {
        // Swipe left - next image
        setSelectedImage(selectedImage + 1);
      } else if (diff < 0 && selectedImage > 0) {
        // Swipe right - previous image
        setSelectedImage(selectedImage - 1);
      }
    }

    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && selectedImage < imageArray.length - 1) {
        // Swipe left - next image
        setSelectedImage(selectedImage + 1);
      } else if (diff < 0 && selectedImage > 0) {
        // Swipe right - previous image
        setSelectedImage(selectedImage - 1);
      }
    }

    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && selectedImage > 0) {
        setSelectedImage(selectedImage - 1);
      } else if (
        e.key === "ArrowRight" &&
        selectedImage < imageArray.length - 1
      ) {
        setSelectedImage(selectedImage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, imageArray.length]);

  const nextImage = () => {
    if (selectedImage < imageArray.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const prevImage = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  return (
    <div className="flex space-x-4">
      <div className="flex flex-col space-y-2">
        {imageArray.slice(0, 2).map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 border-2 rounded ${
              selectedImage === index
                ? "border-amazon-orange"
                : "border-gray-300"
            } overflow-hidden hover:border-amazon-orange transition-colors`}
          >
            <img
              src={img}
              alt={`${productName} view ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      <div className="relative flex-1">
        <div
          ref={imageRef}
          className="relative p-4 bg-white border border-gray-200 rounded-lg cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={imageArray[selectedImage]}
            alt={productName}
            className="object-contain w-full h-auto select-none max-h-96"
            draggable={false}
          />

          {selectedImage > 0 && (
            <button
              onClick={prevImage}
              className="absolute p-2 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md left-2 top-1/2 bg-opacity-80 hover:bg-opacity-100"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {selectedImage < imageArray.length - 1 && (
            <button
              onClick={nextImage}
              className="absolute p-2 transition-all transform -translate-y-1/2 bg-white rounded-full shadow-md right-2 top-1/2 bg-opacity-80 hover:bg-opacity-100"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          <div className="absolute px-2 py-1 text-xs text-white bg-black bg-opacity-50 rounded top-2 right-2">
            {selectedImage + 1} / {imageArray.length}
          </div>

        </div>

        <div className="mt-2 text-sm text-center text-gray-500">
          Swipe or drag to navigate • Use arrow keys
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
