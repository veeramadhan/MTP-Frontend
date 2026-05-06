"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <h1 className="text-6xl font-bold text-green-700 mb-4">Oops!</h1>
      <p className="text-xl text-gray-600 mb-2">Something went wrong.</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={() => reset()}
        className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Try Again
      </button>
    </div>
  );
}
