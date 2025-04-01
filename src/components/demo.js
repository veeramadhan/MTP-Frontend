import React, { useState } from "react";
import boat from "../assets/gallery/boat.jpg";
import mysore from "../assets/gallery/mysore.jpg";
import goa from "../assets/gallery/goa.jpg";
import backwaterboat from "../assets/gallery/backwaterboat.jpg";
import goldentemple from "../assets/gallery/goldentemple.jpg";
import beach from "../assets/gallery/beach.jpg";

const packages = {
  "Tamil Nadu": [
    {
      id: 1,
      duration: "3 DAYS / 4 NIGHTS",
      location: "Ooty + Kodaikanal",
      image: mysore,
      title: "Explore the Queen of Hills and the Princess of Hills",
      route: "Coimbatore → Ooty → Kodaikanal → Madurai",
      price: "₹8,999",
    },
    {
      id: 2,
      duration: "4 DAYS / 5 NIGHTS",
      location: "Chennai + Mahabalipuram",
      image: goldentemple,
      title: "A Coastal Journey Through History and Culture",
      route: "Chennai → Mahabalipuram → Pondicherry → Chennai",
      price: "₹12,499",
    },
  ],
  Kerala: [
    {
      id: 3,
      duration: "2 DAYS / 1 NIGHT",
      location: "Munnar + Munnar",
      image: backwaterboat,
      title: "Off road jeep safari in Munnar",
      route: "Munnar",
      price: "start from ₹2,999",
    },
  ],
  Karnataka: [
    {
      id: 4,
      duration: "4 DAYS / 5 NIGHTS",
      location: "Coorg + Chikmagalur",
      image: boat,
      title: "The Scotland of India & Coffee Land Adventure",
      route: "Bangalore → Coorg → Chikmagalur → Bangalore",
      price: "₹14,500",
    },
  ],
  Goa: [
    {
      id: 5,
      duration: "3 DAYS / 4 NIGHTS",
      location: "North & South Goa",
      image: goa,
      title: "Sun, Sand, and Fun at the Best Beaches",
      route: "Goa → Calangute → Baga → Palolem",
      price: "₹9,999",
    },
  ],
  Kashmir: [
    {
      id: 6,
      duration: "6 DAYS / 7 NIGHTS",
      location: "Srinagar + Gulmarg + Pahalgam",
      image: beach,
      title: "Paradise on Earth - Snow, Lakes, and Mountains",
      route: "Srinagar → Gulmarg → Pahalgam → Sonmarg",
      price: "₹24,999",
    },
  ],
};

const Packages = () => {
  const [activeTab, setActiveTab] = useState("Tamil Nadu");

  return (
    <section
      id="packages"
      className="w-full pt-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-green-50 flex flex-col items-center"
    >
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-6">Tourist Attractions</h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        {Object.keys(packages).map((tab) => (
          <button
            key={tab}
            className={`px-4 sm:px-6 py-2 text-sm sm:text-lg rounded-md transition-all duration-300 ${
              activeTab === tab ? "bg-black text-white" : "bg-white text-black border"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {packages[activeTab].map((pkg) => (
          <div
            key={pkg.id}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex justify-between items-center text-xs sm:text-sm mb-2">
                  <span className="bg-black text-white px-2 py-1 rounded">{pkg.duration}</span>
                  <span className="text-green-600 font-semibold">{pkg.location}</span>
                </div>
                <h3 className="text-lg font-semibold">{pkg.title}</h3>
                <p className="text-gray-500 text-sm">{pkg.route}</p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-green-600 font-bold">{pkg.price}</p>
                <button className="bg-green-600 text-white px-4 py-2 text-sm rounded-lg transition-all hover:bg-green-700">
                  Book A Trip ✈️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-10 text-center">
        <button className="bg-yellow-500 text-white px-6 py-3 text-sm sm:text-lg rounded-lg transition-all hover:bg-yellow-600">
          View All Packages
        </button>
      </div>
    </section>
  );
};

export default Packages;
