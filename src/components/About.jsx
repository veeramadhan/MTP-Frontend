import React from "react";
import global from "../assets/images/global.svg";

export const About = () => {
  return (
    <section id="About" className="w-full bg-green-50 py-12">
      <div className="container mx-auto px-6 flex flex-wrap lg:flex-nowrap items-center justify-between">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
          <p className="text-green-600 font-bold text-2xl">About Us</p>
          <h2 className="text-4xl font-bold text-gray-800">
            We provide the best tour facilities.
          </h2>
          <p className="text-gray-600">
            Experience unforgettable journeys with safety, expert guides, and
            seamless travel planning.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-100 p-4 rounded flex items-center gap-2">
              <span className="text-green-600 text-2xl">🛡️</span>
              <p className="font-semibold">Safety First Always</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded flex items-center gap-2">
              <span className="text-yellow-600 text-2xl">🌍</span>
              <p className="font-semibold">Trusted Travel Guide</p>
            </div>
            <div className="bg-orange-100 p-4 rounded flex items-center gap-2">
              <span className="text-orange-600 text-2xl">🏆</span>
              <p className="font-semibold">Expertise & Experience</p>
            </div>
            <div className="bg-blue-100 p-4 rounded flex items-center gap-2">
              <span className="text-blue-600 text-2xl">✈️</span>
              <p className="font-semibold">Hassle-free Travel</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center lg:justify-start mt-6 items-center ">
            <a
              href="https://www.youtube.com/@MaduraiTourPlanner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-400 transition-colors"
            >
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-transform  hover:scale-110">
                Find Out More
              </button>
            </a>
            <a
              href="https://www.instagram.com/madurai_tourplanner/?igsh=MTlqcnI2MXpkdzUzeQ%3D%3D#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-400 transition-colors"
            >
              <button className="flex items-center gap-2 text-gray-800 font-semibold px-6 py-2 rounded border border-gray-400 transition-transform  hover:scale-110">
                ▶ Watch Tour
              </button>
            </a>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0 relative">
          <img
            src={global}
            alt="Tourists"
            className="w-full max-w-lg lg:max-w-none rounded-lg object-cover"
          />
          <span className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded">
            5 Years of Experience
          </span>
        </div>
      </div>
    </section>
  );
};
