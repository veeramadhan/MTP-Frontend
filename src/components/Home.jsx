import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import { MapPin } from "lucide-react";
import { Link } from "react-scroll";
import bg1 from "./../assets/images/bg1.jpg";
import bg2 from "./../assets/images/bg2.jpg";
import bg3 from "./../assets/images/bg3.jpg";
import tamilnadu from "./../assets/images/tamilnadu.jpg";

const slides = [
  { location: "Kerala, India", img: bg2, quote: "Dream. Explore. Discover.", subtext: "Let MTP take you there!" },
  { location: "Karnataka, India", img: bg1, quote: "Best tour packages for your dream trips!", subtext: "Book your adventure today." },
  { location: "Goa, India", img: bg3, quote: "Every journey begins with a single step.", subtext: "Let’s make it unforgettable!" },
  { location: "Tamil Nadu, India", img: tamilnadu, quote: "Experience heritage, temples, and beaches!", subtext: "Discover the beauty of Tamil Nadu." },
];

export const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="home" className="h-full pt-20 px-4 md:px-10 lg:px-20 flex items-center justify-center bg-green-50">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={3000}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Track active slide index
        className="h-[500px] sm:h-[600px] md:h-[700px] w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative flex items-center justify-center">
            {/* Background Image */}
            <img
              src={slide.img}
              alt="Slide Image"
              className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
              loading="lazy"
            />

            {/* Animation Wrapper */}
            {activeIndex === index && ( // Ensures animation runs only for active slide
              <motion.div
                key={`slide-${index}`}
                className="absolute inset-0 bg-black/50 rounded-[30px] sm:rounded-[40px] md:rounded-[50px] flex flex-col items-center justify-center text-center p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Location Badge */}
                <motion.div
                  key={`location-${index}`}
                  className="absolute top-6 sm:top-10 bg-orange-500 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-2 rounded-full flex items-center gap-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <MapPin size={16} />
                  {slide.location}
                </motion.div>

                {/* Quote (Left to Right) */}
                <motion.h2
                  key={`quote-${index}`}
                  className="text-white sm:text-4xl md:text-5xl font-bold max-w-xl leading-tight"
                  initial={{ opacity: 0, x: -150 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 150 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  {slide.quote}
                </motion.h2>

                {/* Subtext (Right to Left) */}
                <motion.p
                  key={`subtext-${index}`}
                  className="text-white text-sm sm:text-lg mt-2 sm:mt-3 opacity-80 max-w-md sm:max-w-xl"
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -150 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  {slide.subtext}
                </motion.p>

                {/* Button */}
                <motion.div
                  key={`button-${index}`}
                  className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <Link to="packages" smooth={true} duration={500}>
                    <button className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-medium">
                      Book A Trip
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
