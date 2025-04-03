import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [activeTab, setActiveTab] = useState("Tamil Nadu");
  const navigate = useNavigate();

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

  const isValidTab = packages && packages[activeTab] && Object.keys(packages[activeTab]).length > 0;

  return (
    <section  id="packages" className="w-full pt-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-green-50 flex flex-col items-center">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-6">Tourist Attractions</h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        {Object.keys(packages)
          .filter((tab) => tab !== "_id")
          .map((tab) => (
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

      {/* Destination-based Packages */}
      {isValidTab &&
        Object.keys(packages[activeTab]).map((destination) => (
          <div key={destination}>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 place-items-center w-full">
              {Array.isArray(packages[activeTab][destination]) &&
                packages[activeTab][destination].map((pkg) => (
                  <div
                    key={pkg.id}
                    className="w-80 sm:w-96 h-[380px] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col m-2"
                  >
                    <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-center text-xs sm:text-sm mb-2">
                        <span className="bg-black text-white px-2 py-1 rounded">{pkg.duration}</span>
                        <span className="text-green-600 font-semibold">{pkg.location}</span>
                      </div>
                      <h3 className="text-lg font-semibold line-clamp-2">{pkg.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2">{pkg.route}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <p className="text-green-600 font-bold">{pkg.price}</p>
                        <button
                          className="bg-green-600 text-white px-4 py-2 text-sm rounded-lg transition-all hover:bg-blue-700"
                          onClick={() => navigate(`/package-details/${pkg.id}`, { state: { pkg } })}
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
    </section>
  );
};

export default Packages;
 