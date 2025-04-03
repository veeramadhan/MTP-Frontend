import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { MapPin } from "lucide-react";
import { Link } from "react-scroll";
import bg1 from "./../assets/images/bg1.jpg";  // Use optimized WebP images
import bg2 from "./../assets/images/bg2.jpg";
import bg3 from "./../assets/images/bg3.jpg";


const slides = [
  { location: "Kerala, India", img: bg2, quote: "Dream. Explore. Discover.", subtext: "Let MTP take you there!" },
  { location: "Karnataka, India", img: bg1, quote: "Best tour packages for your dream trips!", subtext: "Book your adventure today." },
  { location: "Goa, India", img: bg3, quote: "Every journey begins with a single step.", subtext: "Let’s make it unforgettable!" },
];

export const Home = () => {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section id="home" className="h-full pt-20 px-4 md:px-10 lg:px-20 flex items-center justify-center bg-green-50">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 10000000, disableOnInteraction: false }}
        loop={true}
        className="h-[500px] sm:h-[600px] md:h-[700px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative flex items-center justify-center">
            {/* Background Image with Lazy Loading */}
            <img
              src={slide.img}
              alt="Slide Image"
              className={`w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] transition-opacity duration-700 ${
                loadedImages[index] ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => handleImageLoad(index)}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 rounded-[30px] sm:rounded-[40px] md:rounded-[50px] flex flex-col items-center justify-center text-center p-4 sm:p-6">
              {/* Location Badge */}
              <div className="absolute top-6 sm:top-10 bg-orange-500 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-2 rounded-full flex items-center gap-2">
                <MapPin size={16} />
                {slide.location}
              </div>

              {/* Quote */}
              <h2 className="text-white sm:text-4xl md:text-5xl font-bold max-w-xl leading-tight">
                {slide.quote}
              </h2>

              {/* Subtext */}
              <p className="text-white text-sm sm:text-lg mt-2 sm:mt-3 opacity-80 max-w-md sm:max-w-xl">
                {slide.subtext}
              </p>

              {/* Button */}
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Link to="packages" smooth={true} duration={500}>
                  <button className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-medium">
                    Book A Trip
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
