import { Link } from "react-scroll";
import { Facebook, Instagram, Youtube, Send } from "lucide-react";
import mtp from "../../assets/logo/mtp.png";

import upi from "../../assets/images/upi.jpg";
import gpay from "../../assets/images/gpay.jpg";
import phonepe from "../../assets/images/phonepe.png";

const HomeLayout = ({ navLinks, children }) => {
  return (
    <div>
      <header>
        <div className="bg-[#222] py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-white text-sm">
              <a
                href="mailto:info@example.com"
                className="flex items-center hover:text-green-400 transition-colors"
              >
                <Send className="h-5 w-5" />
                <span className="ml-2">maduraitourplanner@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/share/18Z2GVoadZ/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/madurai_tourplanner/?igsh=MTlqcnI2MXpkdzUzeQ%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.youtube.com/@MaduraiTourPlanner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </a>
            </div>
          </div>
        </div>
        <nav className="bg-white shadow-md w-full fixed top-0 z-50 sticky">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <img src={mtp} alt="Logo" className="h-40" />
              </div>
              <div className="hidden md:flex space-x-6">
                {navLinks.map((value, key) => (
                  <Link
                  key={value.key} 
                    to={value.key}
                    smooth={true}
                    duration={500}
                    className="text-gray-700 hover:text-green-600  cursor-pointer text-xl"
                  >
                    {value.value}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="md:hidden bg-white border-t border-gray-200 flex flex-col items-center space-y-4  py-4">
            {navLinks.map((value, key) => (
              <Link
                key={value.key} 
                to={value.key}
                smooth={true}
                duration={500}
                className="text-gray-700 hover:text-green-600  cursor-pointer text-xl"
              >
                {value.value}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {children}

      <footer className="w-full bg-gray-900 text-white py-10 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            {/* <img src={mtp} alt="MTP Logo" className="h-16 mb-2 " /> */}
            <h2 className="text-2xl font-bold">MTP</h2>
            <p className="mt-2">Want To Take Tour Packages?</p>

            <Link to="packages" smooth={true} duration={500}>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
                {" "}
                Book A Tour
              </button>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#home" className="hover:text-green-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#destination" className="hover:text-green-400">
                  Destination
                </a>
              </li>
              {/* <li><a href="#gallery" className="hover:text-green-400">Gallery</a></li> */}
              <li>
                <a href="#about" className="hover:text-green-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-green-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold">More Inquiry</h3>
            <p className="mt-2">
              📞 Call/WhatsApp: 6380007962 | 9578904139 | 8778070061
            </p>
            <p className="mt-2">📧 maduraitourplanner@gmail.com</p>
            <p className="mt-2">📍 Trichy | Madurai | Chennai</p>
          </div>
          {/* Additional Info */}
          <div>
            <h3 className="text-xl font-semibold">We Are Here</h3>
            <p className="mt-2">
              Explore the best destinations with us. Make your journey
              memorable.
            </p>
            <h3 className="text-xl font-semibold mt-4">Payment Partners</h3>
            <div className="flex gap-2 mt-2">
              <span className="bg-white px-3 py-1 rounded">
                <img src={upi} alt="Visa" className="h-6" />
              </span>
              <span className="bg-white px-3 py-1 rounded">
                <img src={gpay} alt="Visa" className="h-6" />
              </span>
              <span className="bg-white px-3 py-1 rounded">
                <img src={phonepe} alt="Visa" className="h-6" />
              </span>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          <p>
            © Copyright 2025 MTP | Design By{" "}
            <span className="text-green-400">veeramanikandan</span>
          </p>
          <p className="mt-2">
            <a href="#" className="hover:text-green-400">
              Privacy Policy
            </a>{" "}
            •{" "}
            <a href="#" className="hover:text-green-400">
              Terms & Conditions
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomeLayout;
