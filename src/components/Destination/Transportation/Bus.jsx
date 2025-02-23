import React, { useState, useEffect } from "react";
import bohan1 from "../../../assets/Bus/bohan1.jpeg";
import bohan2 from "../../../assets/Bus/bohan2.jpeg";
import bohan3 from "../../../assets/Bus/bohan3.jpeg";
import bohan4 from "../../../assets/Bus/bohan4.jpeg";
import nayakan1 from "../../../assets/Bus/nayakan1.jpeg";
import nayakan2 from "../../../assets/Bus/nayakan2.jpeg";
import nayakan3 from "../../../assets/Bus/nayakan3.jpeg";
import nayakan4 from "../../../assets/Bus/nayakan4.jpeg";

const busImages = [
  [bohan1, bohan2, bohan3, bohan4],
  [nayakan1, nayakan2, nayakan3, nayakan4],
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
          className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transition transform hover:scale-105 md:h-[380px] md:w-[500px] mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">{busTypes[busIdx]}</h3>

          {/* Image Container */}
          <div className="relative w-full h-48 sm:h-60 md:h-72 overflow-hidden">
            <img
              src={images[currentIndex[busIdx]]}
              alt={`${busTypes[busIdx]} Bus`}
              className="w-full h-full object-cover rounded-md cursor-pointer transition-transform duration-500 ease-in-out"
              onClick={() => setFullscreenImage(images[currentIndex[busIdx]])} // Open full-screen
            />

            {/* Navigation Buttons */}
            <button
              onClick={() => goPrev(busIdx)}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 transition"
            >
              ❮
            </button>
            <button
              onClick={() => goNext(busIdx)}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-gray-600 transition"
            >
              ❯
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2 text-center">
            Comfortable travel with premium facilities.
          </p>
        </div>
      ))}

      {/* Full-Screen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setFullscreenImage(null)} // Close on background click
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen Bus Image"
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-5 right-5 text-white text-3xl font-bold bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Bus;
