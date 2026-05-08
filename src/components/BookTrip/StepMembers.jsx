"use client";

import { motion } from "framer-motion";

export default function StepMembers({ data, updateData, onNext, onBack }) {
  const increment = (key) => updateData(key, data[key] + 1);
  const decrement = (key) => {
    if (key === "adults" && data[key] <= 1) return;
    if (data[key] <= 0) return;
    updateData(key, data[key] - 1);
  };

  const total = data.adults + data.children;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        How many people are joining?
      </h2>
      <p className="text-gray-500 mb-8">Tell us about your group size</p>

      <div className="max-w-sm mx-auto space-y-6">
        {/* Adults */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between bg-gray-50 rounded-xl p-5"
        >
          <div>
            <p className="font-semibold text-gray-800 text-lg">Adults</p>
            <p className="text-sm text-gray-500">Age 13+</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => decrement("adults")}
              disabled={data.adults <= 1}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-green-500 hover:text-green-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              −
            </button>
            <span className="text-2xl font-bold text-gray-800 w-8 text-center">
              {data.adults}
            </span>
            <button
              onClick={() => increment("adults")}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-green-500 hover:text-green-600 transition"
            >
              +
            </button>
          </div>
        </motion.div>

        {/* Children */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between bg-gray-50 rounded-xl p-5"
        >
          <div>
            <p className="font-semibold text-gray-800 text-lg">Children</p>
            <p className="text-sm text-gray-500">Age 0–12</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => decrement("children")}
              disabled={data.children <= 0}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-green-500 hover:text-green-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              −
            </button>
            <span className="text-2xl font-bold text-gray-800 w-8 text-center">
              {data.children}
            </span>
            <button
              onClick={() => increment("children")}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-green-500 hover:text-green-600 transition"
            >
              +
            </button>
          </div>
        </motion.div>

        {/* Total */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center bg-green-50 rounded-xl p-4 border border-green-200"
        >
          <p className="text-sm text-green-600">Total Members</p>
          <p className="text-3xl font-bold text-green-700">{total}</p>
        </motion.div>
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
