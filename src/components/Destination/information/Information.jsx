import React from "react";
import { motion } from "framer-motion";
import IV from "../../../assets/logo/IV.jpg";
import couple from "../../../assets/logo/couple.jpg";
import frds from "../../../assets/logo/frds.jpg";
import fam from "../../../assets/logo/fam.jpg";
import school from "../../../assets/logo/school.jpg";
import companys from "../../../assets/logo/companys.jpg";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
  exit: { opacity: 0, y: 50 },
};

const fadeZoom = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
  exit: { opacity: 0, scale: 0.9 },
};

const Information = () => {
  const whyChooseUs = [
    {
      icon: "🎟️",
      title: "Ultimate Flexibility",
      text: "You're in control, with payment options to satisfy any plan or budget.",
    },
    {
      icon: "💡",
      title: "Memorable Experiences",
      text: "Browse and book tours and activities so incredible, you'll want to tell your friends.",
    },
    {
      icon: "💎",
      title: "Quality at Our Core",
      text: "Backed by hundreds of reviews and held to the highest standards.",
    },
    {
      icon: "🏆",
      title: "Always Here for You",
      text: "New price? New plan? No problem. We're here to help, 24/7.",
    },
  ];

  const services = [
    { img: IV, title: "Industrial Visit" },
    { img: couple, title: "Couples Trip" },
    { img: school, title: "School Trip" },
    { img: fam, title: "Family Trip" },
    { img: frds, title: "Friends Trip" },
    { img: companys, title: "Company Trip" },
  ];

  return (
    <>
      {/* Why Choose Us Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 tracking-wide">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-4"
              custom={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.2 }}
            >
              <span className="text-orange-500 text-5xl mb-4">{item.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 text-lg max-w-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Services Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 tracking-wide">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-xl group transform transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
              style={{ perspective: "1000px" }}
              custom={index}
              variants={fadeZoom}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.2 }}
            >
              <div
                className="relative w-full h-60 rounded-xl overflow-hidden transition-all duration-500"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover rounded-xl brightness-50 group-hover:brightness-100 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-white text-3xl font-semibold transition-all duration-500 group-hover:scale-125 group-hover:rotate-3d"
                    style={{ transform: "translateZ(50px)" }}
                  >
                    {service.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Information;
