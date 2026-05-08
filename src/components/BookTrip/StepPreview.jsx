"use client";

import { motion } from "framer-motion";
import { generateTripPDF } from "@/lib/generatePDF";

const CATEGORY_LABELS = {
  family: "Family Trip",
  friends: "Friends Trip",
  college: "College Trip",
  industrial: "Industrial Visit",
  corporate: "Corporate Trip",
  gang: "Gang Trip",
  honeymoon: "Honeymoon",
  couple: "Couple Trip",
};

const ACTIVITY_LABELS = {
  campfire: "🔥 Campfire",
  boating: "🚣 Boating",
  trekking: "🥾 Trekking",
  waterfall: "💦 Waterfall Visit",
  safari: "🦁 Wildlife Safari",
  zipline: "🪂 Zip Line",
  cycling: "🚴 Cycling",
  photography: "📷 Photography Tour",
  cooking: "🍳 Local Cooking",
  temple: "🛕 Temple Visit",
  snorkeling: "🤿 Snorkeling",
  paragliding: "🪂 Paragliding",
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function StepPreview({ data, onBack }) {
  const formatDate = (iso) => {
    const d = new Date(iso);
    return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
  };

  const handleDownloadPDF = () => {
    generateTripPDF(data, CATEGORY_LABELS, ACTIVITY_LABELS);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Trip Summary
      </h2>
      <p className="text-gray-500 mb-6">Review your trip plan before downloading</p>

      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
        {/* Trip Type */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-4"
        >
          <h3 className="text-sm font-medium text-green-600 mb-1">Trip Category</h3>
          <p className="text-lg font-bold text-gray-800">
            {CATEGORY_LABELS[data.category] || data.category}
          </p>
        </motion.div>

        {/* Duration & Dates */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4"
        >
          <h3 className="text-sm font-medium text-blue-600 mb-1">Duration & Dates</h3>
          <p className="text-lg font-bold text-gray-800">
            {data.days} {data.days === 1 ? "Day" : "Days"}
          </p>
          {data.dates.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {formatDate(data.dates[0])} — {formatDate(data.dates[data.dates.length - 1])}
            </p>
          )}
        </motion.div>

        {/* Members */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-purple-50 border border-purple-200 rounded-xl p-4"
        >
          <h3 className="text-sm font-medium text-purple-600 mb-1">Group Size</h3>
          <p className="text-lg font-bold text-gray-800">
            {data.adults + data.children} Members
          </p>
          <p className="text-sm text-gray-600">
            {data.adults} Adult{data.adults > 1 ? "s" : ""}
            {data.children > 0 && `, ${data.children} Child${data.children > 1 ? "ren" : ""}`}
          </p>
        </motion.div>

        {/* Daily Places */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-orange-50 border border-orange-200 rounded-xl p-4"
        >
          <h3 className="text-sm font-medium text-orange-600 mb-2">Itinerary</h3>
          {Object.entries(data.dailyPlaces).map(([dayKey, places]) => (
            <div key={dayKey} className="mb-3 last:mb-0">
              <p className="font-semibold text-gray-800 text-sm">
                {dayKey.replace("day", "Day ")}
              </p>
              {places.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {places.map((place) => (
                    <span
                      key={place}
                      className="bg-white px-2 py-1 rounded text-xs text-gray-700 border"
                    >
                      {place}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 mt-1">No places selected</p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Activities */}
        {data.activities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
          >
            <h3 className="text-sm font-medium text-yellow-700 mb-2">Activities</h3>
            <div className="flex flex-wrap gap-2">
              {data.activities.map((act) => (
                <span
                  key={act}
                  className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border"
                >
                  {ACTIVITY_LABELS[act] || act}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={onBack}
          className="text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          ← Back
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
}
