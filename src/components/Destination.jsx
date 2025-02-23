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
        {/* Hotel Logo with Click to Show Rooms */}
        <div
          className={`flex flex-col items-center transform transition duration-300 ${
            activeSection === "information" ? "scale-110" : "hover:scale-110"
          } cursor-pointer`}
          onClick={() => setActiveSection(activeSection === "information" ? null : "information")}
        >
          <img
            src={information}
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20"
            alt="information Logo"
          />
          <p className="text-sm sm:text-lg font-medium mt-2">Information</p>
        </div>
       

        {/* Bus Logo with Click to Show Bus */}
        <div
          className={`flex flex-col items-center transform transition duration-300 ${
            activeSection === "bus" ? "scale-110" : "hover:scale-110"
          } cursor-pointer`}
          onClick={() => setActiveSection(activeSection === "bus" ? null : "bus")}
        >
          <img
            src={bus}
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20"
            alt="Bus Logo"
          />
          <p className="text-sm sm:text-lg font-medium mt-2">Bus</p>
        </div>

        <div
          className={`flex flex-col items-center transform transition duration-300 ${
            activeSection === "rooms" ? "scale-110" : "hover:scale-110"
          } cursor-pointer`}
          onClick={() => setActiveSection(activeSection === "rooms" ? null : "rooms")}
        >
          <img
            src={hotel}
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20"
            alt="Hotel Logo"
          />
          <p className="text-sm sm:text-lg font-medium mt-2">Rooms</p>
        </div>
      </div>

      {/* Conditionally Render RoomStay or Bus */}
      <div className="w-full  mt-6 sm:mt-10">
      {activeSection === "information" && <Information />}
        {activeSection === "rooms" && <RoomStay />}
        {activeSection === "bus" && <Bus />}
      </div>
    </section>
  );
};
