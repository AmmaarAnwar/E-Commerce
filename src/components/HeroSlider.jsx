import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import swip1 from '../assets/Home/swiper/swip1.jpg'
import swip2 from '../assets/Home/swiper/swip2.jpg'
import swip3 from '../assets/Home/swiper/swip3.jpg'
import swip4 from '../assets/Home/swiper/swip4.jpg' 
import swip5 from '../assets/Home/swiper/swip5.jpg'
import swip6 from '../assets/Home/swiper/swip6.jpg'

const HeroSlider = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden ">
  <Swiper
    modules={[Autoplay, Navigation]}
    spaceBetween={30}
    slidesPerView={1}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    loop={true}
    navigation={true}
    className="w-full h-full"
  >
    <SwiperSlide>
      <img src={swip1} className="w-full h-full object-cover" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={swip2} className="w-full h-full object-cover" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={swip3} className="w-full h-full object-cover" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={swip4} className="w-full h-full object-cover" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={swip5} className="w-full h-full object-cover" />
    </SwiperSlide>
    <SwiperSlide>
      <img src={swip6} className="w-full h-full object-cover" />
    </SwiperSlide>
  </Swiper>
</div>

  );
};

export default HeroSlider;
