"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const roomImages = [
  [
    "/assets/Rooms/dew1.jpg",
    "/assets/Rooms/dew2.jpg",
    "/assets/Rooms/dew3.jpg",
  ],
  [
    "/assets/Rooms/anton.jpg",
    "/assets/Rooms/anton1.jpg",
    "/assets/Rooms/anton3.jpeg",
    "/assets/Rooms/anto4.jpg",
  ],
  [
    "/assets/Rooms/lux.jpg",
    "/assets/Rooms/lux1.jpg",
    "/assets/Rooms/lux2.jpg",
  ],
];

const roomTypes = ["Standard", "Deluxe", "Luxury"];

const RoomStay = ({ showRooms = true }) => {
  const [currentIndex, setCurrentIndex] = useState(Array(roomImages.length).fill(0));
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    if (!showRooms) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndexes) =>
        prevIndexes.map((index, roomIdx) => (index + 1) % roomImages[roomIdx].length)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [showRooms]);

  const closeFullscreen = useCallback(() => setFullscreenImage(null), []);

  // Close fullscreen on Escape
  useEffect(() => {
    if (!fullscreenImage) return;
    const handleKey = (e) => { if (e.key === "Escape") closeFullscreen(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [fullscreenImage, closeFullscreen]);

  const goNext = (roomIdx) => {
    setCurrentIndex((prevIndexes) =>
      prevIndexes.map((index, i) =>
        i === roomIdx ? (index + 1) % roomImages[roomIdx].length : index
      )
    );
  };

  const goPrev = (roomIdx) => {
    setCurrentIndex((prevIndexes) =>
      prevIndexes.map((index, i) =>
        i === roomIdx
          ? (index - 1 + roomImages[roomIdx].length) % roomImages[roomIdx].length
          : index
      )
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4">
      {roomImages.map((images, roomIdx) => (
        <div
          key={roomIdx}
          className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transition transform hover:scale-105 
                     h-[320px] w-full sm:h-[340px] sm:w-[400px] md:h-[400px] md:w-[500px] mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">{roomTypes[roomIdx]}</h3>

          <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] overflow-hidden rounded-md">
            <Image
              src={images[currentIndex[roomIdx]]}
              alt={`${roomTypes[roomIdx]} Room`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover rounded-md cursor-pointer transition-transform duration-500 ease-in-out"
              onClick={() => setFullscreenImage(images[currentIndex[roomIdx]])}
            />

            <button
              onClick={() => goPrev(roomIdx)}
              aria-label="Previous image"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full 
                         hover:bg-gray-600 transition focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 6 10"><path strokeLinecap="round" strokeLinejoin="round" d="M5 1 1 5l4 4" /></svg>
            </button>
            <button
              onClick={() => goNext(roomIdx)}
              aria-label="Next image"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full 
                         hover:bg-gray-600 transition focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 6 10"><path strokeLinecap="round" strokeLinejoin="round" d="m1 1 4 4-4 4" /></svg>
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2 text-center">
            Three choices. One promise – comfort that feels just right.
          </p>
        </div>
      ))}

      {fullscreenImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeFullscreen}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image viewer"
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen Room Image"
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={closeFullscreen}
            aria-label="Close fullscreen"
            className="absolute top-5 right-5 text-white text-3xl font-bold bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomStay;
