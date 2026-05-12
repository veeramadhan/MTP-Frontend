"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const [pdfLoading, setPdfLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Clean up blob URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePreviewPDF = async () => {
    setPreviewLoading(true);
    try {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = await generateTripPDF(data, CATEGORY_LABELS, ACTIVITY_LABELS, "preview");
      setPreviewUrl(url);
    } catch (err) {
      console.error("PDF preview failed:", err);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      await generateTripPDF(data, CATEGORY_LABELS, ACTIVITY_LABELS);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setPdfLoading(false);
    }
  };

  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
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
          {Object.entries(data.dailyPlaces).map(([dayKey, dayData]) => (
            <div key={dayKey} className="mb-3 last:mb-0">
              <p className="font-semibold text-gray-800 text-sm">
                {dayKey.replace("day", "Day ")}
                {dayData?.package?.title && (
                  <span className="text-green-600 ml-2">— {dayData.package.title}</span>
                )}
              </p>
              {dayData?.spots?.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {dayData.spots.map((spot) => (
                    <span
                      key={spot}
                      className="bg-white px-2 py-1 rounded text-xs text-gray-700 border"
                    >
                      {spot}
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
        <div className="flex gap-3">
          <button
            onClick={handlePreviewPDF}
            disabled={previewLoading}
            className="border-2 border-green-600 text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
          >
            {previewLoading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </>
            )}
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
          >
            {pdfLoading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex flex-col"
            onClick={closePreview}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold text-sm md:text-base">PDF Preview</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    handleDownloadPDF();
                    closePreview();
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
                <button
                  onClick={closePreview}
                  className="hover:bg-gray-700 rounded-lg p-1.5 transition"
                  aria-label="Close preview"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {/* PDF iframe */}
            <div
              className="flex-1 p-2 md:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={previewUrl}
                className="w-full h-full rounded-lg bg-white"
                title="PDF Preview"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
