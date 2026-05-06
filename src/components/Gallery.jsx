"use client";

import { Camera, Car, MapPin, Plane } from "lucide-react";

export const Gallery = () => {
  const images = [
    { src: "/assets/gallery/boat.jpg", alt: "Boat on the water", className: "sm:col-span-2 sm:row-span-2" },
    { src: "/assets/gallery/mysore.jpg", alt: "Mysore Palace", className: "col-span-1 row-span-1" },
    { src: "/assets/gallery/goa.jpg", alt: "Aerial view of turquoise waters", className: "col-span-1 row-span-1" },
    { src: "/assets/gallery/goldentemple.jpg", alt: "Traditional Asian architecture", className: "sm:col-span-2 row-span-2" },
    { src: "/assets/gallery/beach.jpg", alt: "Person kayaking", className: "col-span-1 row-span-1" },
    { src: "/assets/gallery/goa.jpg", alt: "Mountain overlook", className: "sm:col-span-2 row-span-2" },
    { src: "/assets/gallery/boat1.jpg", alt: "Couple exploring city", className: "col-span-1 row-span-1" },
    { src: "/assets/gallery/backwaterboat.jpg", alt: "Ancient temple exploration", className: "sm:col-span-2 row-span-2" },
    { src: "/assets/gallery/beach.jpg", alt: "Hand monument", className: "col-span-1 row-span-1" },
  ];

  return (
    <section id="gallery" className="py-10 px-4 sm:px-8 lg:px-16 bg-green-50">
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="absolute inset-0 -z-10 hidden sm:block">
          <Camera className="absolute top-10 left-10 text-orange-200 w-12 h-12 opacity-20" />
          <Plane className="absolute top-20 right-20 text-orange-200 w-12 h-12 opacity-20" />
          <MapPin className="absolute bottom-20 left-40 text-orange-200 w-12 h-12 opacity-20" />
          <Car className="absolute bottom-10 right-10 text-orange-200 w-12 h-12 opacity-20" />
        </div>

        <h1 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-10 mb-10">
          Gallery
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[150px] sm:auto-rows-[200px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-xl ${image.className}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm sm:text-base font-medium">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
