import React, {  useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import mtpm from "../assets/logo/mtpm.png";

export const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about-us"
      className="w-full bg-green-50 from-green-100 to-white py-20 px-4"
    >
      <motion.div
        ref={ref}
        variants={fadeInUp}
        initial="hidden"
        animate={controls}
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 md:p-16 text-center"
      >
        {/* Logo Image */}
        <div className="flex justify-center mb-8">
          <motion.img
            src={mtpm}
            alt="Madurai Tour Planner"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md border-4 border-green-300"
            variants={fadeInUp}
          />
        </div>

        {/* Title */}
        <motion.h2
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold text-green-700 mb-6"
        >
          About Madurai Tour Planner
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-gray-600 text-lg md:text-xl mb-10 leading-relaxed"
        >
          At Madurai Tour Planner, we believe travel should be magical and
          meaningful. Our team of local experts crafts personalized experiences
          across Madurai and South India, ensuring you witness cultural beauty,
          spiritual serenity, and warm hospitality like never before.
        </motion.p>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 text-left">
          <motion.div
            className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-semibold text-green-800 mb-3">
              🌟 Our Mission
            </h3>
            <p className="text-gray-700 text-md">
              To provide seamless, personalized travel experiences that leave
              lasting memories and spark the spirit of exploration in every
              traveler.
            </p>
          </motion.div>
          <motion.div
            className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-semibold text-green-800 mb-3">
              🚀 Our Vision
            </h3>
            <p className="text-gray-700 text-md">
              To be the most trusted travel partner from Madurai, known for our
              local expertise, innovation, and exceptional customer care.
            </p>
          </motion.div>
        </div>

        {/* Call-to-Action */}
        <motion.div variants={fadeInUp} className="mt-12">
          <a
            href="https://wa.me/919578904139"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-green-600 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:bg-green-700 transition duration-300">
              Plan Your Journey
            </button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
