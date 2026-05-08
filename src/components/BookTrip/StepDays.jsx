"use client";

import { motion } from "framer-motion";

export default function StepDays({ data, updateData, onNext, onBack }) {
  const handleSelect = (days) => {
    updateData("days", days);
    // Reset dates and daily places when days change
    updateData("dates", []);
    updateData("dailyPlaces", {});
    updateData("activities", []);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        How many days are you planning?
      </h2>
      <p className="text-gray-500 mb-8">Select the duration of your trip</p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-lg mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((day) => (
          <motion.button
            key={day}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: day * 0.03 }}
            onClick={() => handleSelect(day)}
            className={`h-16 w-full rounded-xl border-2 text-center font-bold text-lg transition-all hover:shadow-md ${
              data.days === day
                ? "border-green-500 bg-green-50 text-green-700 shadow-md"
                : "border-gray-200 text-gray-700 hover:border-green-300"
            }`}
          >
            {day}
            <span className="block text-xs font-normal text-gray-500">
              {day === 1 ? "day" : "days"}
            </span>
          </motion.button>
        ))}
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
