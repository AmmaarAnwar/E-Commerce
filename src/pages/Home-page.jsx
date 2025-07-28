import HeroSlider from "../components/HeroSlider";
import HomeCards, { cardData } from "../components/HomeCards";
import pic1 from "../assets/Home/cards/pic1.png";
import pic2 from "../assets/Home/cards/pic2.png";
import pic3 from "../assets/Home/cards/pic3.png";
import pic4 from "../assets/Home/cards/pic4.png";
import ImageSlider from "../components/ImageSlider";
import { images } from "../components/ImageSlider";
import Navbar from "../components/Navbar";
import MainFooter from "../components/MainFooter";

const Home = () => {
  return (
    <div className="relative bg-[#575757]">
      <HeroSlider />

      <div className="relative z-10 px-4 mt-[-180px]">
        <HomeCards cards={cardData.slice(0, 8)} />
      </div>

      <div className="px-4">
        <ImageSlider
          title="Best Sellers in Clothing & Accessories"
          images={images.slice(0, 21)}
        />
      </div>

      <div className="px-4 ">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white shadow p-4 flex flex-col justify-between h-full min-h-[450px]">
            <div>
              <h2 className="mb-4 text-lg font-bold">
                Best Sellers in Toys & Games
              </h2>
              <div>
                <img src={pic1} alt="Main" className="w-full h-auto rounded" />
                <p className="mt-2 text-sm">
                  Storio Rechargeable Toys Talking Cactus Baby Toys for Kids
                  Dancing Cactus Toys…
                </p>
                <span className="py-5 text-xl font-bold">₹ 319.00</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-4">
              {[pic1, pic2, pic3, pic4].map((img, i) => (
                <div key={i} className="border-2 rounded">
                  <img
                    src={img}
                    alt={`Product ${i + 1}`}
                    className="w-full h-16 rounded "
                  />
                </div>
              ))}
            </div>
          </div>

          {cardData.slice(8, 11).map((card, index) => (
            <div
              key={index}
              className="bg-white shadow p-4 flex flex-col justify-between h-full min-h-[450px]"
            >
              <div>
                <h2 className="mb-4 text-lg font-bold leading-snug">
                  {card.title}
                </h2>
                <div className="grid grid-cols-2 gap-3 min-h-[270px]">
                  {card.items.map((item, i) => (
                    <div key={i}>
                      <img
                        src={item.img}
                        alt={item.caption}
                        className="object-cover w-full h-48"
                      />
                      <p className="mt-1 text-sm">{item.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href={card.link}
                className="text-[#1F8394] hover:text-[#0C3353] block mt-4"
              >
                {card.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <ImageSlider
          title="Min. 50% off | Unique kitchen finds | Amazon Brands & more"
          images={images.slice(21, 36)}
        />
      </div>

      <section className="w-full bg-[#37475A] text-white text-center py-4  hover:bg-[#0C3353] transition-colors">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-6 py-2 text-lg font-semibold"
        >
          Back to Top
        </button>
      </section>
    </div>
  );
};

export default Home;
