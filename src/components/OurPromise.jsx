import React from "react";
import { motion } from "framer-motion";
import global from "../assets/images/global.svg";

export const OurPromise = () => {
  const features = [
    { icon: "🛡️", text: "Safety First Always", bg: "bg-green-100", color: "text-green-600" },
    { icon: "🌍", text: "Trusted Travel Guide", bg: "bg-yellow-100", color: "text-yellow-600" },
    { icon: "🏆", text: "Expertise & Experience", bg: "bg-orange-100", color: "text-orange-600" },
    { icon: "✈️", text: "Hassle-free Travel", bg: "bg-blue-100", color: "text-blue-600" },
  ];

  return (
    <section id="ourpromise" className="w-full bg-green-50 py-12">
      <div className="container mx-auto px-6 flex flex-wrap lg:flex-nowrap items-center justify-between">
        
        {/* Left Content */}
        <motion.div
          className="w-full lg:w-1/2 space-y-4 text-center lg:text-left"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-green-600 font-bold text-4xl">Our Promise</p>
          <h2 className="text-4xl font-bold text-gray-800">
            We provide the best tour facilities.
          </h2>
          <p className="text-gray-600">
            Experience unforgettable journeys with safety, expert guides, and
            seamless travel planning.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon, text, bg, color }, index) => (
              <motion.div
                key={index}
                className={`${bg} p-4 rounded flex items-center gap-2 shadow-md`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className={`${color} text-2xl`}>{icon}</span>
                <p className="font-semibold text-gray-800">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center lg:justify-start mt-6 items-center">
            <a
              href="https://www.youtube.com/@MaduraiTourPlanner"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-transform hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Find Out More
              </motion.button>
            </a>
            <a
              href="https://www.instagram.com/madurai_tourplanner/?igsh=MTlqcnI2MXpkdzUzeQ%3D%3D#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="flex items-center gap-2 text-gray-800 font-semibold px-6 py-2 rounded border border-gray-400 hover:scale-110 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ▶ Watch Tour
              </motion.button>
            </a>
          </div>
        </motion.div>

        {/* Right Content - Image */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center mt-12 lg:mt-0 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src={global}
            alt="Tourists"
            className="w-full max-w-lg lg:max-w-none rounded-lg object-cover"
          />
          <span className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
            5 Years of Experience
          </span>
        </motion.div>
      </div>
    </section>
  );
};
