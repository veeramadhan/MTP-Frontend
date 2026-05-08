"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API_URL from "@/lib/config";
import Loader from "@/components/Loader";

export default function StepPlaces({ data, updateData, onNext, onBack }) {
  const [availablePlaces, setAvailablePlaces] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(1);

  const dailyPlaces = data.dailyPlaces || {};

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch(`${API_URL}/places`);
        if (!res.ok) throw new Error("Failed to load places");
        const result = await res.json();
        const placesData = result.places?.[0] || {};
        // Flatten all places from all states
        const allPlaces = {};
        Object.entries(placesData).forEach(([state, stateData]) => {
          if (state === "_id") return;
          Object.values(stateData).flat().forEach((pkg) => {
            if (pkg.title && !allPlaces[pkg.title]) {
              allPlaces[pkg.title] = {
                title: pkg.title,
                location: pkg.location || state,
                image: pkg.image,
                duration: pkg.duration,
                state,
              };
            }
          });
        });
        setAvailablePlaces(allPlaces);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const togglePlace = (placeTitle) => {
    const dayKey = `day${activeDay}`;
    const current = dailyPlaces[dayKey] || [];
    const updated = current.includes(placeTitle)
      ? current.filter((p) => p !== placeTitle)
      : [...current, placeTitle];
    updateData("dailyPlaces", { ...dailyPlaces, [dayKey]: updated });
  };

  const isPlaceSelected = (placeTitle) => {
    const dayKey = `day${activeDay}`;
    return (dailyPlaces[dayKey] || []).includes(placeTitle);
  };

  const isPlaceSelectedOtherDay = (placeTitle) => {
    return Object.entries(dailyPlaces).some(
      ([key, places]) => key !== `day${activeDay}` && places.includes(placeTitle)
    );
  };

  const placesArray = Object.values(availablePlaces);

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
        Select destinations you want to visit on each day
      </p>

      {/* Day tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Array.from({ length: data.days }).map((_, i) => {
          const dayKey = `day${i + 1}`;
          const count = (dailyPlaces[dayKey] || []).length;
          return (
            <button
              key={i}
              onClick={() => setActiveDay(i + 1)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
                activeDay === i + 1
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Day {i + 1}
              {count > 0 && (
                <span className="ml-2 bg-white bg-opacity-30 text-xs px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Places grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[350px] overflow-y-auto pr-2">
        {placesArray.map((place, i) => {
          const selected = isPlaceSelected(place.title);
          const otherDay = isPlaceSelectedOtherDay(place.title);
          return (
            <motion.button
              key={place.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => togglePlace(place.title)}
              disabled={otherDay}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                selected
                  ? "border-green-500 bg-green-50"
                  : otherDay
                  ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <div className="flex items-center gap-3">
                {place.image && (
                  <img
                    src={place.image}
                    alt={place.title}
                    className="w-12 h-12 rounded-lg object-cover"
                    loading="lazy"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-sm text-gray-800 truncate">
                    {place.title}
                  </p>
                  <p className="text-xs text-gray-500">{place.location}</p>
                </div>
              </div>
              {selected && (
                <span className="text-green-600 text-xs font-semibold mt-1 block">
                  ✓ Selected
                </span>
              )}
              {otherDay && (
                <span className="text-gray-400 text-xs mt-1 block">
                  Added to another day
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

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
