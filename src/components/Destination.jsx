"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import RoomStay from "@/components/Destination/RoomStay";
import Bus from "@/components/Destination/Bus";
import Information from "@/components/Destination/Information";

export const Destination = () => {
  const [activeSection, setActiveSection] = useState("information");

  const infoRef = useRef(null);
  const busRef = useRef(null);
  const roomRef = useRef(null);

  const handleSectionClick = (section, ref) => {
    setActiveSection(section);

    if (typeof window !== "undefined" && window.innerWidth < 768 && ref.current) {
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

      <div className="flex justify-center items-center gap-6 mt-20 sm:flex-nowrap overflow-x-auto w-full px-4 py-4 sm:px-0" role="tablist">
        {/* Rooms Section */}
        <div
          role="tab"
          tabIndex={0}
          aria-selected={activeSection === "rooms"}
          className={`flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-xl border-gray-300 cursor-pointer transition-all duration-500 bg-white 
          ${
            activeSection === "rooms"
              ? "scale-110 opacity-100 shadow-2xl "
              : "scale-90 opacity-50 hover:scale-105 shadow-lg shadow-gray-400"
          }`}
          onClick={() => handleSectionClick("rooms", roomRef)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSectionClick("rooms", roomRef); } }}
        >
          <Image src="/assets/logo/hotel.png" width={64} height={64} className="h-12 w-12 md:h-16 md:w-16" alt="Hotel Logo" />
          <p className="text-sm md:text-lg font-medium mt-2">Rooms</p>
        </div>

        {/* Information Section */}
        <div
          role="tab"
          tabIndex={0}
          aria-selected={activeSection === "information"}
          className={`flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-xl border-gray-300 cursor-pointer transition-all duration-500 bg-white 
          ${
            activeSection === "information"
              ? "scale-110 opacity-100 shadow-2xl "
              : "scale-90 opacity-50 hover:scale-105 shadow-lg shadow-gray-400"
          }`}
          onClick={() => handleSectionClick("information", infoRef)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSectionClick("information", infoRef); } }}
        >
          <Image src="/assets/logo/information.png" width={64} height={64} className="h-12 w-12 md:h-16 md:w-16" alt="Information Logo" />
          <p className="text-sm md:text-lg font-medium mt-2">Information</p>
        </div>

        {/* Bus Section */}
        <div
          role="tab"
          tabIndex={0}
          aria-selected={activeSection === "bus"}
          className={`flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-xl border-gray-300 cursor-pointer transition-all duration-500 bg-white 
          ${
            activeSection === "bus"
              ? "scale-110 opacity-100 shadow-2xl "
              : "scale-90 opacity-50 hover:scale-105 shadow-lg shadow-gray-400"
          }`}
          onClick={() => handleSectionClick("bus", busRef)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSectionClick("bus", busRef); } }}
        >
          <Image src="/assets/logo/bus.png" width={64} height={64} className="h-12 w-12 md:h-16 md:w-16" alt="Bus Logo" />
          <p className="text-sm md:text-lg font-medium mt-2">Bus</p>
        </div>
      </div>

      {/* Render Selected Section */}
      <div className="w-full mt-6 sm:mt-10">
        <div ref={roomRef}>{activeSection === "rooms" && <RoomStay showRooms={true} />}</div>
        <div ref={infoRef}>{activeSection === "information" && <Information />}</div>
        <div ref={busRef}>{activeSection === "bus" && <Bus />}</div>
      </div>
    </section>
  );
};
