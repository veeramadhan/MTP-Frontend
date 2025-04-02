import React, { useState, useEffect } from "react";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [activeTab, setActiveTab] = useState("Tamil Nadu");
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("https://mtp-backend-45q8.onrender.com/places");
        const data = await response.json();
        console.log(data);
        setPackages(data.places[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPackages();
  }, []);

  const isValidTab =
    packages[activeTab] && Object.keys(packages[activeTab]).length > 0;

  return (
    <section
      id="packages"
      className="w-full pt-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-green-50 flex flex-col items-center"
    >
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

      {/* Destination-based Packages */}
      {isValidTab &&
        Object.keys(packages[activeTab]).map((destination) => (
          <div key={destination}>
            {/* Packages Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 place-items-center w-full">
              {Array.isArray(packages[activeTab][destination]) &&
                packages[activeTab][destination].map((pkg) => (
                  <div
                    key={pkg.id}
                    className="w-80 sm:w-96 h-[380px] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col m-2"
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
                          onClick={() => setSelectedPackage(pkg)}
                        >
                          Explore
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

      {/* Modal for Package Details */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{selectedPackage.title}</h2>
            <p className="text-gray-700">{selectedPackage.location}</p>
            <p className="text-gray-500 mb-2">{selectedPackage.duration}</p>

            {/* Display itinerary */}
            {selectedPackage.details && (
              <div>
                {Object.keys(selectedPackage.details).map((day) => (
                  <div key={day} className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{day}</h3>
                    <div className="flex flex-wrap justify-center items-center gap-2 text-gray-600 text-sm font-medium">
                      {selectedPackage.details[day].map((activity, index) => (
                        <React.Fragment key={index}>
                          <span className="px-2">{activity}</span>
                          {index !== selectedPackage.details[day].length - 1 && (
                            <span className="text-gray-400">|</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Close Button */}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setSelectedPackage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Packages;
