import React, { useState, useEffect } from "react";

const roomImages = [
  [
    require("../../../assets/Rooms/dew1.jpg"),
    require("../../../assets/Rooms/dew2.jpg"),
    require("../../../assets/Rooms/dew3.jpg"),
  ],
  [
    require("../../../assets/Rooms/anton.jpg"),
    require("../../../assets/Rooms/anton1.jpg"),
    require("../../../assets/Rooms/anton3.jpeg"),
    require("../../../assets/Rooms/anto4.jpg"),
  ],
  [
    require("../../../assets/Rooms/lux.jpg"),
    require("../../../assets/Rooms/lux1.jpg"),
    require("../../../assets/Rooms/lux2.jpg"),
  ],
];

const roomTypes = ["Standard", "Deluxe", "Luxury"];

const RoomStay = ({ showRooms }) => {
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
                     h-[300px] w-full sm:h-[340px] sm:w-[400px] md:h-[400px] md:w-[500px] mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">{roomTypes[roomIdx]}</h3>

          {/* Image Container */}
          <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] overflow-hidden rounded-md">
            <img
              src={images[currentIndex[roomIdx]]}
              alt={`${roomTypes[roomIdx]} Room`}
              className="w-full h-full object-cover rounded-md cursor-pointer transition-transform duration-500 ease-in-out"
              onClick={() => setFullscreenImage(images[currentIndex[roomIdx]])}
            />

            {/* Navigation Buttons */}
            <button
              onClick={() => goPrev(roomIdx)}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full 
                         hover:bg-gray-600 transition focus:outline-none"
            >
              ❮
            </button>
            <button
              onClick={() => goNext(roomIdx)}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full 
                         hover:bg-gray-600 transition focus:outline-none"
            >
              ❯
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2 text-center">
           Three choices. One promise – comfort that feels just right.
          </p>
        </div>
      ))}

      {/* Full-Screen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen Room Image"
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

export default RoomStay;
