"use client";

import { motion } from "framer-motion";

const categories = [
  { id: "family", label: "Family Trip", icon: "👨‍👩‍👧‍👦", desc: "Perfect for families with kids" },
  { id: "friends", label: "Friends Trip", icon: "🎉", desc: "Fun adventures with your squad" },
  { id: "college", label: "College Trip", icon: "🎓", desc: "Educational & fun group tours" },
  { id: "industrial", label: "Industrial Visit", icon: "🏭", desc: "Corporate learning experiences" },
  { id: "corporate", label: "Corporate Trip", icon: "💼", desc: "Team building & retreats" },
  { id: "gang", label: "Gang Trip", icon: "🤘", desc: "Adventure with your gang" },
  { id: "honeymoon", label: "Honeymoon", icon: "💑", desc: "Romantic getaways for couples" },
  { id: "couple", label: "Couple Trip", icon: "❤️", desc: "Special moments together" },
];

export default function StepCategory({ data, updateData, onNext }) {
  const handleSelect = (id) => {
    updateData("category", id);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        What type of trip are you planning?
      </h2>
      <p className="text-gray-500 mb-8">Select your trip category to get started</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleSelect(cat.id)}
            className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-lg ${
              data.category === cat.id
                ? "border-green-500 bg-green-50 shadow-md"
                : "border-gray-200 hover:border-green-300"
            }`}
          >
            <span className="text-3xl block mb-2">{cat.icon}</span>
            <p className="font-semibold text-sm text-gray-800">{cat.label}</p>
            <p className="text-xs text-gray-500 mt-1">{cat.desc}</p>
          </motion.button>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!data.category}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
