import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import { generateSlug } from "../utils/generateSlug";
import { motion } from "framer-motion";

export const Packages = () => {
  const [packages, setPackages] = useState({});
  const [activeTab, setActiveTab] = useState("Kerala");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("https://mtp-backend-45q8.onrender.com/places");
        const data = await response.json();
        setPackages(data.places[0] || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page when tab changes
  }, [activeTab]);

  const isValidTab =
    packages && packages[activeTab] && Object.keys(packages[activeTab]).length > 0;

  const allPackages = isValidTab ? Object.values(packages[activeTab]).flat() : [];
  const totalPages = Math.ceil(allPackages.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = allPackages.slice(indexOfFirstCard, indexOfLastCard);


  return (
    <section
      id="packages"
      className="w-full pt-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-green-50 flex flex-col items-center scroll-mt-20"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <motion.h2
            className="text-center text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            Tourist Attractions
          </motion.h2>

          {/* Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: false }}
          >
            {Object.keys(packages)
              .filter((tab) => tab !== "_id")
              .map((tab) => (
                <button
                  key={tab}
                  className={`px-4 sm:px-6 py-2 text-sm sm:text-lg rounded-md transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "bg-white text-black border"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
          </motion.div>

          {/* Packages Grid with Animations */}
          {isValidTab && (
            <>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {currentCards.map((pkg, index) => (
                  <motion.div
                    key={`${pkg.id}-${index}`}
                    className="w-80 sm:w-96 h-[380px] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.2 }}
                  >
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-center text-xs sm:text-sm mb-2">
                        <span className="bg-black text-white px-2 py-1 rounded">
                          {pkg.duration}
                        </span>
                        <span className="text-green-600 font-semibold">
                          {pkg.location}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {pkg.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {pkg.route}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <p className="text-green-600 font-bold">{pkg.price}</p>
                       <button
                        className="bg-green-600 text-white px-4 py-2 text-sm rounded-lg transition-all hover:bg-blue-700"
                        onClick={() => navigate(`/package-details/${activeTab}/${pkg.key}`)}>Explore</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.nav
                  className="mt-10"
                  aria-label="Page navigation"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false }}
                >
                  <ul className="inline-flex -space-x-px text-sm">
                    {/* Prev */}
                    <li>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center w-8 h-8 rounded-s-lg border border-gray-300 ${
                          currentPage === 1
                            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                            : "text-gray-600 bg-white hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 6 10"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 1 1 5l4 4"
                          />
                        </svg>
                      </button>
                    </li>

                    {/* Pages */}
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i}>
                        <button
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-8 h-8 border border-gray-300 ${
                            currentPage === i + 1
                              ? "bg-black text-white"
                              : "bg-white text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}

                    {/* Next */}
                    <li>
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center w-8 h-8 rounded-e-lg border border-gray-300 ${
                          currentPage === totalPages
                            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                            : "text-gray-600 bg-white hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 6 10"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m1 1 4 4-4 4"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </motion.nav>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};
