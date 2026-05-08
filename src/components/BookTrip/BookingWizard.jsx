"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepCategory from "./StepCategory";
import StepDays from "./StepDays";
import StepDates from "./StepDates";
import StepMembers from "./StepMembers";
import StepPlaces from "./StepPlaces";
import StepActivities from "./StepActivities";
import StepPreview from "./StepPreview";

const STEPS = [
  { id: 1, label: "Trip Type" },
  { id: 2, label: "Duration" },
  { id: 3, label: "Dates" },
  { id: 4, label: "Members" },
  { id: 5, label: "Places" },
  { id: 6, label: "Activities" },
  { id: 7, label: "Preview" },
];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
};

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [bookingData, setBookingData] = useState({
    category: "",
    days: 1,
    dates: [],
    adults: 1,
    children: 0,
    dailyPlaces: {},   // { day1: [place1, place2], day2: [...] }
    activities: [],
  });

  const updateData = (key, value) => {
    setBookingData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 7));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const goToStep = (step) => {
    if (step < currentStep) {
      setDirection(-1);
      setCurrentStep(step);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepCategory data={bookingData} updateData={updateData} onNext={nextStep} />;
      case 2:
        return <StepDays data={bookingData} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <StepDates data={bookingData} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <StepMembers data={bookingData} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <StepPlaces data={bookingData} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 6:
        return <StepActivities data={bookingData} updateData={updateData} onNext={nextStep} onBack={prevStep} />;
      case 7:
        return <StepPreview data={bookingData} onBack={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px] px-4">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={step.id > currentStep}
                  className={`flex flex-col items-center gap-1 transition-all ${
                    step.id <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      step.id === currentStep
                        ? "bg-green-600 text-white scale-110 shadow-lg"
                        : step.id < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.id < currentStep ? "✓" : step.id}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      step.id === currentStep ? "text-green-700" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-1 ${
                      step.id < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 min-h-[500px] relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
