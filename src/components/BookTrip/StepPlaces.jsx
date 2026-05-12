"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API_URL from "@/lib/config";
import Loader from "@/components/Loader";

export default function StepPlaces({ data, updateData, onNext, onBack }) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spotsLoading, setSpotsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(1);

  // data.dailyPlaces structure:
  // { day1: { package: { title, state, key, image, location }, spots: ["Jeep Safari", "Rose Garden"] },
  //   day2: { package: {...}, spots: [...] } }
  const dailyPlaces = data.dailyPlaces || {};

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${API_URL}/booking/places`);
        if (!res.ok) throw new Error("Failed to load packages");
        const result = await res.json();
        setPackages(result.places || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const currentDayData = dailyPlaces[`day${activeDay}`] || null;
  const selectedPackage = currentDayData?.package || null;
  const selectedSpots = currentDayData?.spots || [];

  // Fetch package details (spots for each day)
  const selectPackage = useCallback(async (pkg) => {
    const dayKey = `day${activeDay}`;

    // If same package clicked, deselect
    if (selectedPackage?.title === pkg.title) {
      const updated = { ...dailyPlaces };
      delete updated[dayKey];
      updateData("dailyPlaces", updated);
      return;
    }

    setSpotsLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/get-package-details/${encodeURIComponent(pkg.state)}/${encodeURIComponent(pkg.id)}`
      );
      if (!res.ok) throw new Error("Failed to load package details");
      const result = await res.json();
      const details = result.package?.details || {};

      // Flatten all spots from all days in the package
      const allSpots = [];
      Object.values(details).forEach((daySpots) => {
        if (Array.isArray(daySpots)) {
          daySpots.forEach((spot) => {
            if (!allSpots.includes(spot)) allSpots.push(spot);
          });
        }
      });

      updateData("dailyPlaces", {
        ...dailyPlaces,
        [dayKey]: {
          package: {
            title: pkg.title,
            state: pkg.state,
            key: pkg.id,
            image: pkg.image,
            location: pkg.location,
          },
          spots: allSpots, // Auto-select all spots
          allSpots, // Keep full list for toggling
        },
      });
    } catch (err) {
      console.error("Error fetching package details:", err);
    } finally {
      setSpotsLoading(false);
    }
  }, [activeDay, dailyPlaces, selectedPackage, updateData]);

  const toggleSpot = (spot) => {
    const dayKey = `day${activeDay}`;
    const current = dailyPlaces[dayKey];
    if (!current) return;

    const updatedSpots = current.spots.includes(spot)
      ? current.spots.filter((s) => s !== spot)
      : [...current.spots, spot];

    updateData("dailyPlaces", {
      ...dailyPlaces,
      [dayKey]: { ...current, spots: updatedSpots },
    });
  };

  const isPackageUsedOtherDay = (pkgTitle) => {
    return Object.entries(dailyPlaces).some(
      ([key, val]) => key !== `day${activeDay}` && val?.package?.title === pkgTitle
    );
  };

  const filteredPackages = packages.filter((pkg) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      pkg.title.toLowerCase().includes(q) ||
      pkg.location.toLowerCase().includes(q) ||
      pkg.state.toLowerCase().includes(q) ||
      (pkg.route || "").toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Choose places for each day
      </h2>
      <p className="text-gray-500 mb-6">
        Select a package for each day, then pick the spots you want to visit
      </p>

      {/* Day tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
        {Array.from({ length: data.days }).map((_, i) => {
          const dayKey = `day${i + 1}`;
          const dayData = dailyPlaces[dayKey];
          const hasPackage = !!dayData?.package;
          return (
            <button
              key={i}
              onClick={() => setActiveDay(i + 1)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
                activeDay === i + 1
                  ? "bg-green-600 text-white shadow-md"
                  : hasPackage
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Day {i + 1}
              {hasPackage && <span className="ml-1">✓</span>}
            </button>
          );
        })}
      </div>

      {/* If package selected for this day, show spots */}
      {selectedPackage ? (
        <div>
          {/* Selected package header */}
          <div className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            {selectedPackage.image && (
              <img
                src={selectedPackage.image}
                alt={selectedPackage.title}
                className="w-16 h-16 rounded-lg object-cover"
                loading="lazy"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-800">{selectedPackage.title}</p>
              <p className="text-sm text-gray-500">{selectedPackage.location} • {selectedPackage.state}</p>
            </div>
            <button
              onClick={() => {
                const updated = { ...dailyPlaces };
                delete updated[`day${activeDay}`];
                updateData("dailyPlaces", updated);
              }}
              className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition"
            >
              Change
            </button>
          </div>

          {/* Spots selection */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">
              Select spots to visit ({selectedSpots.length}/{currentDayData?.allSpots?.length || 0} selected)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const dayKey = `day${activeDay}`;
                  updateData("dailyPlaces", {
                    ...dailyPlaces,
                    [dayKey]: { ...currentDayData, spots: [...(currentDayData.allSpots || [])] },
                  });
                }}
                className="text-xs text-green-600 hover:text-green-800 font-medium"
              >
                Select All
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => {
                  const dayKey = `day${activeDay}`;
                  updateData("dailyPlaces", {
                    ...dailyPlaces,
                    [dayKey]: { ...currentDayData, spots: [] },
                  });
                }}
                className="text-xs text-gray-500 hover:text-gray-700 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 max-h-[280px] overflow-y-auto pr-2">
            <AnimatePresence>
              {(currentDayData?.allSpots || []).map((spot, i) => {
                const isSelected = selectedSpots.includes(spot);
                return (
                  <motion.button
                    key={spot}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => toggleSpot(spot)}
                    className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                      isSelected
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50"
                    }`}
                  >
                    {isSelected && <span className="mr-1">✓</span>}
                    {spot}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <>
          {/* Search bar */}
          <div className="relative mb-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search packages (e.g., Munnar, Kerala, Ooty...)"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {spotsLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader />
            </div>
          )}

          {!spotsLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[320px] overflow-y-auto pr-2">
              {filteredPackages.map((pkg, i) => {
                const usedOtherDay = isPackageUsedOtherDay(pkg.title);
                return (
                  <motion.button
                    key={`${pkg.id}-${pkg.title}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => selectPackage(pkg)}
                    disabled={usedOtherDay}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      usedOtherDay
                        ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
                        : "border-gray-200 hover:border-green-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {pkg.image && (
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-12 h-12 rounded-lg object-cover"
                          loading="lazy"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-gray-800 truncate">
                          {pkg.title}
                        </p>
                        <p className="text-xs text-gray-500">{pkg.location || pkg.state}</p>
                      </div>
                    </div>
                    {usedOtherDay && (
                      <span className="text-gray-400 text-xs mt-1 block">Used on another day</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}
        </>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
