"use client";

import { motion } from "framer-motion";

const ACTIVITIES = [
  { id: "campfire", label: "Campfire", icon: "🔥", desc: "Evening bonfire under the stars" },
  { id: "boating", label: "Boating", icon: "🚣", desc: "Peaceful lake or river boating" },
  { id: "trekking", label: "Trekking", icon: "🥾", desc: "Mountain and hill trekking" },
  { id: "waterfall", label: "Waterfall Visit", icon: "💦", desc: "Natural waterfall exploration" },
  { id: "safari", label: "Wildlife Safari", icon: "🦁", desc: "Jungle safari adventure" },
  { id: "zipline", label: "Zip Line", icon: "🪂", desc: "Thrilling zip line experience" },
  { id: "cycling", label: "Cycling", icon: "🚴", desc: "Scenic cycling routes" },
  { id: "photography", label: "Photography Tour", icon: "📷", desc: "Guided photo walks" },
  { id: "cooking", label: "Local Cooking", icon: "🍳", desc: "Traditional cooking class" },
  { id: "temple", label: "Temple Visit", icon: "🛕", desc: "Historical temple tours" },
  { id: "snorkeling", label: "Snorkeling", icon: "🤿", desc: "Underwater exploration" },
  { id: "paragliding", label: "Paragliding", icon: "🪂", desc: "Fly over scenic landscapes" },
];

export default function StepActivities({ data, updateData, onNext, onBack }) {
  const selectedActivities = data.activities || [];

  const toggleActivity = (id) => {
    const updated = selectedActivities.includes(id)
      ? selectedActivities.filter((a) => a !== id)
      : [...selectedActivities, id];
    updateData("activities", updated);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Add activities to your trip
      </h2>
      <p className="text-gray-500 mb-6">
        Select activities you&apos;d like to enjoy (optional)
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-2">
        {ACTIVITIES.map((activity, i) => {
          const selected = selectedActivities.includes(activity.id);
          return (
            <motion.button
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => toggleActivity(activity.id)}
              className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                selected
                  ? "border-green-500 bg-green-50 shadow-sm"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <span className="text-2xl block mb-1">{activity.icon}</span>
              <p className="font-semibold text-xs text-gray-800">{activity.label}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{activity.desc}</p>
              {selected && (
                <span className="text-green-600 text-xs font-bold mt-1 block">✓</span>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {selectedActivities.length} activities selected
        </p>
      </div>

      <div className="mt-6 flex justify-between">
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
          Preview Trip →
        </button>
      </div>
    </div>
  );
}
