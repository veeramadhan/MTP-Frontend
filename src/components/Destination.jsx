import React, { useState, useRef } from "react";
import bus from "../../src/assets/logo/bus.png";
import hotel from "../../src/assets/logo/hotel.png";
import RoomStay from "./Destination/RoomStay/RoomStay";
import Bus from "../components/Destination/Transportation/Bus";
import information from "../assets/logo/information.png";
import Information from "./Destination/information/Information";

 export const Destination = () => {
  const [activeSection, setActiveSection] = useState("information");

  // References for each section
  const infoRef = useRef(null);
  const busRef = useRef(null);
  const roomRef = useRef(null);

  // Function to handle section change and scroll
  const handleSectionClick = (section, ref) => {
    setActiveSection(section);

    // Scroll to the selected section on mobile view
    if (window.innerWidth < 768 && ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  return (
    <section
      id="destination"
      className="h-full pt-16 px-4 md:px-10 lg:px-20 flex flex-col items-center bg-green-50 scroll-mt-20"
    >
      <h1 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        Ultimate Travel Experience
      </h1>

      {/* Scrollable container for mobile view */}
      <div className="flex justify-center items-center gap-6 mt-20 sm:flex-nowrap overflow-x-auto w-full px-4 py-4 sm:px-0">

      {/* Rooms Section */}
        <div
          className={`flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-xl border-gray-300 cursor-pointer transition-all duration-500 bg-white 
          ${
            activeSection === "rooms"
              ? "scale-110 opacity-100 shadow-2xl "
              : "scale-90 opacity-50 hover:scale-105 shadow-lg shadow-gray-400"
          }`}
          onClick={() => handleSectionClick("rooms", roomRef)}
        >
          <img src={hotel} className="h-12 w-12 md:h-16 md:w-16" alt="Hotel Logo" />
          <p className="text-sm md:text-lg font-medium mt-2">Rooms</p>
        </div>
     

       

           {/* Information Section */}
        <div
          className={`flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-xl border-gray-300 cursor-pointer transition-all duration-500 bg-white 
          ${
            activeSection === "information"
              ? "scale-110 opacity-100 shadow-2xl "
              : "scale-90 opacity-50 hover:scale-105 shadow-lg shadow-gray-400"
          }`}
          onClick={() => handleSectionClick("information", infoRef)}
        >
          <img src={information} className="h-12 w-12 md:h-16 md:w-16" alt="Information Logo" />
          <p className="text-sm md:text-lg font-medium mt-2">Information</p>
        </div>

         {/* Bus Section */}
        <div
          className={`flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-xl border-gray-300 cursor-pointer transition-all duration-500 bg-white 
          ${
            activeSection === "bus"
              ? "scale-110 opacity-100 shadow-2xl "
              : "scale-90 opacity-50 hover:scale-105 shadow-lg shadow-gray-400"
          }`}
          onClick={() => handleSectionClick("bus", busRef)}
        >
          <img src={bus} className="h-12 w-12 md:h-16 md:w-16" alt="Bus Logo" />
          <p className="text-sm md:text-lg font-medium mt-2">Bus</p>
        </div>

        </div>

      {/* Render Selected Section */}
      <div className="w-full mt-6 sm:mt-10">
        
        
         <div ref={roomRef}>{activeSection === "rooms" && <RoomStay />}</div>
        <div ref={infoRef}>{activeSection === "information" && <Information />}</div>
        <div ref={busRef}>{activeSection === "bus" && <Bus />}</div>
       
      </div>
    </section>
  );
};
