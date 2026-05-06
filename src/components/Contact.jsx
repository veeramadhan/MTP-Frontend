"use client";

import { Link } from "react-scroll";
import Image from "next/image";

export const Contact = () => {
  return (
    <section id="contact" className="w-full bg-gray-900 text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold">MTP</h2>
          <p className="mt-2">Want To Take Tour Packages?</p>
          <Link
            to="packages"
            smooth={true}
            duration={500}
            className="inline-block mt-4 bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-600 transition-colors"
          >
            Book A Tour
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="home" smooth={true} duration={500} className="hover:text-green-400 cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link to="destination" smooth={true} duration={500} className="hover:text-green-400 cursor-pointer">
                Destination
              </Link>
            </li>
            <li>
              <Link to="about-us" smooth={true} duration={500} className="hover:text-green-400 cursor-pointer">
                About Us
              </Link>
            </li>
            <li>
              <Link to="contact" smooth={true} duration={500} className="hover:text-green-400 cursor-pointer">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold">More Inquiry</h3>
          <p className="mt-2">
            📞 Call/WhatsApp:{" "}
            <a href="tel:6380007962" className="hover:text-green-400">6380007962</a> |{" "}
            <a href="tel:9578904139" className="hover:text-green-400">9578904139</a> |{" "}
            <a href="tel:8778070061" className="hover:text-green-400">8778070061</a>
          </p>
          <p className="mt-2">
            📧{" "}
            <a href="mailto:maduraitourplanner@gmail.com" className="hover:text-green-400">
              maduraitourplanner@gmail.com
            </a>
          </p>
          <p className="mt-2">📍 Trichy | Madurai | Chennai</p>
        </div>

        {/* Additional Info */}
        <div>
          <h3 className="text-xl font-semibold">We Are Here</h3>
          <p className="mt-2">
            Explore the best destinations with us. Make your journey memorable.
          </p>
          <h3 className="text-xl font-semibold mt-4">Payment Partners</h3>
          <div className="flex gap-2 mt-2">
            <span className="bg-white px-3 py-1 rounded">
              <Image src="/assets/images/upi.jpg" alt="UPI" width={40} height={24} className="h-6 w-auto" />
            </span>
            <span className="bg-white px-3 py-1 rounded">
              <Image src="/assets/images/gpay.jpg" alt="GPay" width={40} height={24} className="h-6 w-auto" />
            </span>
            <span className="bg-white px-3 py-1 rounded">
              <Image src="/assets/images/phonepe.png" alt="PhonePe" width={40} height={24} className="h-6 w-auto" />
            </span>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>
          &copy; Copyright {new Date().getFullYear()} MTP | Design By{" "}
          <span className="text-green-400">veeramanikandan</span>
        </p>
        <p className="mt-2">
          <a href="#" className="hover:text-green-400">Privacy Policy</a> &bull;{" "}
          <a href="#" className="hover:text-green-400">Terms &amp; Conditions</a>
        </p>
      </div>
    </section>
  );
};
