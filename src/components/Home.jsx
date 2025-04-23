import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import axios from "axios";
import { MapPin } from "lucide-react";
import Loader from "./Loader/Loader";

export const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidePic, setSlidePic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await axios.get("https://mtp-backend-45q8.onrender.com/slider-pics");
        setSlidePic(response.data);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  return (
    <section
      id="home"
      className="h-full pt-20 px-4 md:px-10 lg:px-20 flex items-center justify-center bg-green-50 scroll-mt-20"
    >
      {isLoading ? (
        <Loader />
      ) : slidePic.length > 0? (
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={3000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-[500px] sm:h-[600px] md:h-[700px] w-full"
        >
          {slidePic.map((slide, index) => (
            <SwiperSlide key={index} className="relative flex items-center justify-center">
              <img
                src={slide.img}
                alt="Slide Image"
                className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
                loading="lazy"
              />

              {activeIndex === index && (
                <motion.div
                  className="absolute inset-0 bg-black/50 rounded-[30px] sm:rounded-[40px] md:rounded-[50px] flex flex-col items-center justify-center text-center p-4 sm:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Location */}
                  <motion.div
                    className="absolute top-6 sm:top-10 bg-orange-500 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-2 rounded-full flex items-center gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <MapPin size={16} />
                    {slide.location || "Unknown Location"}
                  </motion.div>

                  {/* Quote */}
                  <motion.h2
                    className="text-white sm:text-4xl md:text-5xl font-bold max-w-xl leading-tight"
                    initial={{ opacity: 0, x: -150 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 150 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    {slide.quote || "Explore your next journey!"}
                  </motion.h2>

                  {/* Subtext */}
                  <motion.p
                    className="text-white text-sm sm:text-lg mt-2 sm:mt-3 opacity-80 max-w-md sm:max-w-xl"
                    initial={{ opacity: 0, x: 150 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -150 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    {slide.subtext || "Start your trip with MTP"}
                  </motion.p>

                  {/* Button */}
                  <motion.div
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
      ) : (
        <p className="text-center text-gray-500">No slides available</p>
      )}
    </section>
  );
};
