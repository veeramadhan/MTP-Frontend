import React from "react";
import factory from "../../../assets/logo/factory.png";
import wedding from "../../../assets/logo/wedding.png";
import friends from "../../../assets/logo/friends.png";
import home from "../../../assets/logo/home.png";
import school from "../../../assets/logo/school.png";
import building from "../../../assets/logo/building.png";

const Information = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-12 text-start">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Popular things to do
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-lg transition-transform hover:scale-110 hover:shadow-2xl hover:shadow-gray-500 duration-300">
            <img src={factory} alt="Factory" className="h-16 w-16 object-cover" />
            <h3 className="text-lg font-semibold mt-4">Industrial Visit</h3>
          </div>

          <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-gray-500">

            <img src={wedding} alt="Factory" className="h-16 w-16 object-cover" />
            <h3 className="text-lg font-semibold mt-4">Couples Trip</h3>
          </div>
          <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-gray-500">

            <img src={school} alt="Factory" className="h-16 w-16 object-cover" />
            <h3 className="text-lg font-semibold mt-4">School Trip</h3>
          </div>
          <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-gray-500">

            <img src={home} alt="Factory" className="h-16 w-16 object-cover" />
            <h3 className="text-lg font-semibold mt-4">Family Trip</h3>
          </div>
          <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-gray-500">

            <img src={friends} alt="Factory" className="h-16 w-16 object-cover" />
            <h3 className="text-lg font-semibold mt-4">Friends Trip</h3>
          </div>
          <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-gray-500">

            <img src={building} alt="Factory" className="h-16 w-16 object-cover" />
            <h3 className="text-lg font-semibold mt-4">Company Trip</h3>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Why choose Tourz
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-orange-500 text-4xl">🎟️</span>
            <h3 className="text-lg font-semibold mt-4">Ultimate flexibility</h3>
            <p className="text-gray-600 mt-2">
              You're in control, with free cancellation and payment options to
              satisfy any plan or budget.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-orange-500 text-4xl">💡</span>
            <h3 className="text-lg font-semibold mt-4">Memorable experiences</h3>
            <p className="text-gray-600 mt-2">
              Browse and book tours and activities so incredible, you'll want to
              tell your friends.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-orange-500 text-4xl">💎</span>
            <h3 className="text-lg font-semibold mt-4">Quality at our core</h3>
            <p className="text-gray-600 mt-2">
              High-quality standards. Millions of reviews. A Tourz company.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-orange-500 text-4xl">🏆</span>
            <h3 className="text-lg font-semibold mt-4">Award-winning support</h3>
            <p className="text-gray-600 mt-2">
              New price? New plan? No problem. We're here to help, 24/7.
            </p>
          </div>
        </div>
      </div>

    </>
  );
};

export default Information;
