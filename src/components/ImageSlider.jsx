import { useRef } from "react";

const imageModules = import.meta.glob('../assets/Home/slider/*.png', { eager: true, import: 'default' });

const importedImages = Object.entries(imageModules)
  .sort((a, b) => {
    const getNumber = (str) => Number(str.match(/(\d+)\.png$/)?.[1] || 0);
    return getNumber(a[0]) - getNumber(b[0]);
  })
  .map(([_, img]) => ({
    src: img,
    caption: "",
  }));

const ImageSlider = ({ title, images }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="my-8 bg-white relative p-4">
      <div className="mb-4 px-2">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2"
        >
          {images.map((img, index) => (
            <div key={index} className="min-w-[120px] flex-shrink-0">
              <img
                src={img.src}
                alt={`slide-${index}`}
                className="w-full h-48 object-cover rounded"
              />
              {img.caption && (
                <p className="text-sm text-center mt-1">{img.caption}</p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-white shadow-md py-5 px-3 hover:bg-gray-200 text-3xl font-bold"
        >
          {"<"}
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-white shadow-md py-5 px-3 text-3xl hover:bg-gray-200 font-bold"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export { importedImages as images };
export default ImageSlider;
