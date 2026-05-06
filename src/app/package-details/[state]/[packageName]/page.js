"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaHotel,
  FaBus,
  FaUserTie,
  FaUtensils,
  FaSuitcaseRolling,
} from "react-icons/fa";
import HomeLayout from "@/components/HomeLayout";
import TalkWithUs from "@/components/TalkWithUs";
import Loader from "@/components/Loader";
import API_URL from "@/lib/config";

export default function PackagePage() {
  const params = useParams();
  const { state, packageName } = params;
  const router = useRouter();
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("tripDetails");

  const fetchPackage = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `${API_URL}/get-package-details/${encodeURIComponent(state)}/${encodeURIComponent(packageName)}`
      );
      if (!res.ok) throw new Error("Package not found");
      const data = await res.json();
      setPackageDetails(data.package);
    } catch (err) {
      setError(err.message || "Failed to load package details");
    } finally {
      setLoading(false);
    }
  }, [state, packageName]);

  useEffect(() => {
    if (state && packageName) {
      fetchPackage();
    }
  }, [state, packageName, fetchPackage]);

  const navLinks = [];

  if (loading) {
    return (
      <HomeLayout navLinks={navLinks}>
        <div className="min-h-[60vh] flex items-center justify-center bg-green-50">
          <Loader />
        </div>
      </HomeLayout>
    );
  }

  if (error || !packageDetails) {
    return (
      <>
        <HomeLayout navLinks={navLinks}>
          <div className="min-h-[60vh] flex flex-col items-center justify-center bg-green-50 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {error || "Package not found"}
            </h2>
            <div className="flex gap-4">
              <button
                onClick={fetchPackage}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/")}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Go Home
              </button>
            </div>
          </div>
        </HomeLayout>
        <TalkWithUs />
      </>
    );
  }

  return (
    <>
      <HomeLayout navLinks={navLinks}>
        <section className="relative w-full bg-gray-50">
          <div className="relative w-full h-[40vh] md:h-[50vh]">
            {packageDetails.image ? (
              <img
                src={packageDetails.image}
                alt={packageDetails.title || "Package"}
                className="w-full h-full object-cover brightness-75"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-lg">No image available</span>
              </div>
            )}
            <button
              className="absolute top-4 left-4 md:top-6 md:left-6 bg-white bg-opacity-70 px-3 md:px-4 py-1 md:py-2 rounded-full shadow-md text-gray-900 font-semibold hover:bg-opacity-90 z-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => router.back()}
            >
              ← Back
            </button>

            <h2 className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white text-2xl md:text-4xl font-bold">
              {packageDetails.title}
            </h2>
          </div>
          <div className="max-w-8xl bg-green-50 mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="w-full md:w-3/5">
              <div className="text-left mb-6">
                <p className="text-gray-700 text-lg md:text-2xl font-semibold">
                  {packageDetails.location}
                </p>
                <p className="text-gray-500 text-sm md:text-lg">
                  {packageDetails.duration}
                </p>
              </div>

              {packageDetails.details && (
                <div className="flex flex-col gap-4 md:gap-6">
                  {Object.keys(packageDetails.details).map((day, index) => (
                    <div
                      key={day}
                      className="bg-gray-50 rounded-xl shadow-md border border-gray-300 p-4 md:p-6"
                    >
                      <h3 className="text-lg md:text-2xl font-semibold flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <span className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-lg shadow">
                          Day {index + 1}
                        </span>
                      </h3>

                      <div className="flex flex-wrap gap-2 md:gap-4">
                        {packageDetails.details[day].map((place, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-900 px-3 md:px-5 py-2 md:py-3 rounded-lg shadow-sm text-sm md:text-lg font-medium"
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

            <div className="w-full md:w-2/5 bg-white shadow-lg rounded-xl p-4 md:p-6 border border-gray-200 h-fit">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">
                Explore More
              </h3>
              <div className="flex flex-row gap-2 md:gap-4" role="tablist">
                {["tripDetails", "map", "faq"].map((section) => (
                  <button
                    key={section}
                    role="tab"
                    aria-selected={activeSection === section}
                    className={`w-full text-center py-2 md:py-3 px-4 rounded-lg shadow text-sm md:text-base transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      activeSection === section
                        ? "bg-blue-700 text-white font-semibold"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveSection(section)}
                  >
                    {section === "tripDetails"
                      ? "Trip Details"
                      : section === "map"
                      ? "View Map"
                      : "FAQ"}
                  </button>
                ))}
              </div>

              {activeSection === "tripDetails" && (
                <div className="mt-4 md:mt-6 bg-gray-100 p-4 md:p-6 rounded-xl shadow-md border border-gray-300" role="tabpanel">
                  <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">
                    Trip Details
                  </h3>
                  <ul className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                    <li className="flex items-center gap-2 md:gap-3 text-gray-700">
                      <FaHotel className="text-blue-600 text-lg" /> Accommodation
                    </li>
                    <li className="flex items-center gap-2 md:gap-3 text-gray-700">
                      <FaBus className="text-blue-600 text-lg" /> Transportation
                    </li>
                    <li className="flex items-center gap-2 md:gap-3 text-gray-700">
                      <FaUserTie className="text-blue-600 text-lg" /> Guide
                    </li>
                    <li className="flex items-center gap-2 md:gap-3 text-gray-700">
                      <FaSuitcaseRolling className="text-blue-600 text-lg" /> Trip
                      Type: {packageDetails.tripType || "Family, Couple, Education"}
                    </li>
                    <li className="flex items-center gap-2 md:gap-3 text-gray-700">
                      <FaUtensils className="text-blue-600 text-lg" /> Food
                    </li>
                  </ul>
                </div>
              )}

              {activeSection === "map" && (
                <div className="mt-4 md:mt-6 px-4 md:px-6 pb-6" role="tabpanel">
                  <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                    Location
                  </h3>
                  <div className="w-full h-[250px] md:h-[400px]">
                    <iframe
                      src={packageDetails.mapEmbedUrl}
                      title={`Map of ${packageDetails.location || "destination"}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg shadow-lg"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </HomeLayout>
      <TalkWithUs />
    </>
  );
}
