"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const busImages = [
  [
    "/assets/Bus/bohan1.jpeg",
    "/assets/Bus/bohan2.jpeg",
    "/assets/Bus/bohan3.jpeg",
    "/assets/Bus/bohan4.jpeg",
  ],
  [
    "/assets/Bus/nayakan1.jpeg",
    "/assets/Bus/nayakan2.jpeg",
    "/assets/Bus/nayakan3.jpeg",
    "/assets/Bus/nayakan4.jpeg",
  ],
];

const busTypes = ["Bohan Mayavi", "Nayakan Travels"];

const Bus = () => {
  const [currentIndex, setCurrentIndex] = useState(Array(busImages.length).fill(0));
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndexes) =>
        prevIndexes.map((index, busIdx) => (index + 1) % busImages[busIdx].length)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const closeFullscreen = useCallback(() => setFullscreenImage(null), []);

  // Close fullscreen on Escape
  useEffect(() => {
    if (!fullscreenImage) return;
    const handleKey = (e) => { if (e.key === "Escape") closeFullscreen(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [fullscreenImage, closeFullscreen]);

  const goNext = (busIdx) => {
    setCurrentIndex((prevIndexes) =>
      prevIndexes.map((index, i) =>
        i === busIdx ? (index + 1) % busImages[busIdx].length : index
      )
    );
  };

  const goPrev = (busIdx) => {
    setCurrentIndex((prevIndexes) =>
      prevIndexes.map((index, i) =>
        i === busIdx
          ? (index - 1 + busImages[busIdx].length) % busImages[busIdx].length
          : index
      )
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4">
      {busImages.map((images, busIdx) => (
        <div
          key={busIdx}
          className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transition transform hover:scale-105 md:h-[400px] md:w-[500px] mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">{busTypes[busIdx]}</h3>

          <div className="relative w-full h-48 sm:h-60 md:h-72 overflow-hidden">
            <Image
              src={images[currentIndex[busIdx]]}
              alt={`${busTypes[busIdx]} Bus`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover rounded-md cursor-pointer transition-transform duration-500 ease-in-out"
              onClick={() => setFullscreenImage(images[currentIndex[busIdx]])}
            />

            <button
              onClick={() => goPrev(busIdx)}
              aria-label="Previous image"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 6 10"><path strokeLinecap="round" strokeLinejoin="round" d="M5 1 1 5l4 4" /></svg>
            </button>
            <button
              onClick={() => goNext(busIdx)}
              aria-label="Next image"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 6 10"><path strokeLinecap="round" strokeLinejoin="round" d="m1 1 4 4-4 4" /></svg>
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2 text-center">
            Comfortable travel with premium facilities.
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
            alt="Fullscreen Bus Image"
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

export default Bus;
