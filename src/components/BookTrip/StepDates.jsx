"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function StepDates({ data, updateData, onNext, onBack }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const selectedDates = data.dates || [];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(viewMonth, viewYear);
  const firstDay = getFirstDayOfMonth(viewMonth, viewYear);

  const isSameDate = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isSelected = (date) => selectedDates.some((d) => isSameDate(new Date(d), date));

  const isInRange = (date) => {
    if (selectedDates.length === 0) return false;
    const sorted = [...selectedDates].map((d) => new Date(d).getTime()).sort((a, b) => a - b);
    const time = date.getTime();
    return time >= sorted[0] && time <= sorted[sorted.length - 1];
  };

  const handleDateClick = (day) => {
    const clicked = new Date(viewYear, viewMonth, day);
    if (clicked < today) return;

    if (data.days === 1) {
      updateData("dates", [clicked.toISOString()]);
      return;
    }

    // Auto-select consecutive days starting from clicked date
    const dates = [];
    for (let i = 0; i < data.days; i++) {
      const d = new Date(clicked);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString());
    }
    updateData("dates", dates);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Select your travel dates
      </h2>
      <p className="text-gray-500 mb-6">
        Pick your start date — we&apos;ll auto-select {data.days} consecutive {data.days === 1 ? "day" : "days"}
      </p>

      {/* Calendar */}
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="font-bold text-lg text-gray-800">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Next month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {DAY_NAMES.map((d) => (
            <div key={d} className="text-xs font-semibold text-gray-500 py-2">
              {d}
            </div>
          ))}

          {/* Empty cells for first day offset */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Date cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(viewYear, viewMonth, day);
            const isPast = date < today;
            const selected = isSelected(date);
            const inRange = isInRange(date);

            return (
              <motion.button
                key={day}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDateClick(day)}
                disabled={isPast}
                className={`h-10 w-full rounded-lg text-sm font-medium transition-all ${
                  isPast
                    ? "text-gray-300 cursor-not-allowed"
                    : selected
                    ? "bg-green-600 text-white shadow-md"
                    : inRange
                    ? "bg-green-100 text-green-800"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >
                {day}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected dates display */}
      {selectedDates.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Selected dates:</p>
          <p className="font-semibold text-green-700">
            {formatDate(selectedDates[0])} — {formatDate(selectedDates[selectedDates.length - 1])}
          </p>
        </div>
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
          disabled={selectedDates.length === 0}
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
