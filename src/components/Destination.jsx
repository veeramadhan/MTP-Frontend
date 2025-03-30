import React, { useState } from "react";
import bus from "../../src/assets/logo/bus.png";
import hotel from "../../src/assets/logo/hotel.png";
import RoomStay from "./Destination/RoomStay/RoomStay";
import Bus from "../components/Destination/Transportation/Bus";
import information from "../assets/logo/information.png";
import Information from "./Destination/information/Information";

export const Destination = () => {
  const [activeSection, setActiveSection] = useState("information");

  return (
    <section
      id="destination"
      className="h-full pt-16 px-4 md:px-10 lg:px-20 flex flex-col items-center bg-green-50"
    >
      <h1 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        Ultimate Travel Experience
      </h1>

      <div className="flex justify-center items-center gap-6 sm:gap-10 mt-20 flex-wrap">
        
        {/* Information Section */}
        <div
          className={`flex flex-col items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-xl  border-gray-300 cursor-pointer 
          transition duration-300 bg-white 
          ${activeSection === "information" ? "scale-110 shadow-2xl shadow-gray-600" : "hover:scale-110 shadow-lg shadow-gray-400"}`}
          onClick={() => setActiveSection(activeSection === "information" ? null : "information")}
        >
          <img
            src={information}
            className="h-16 w-16 md:h-20 md:w-20"
            alt="Information Logo"
          />
          <p className="text-lg font-medium mt-2">Information</p>
        </div>

        {/* Bus Section */}
        <div
          className={`flex flex-col items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-xl  border-gray-300 cursor-pointer 
          transition duration-300 bg-white 
          ${activeSection === "bus" ? "scale-110 shadow-2xl shadow-gray-600" : "hover:scale-110 shadow-lg shadow-gray-400"}`}
          onClick={() => setActiveSection(activeSection === "bus" ? null : "bus")}
        >
          <img
            src={bus}
            className="h-16 w-16 md:h-20 md:w-20"
            alt="Bus Logo"
          />
          <p className="text-lg font-medium mt-2">Bus</p>
        </div>

        {/* Rooms Section */}
        <div
          className={`flex flex-col items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-xl  border-gray-300 cursor-pointer 
          transition duration-300 bg-white 
          ${activeSection === "rooms" ? "scale-110 shadow-2xl shadow-gray-600" : "hover:scale-110 shadow-lg shadow-gray-400"}`}
          onClick={() => setActiveSection(activeSection === "rooms" ? null : "rooms")}
        >
          <img
            src={hotel}
            className="h-16 w-16 md:h-20 md:w-20"
            alt="Hotel Logo"
          />
          <p className="text-lg font-medium mt-2">Rooms</p>
        </div>
      </div>

      {/* Render Selected Section */}
      <div className="w-full mt-6 sm:mt-10">
        {activeSection === "information" && <Information />}
        {activeSection === "rooms" && <RoomStay />}
        {activeSection === "bus" && <Bus />}
      </div>
    </section>
  );
};
