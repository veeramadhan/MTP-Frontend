import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";

import { generateSlug } from "../utils/generateSlug";

export const Packages = () => {
  const [packages, setPackages] = useState({});
  const [activeTab, setActiveTab] = useState("Kerala");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/places"
        );
        const data = await response.json();
        console.log("data",data);
        setPackages(data.places[0] || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const isValidTab =
    packages &&
    packages[activeTab] &&
    Object.keys(packages[activeTab]).length > 0;

  return (
    <section
      id="packages"
      className="w-full pt-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-green-50 flex flex-col items-center"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-6">
            Tourist Attractions
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {Object.keys(packages)
              .filter((tab) => tab !== "_id")
              .map((tab) => (
                <button
                  key={tab}
                  className={`px-4 sm:px-6 py-2 text-sm sm:text-lg rounded-md transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "bg-white text-black border"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
          </div>

          {/* Packages Display */}
          {isValidTab && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center w-full">
              {Object.keys(packages[activeTab]).map((destination) =>
                packages[activeTab][destination].map((pkg, index) => (
                  <div
                    key={`${pkg.id}-${index}`}
                    className="w-80 sm:w-96 h-[380px] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
                  >
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-center text-xs sm:text-sm mb-2">
                        <span className="bg-black text-white px-2 py-1 rounded">
                          {pkg.duration}
                        </span>
                        <span className="text-green-600 font-semibold">
                          {pkg.location}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {pkg.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {pkg.route}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <p className="text-green-600 font-bold">{pkg.price}</p>
                        <button
                          className="bg-green-600 text-white px-4 py-2 text-sm rounded-lg transition-all hover:bg-blue-700"
                          onClick={() =>
                            navigate(
                              `/package-details/${activeTab}/${
                                pkg.location
                              }/${generateSlug(pkg.title)}`
                            )
                          }
                        >
                          Explore
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};
