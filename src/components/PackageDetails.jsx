import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PackageDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pkg = location.state?.pkg;

  if (!pkg) {
    return <div className="text-center text-xl font-bold">Package not found.</div>;
  }

  return (
    <section className="relative w-full bg-gray-50">
      {/* Full-Width Banner */}
      <div className="relative w-full h-[50vh]">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover brightness-75"
        />
        {/* Back Button Overlay */}
        <button
          className="absolute top-6 left-6 bg-white bg-opacity-70 px-4 py-2 rounded-full shadow-md text-gray-900 font-semibold hover:bg-opacity-90"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        {/* Title Overlay */}
        <h2 className="absolute bottom-6 left-6 text-white text-4xl font-bold">
          {pkg.title}
        </h2>
      </div>

      {/* Two-Column Layout */}
      <div className="max-w-8xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
        {/* Left Content (60%) - Itinerary */}
        <div className="w-full md:w-3/5">
          <div className="text-left mb-8">
            <p className="text-gray-700 text-2xl font-semibold">{pkg.location}</p>
            <p className="text-gray-500 text-lg">{pkg.duration}</p>
          </div>

          {/* Itinerary Section */}
          {pkg.details && (
            <div className="flex flex-col gap-6">
              {Object.keys(pkg.details).map((day, index) => (
                <div
                  key={day}
                  className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
                >
                  {/* Day Header */}
                  <h3 className="text-2xl font-semibold flex items-center gap-3 mb-4">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-lg shadow">
                      Day {index + 1}
                    </span>
                    
                  </h3>

                  {/* Places in Flex Format */}
                  <div className="flex flex-wrap gap-4">
                    {pkg.details[day].map((place, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-900 px-5 py-3 rounded-lg shadow-sm text-lg font-medium"
                      >
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Content (40%) - Trip Links */}
        <div className="w-full md:w-2/5 bg-white shadow-lg rounded-xl p-6 border border-gray-200 h-fit">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Explore More</h3>
          <div className="flex flex-row gap-4">
            <button className="w-full text-left bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700">
              Trip Details
            </button>
            <button className="w-full text-left bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700">
              View Map
            </button>
            <button className="w-full text-left bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700">
              FAQ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;
