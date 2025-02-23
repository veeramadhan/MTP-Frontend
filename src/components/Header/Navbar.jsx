import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import { Facebook, Instagram, Youtube, Send } from "lucide-react";
import mtp from "../../assets/logo/mtp.png";


export const Navbar = () => {
  const [nav, setNav] = useState(false);

  return (
    <>
      <div className="bg-[#222] py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-sm">
            <a href="mailto:info@example.com" className="flex items-center hover:text-green-400 transition-colors">
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
              <Link to="home" smooth={true} duration={500} className="text-gray-700 hover:text-green-600 cursor-pointer">Home</Link>
              <Link to="destination" smooth={true} duration={500} className="text-gray-700 hover:text-green-600 cursor-pointer">Destination</Link>
              <Link to="gallery" smooth={true} duration={500} className="text-gray-700 hover:text-green-600 cursor-pointer">Gallery</Link>
              <Link to="About" smooth={true} duration={500} className="text-gray-700 hover:text-green-600 cursor-pointer">About us </Link>
              <Link to="contact" smooth={true} duration={500} className="text-gray-700 hover:text-green-600 cursor-pointer">Contact</Link>
            </div>
            <div className="md:hidden">
              <button onClick={() => setNav(!nav)} className="text-gray-700">
                {nav ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {nav && (
          <div className="md:hidden bg-white border-t border-gray-200 flex flex-col items-center space-y-4 py-4">
            <Link to="home" smooth={true} duration={500} className="text-gray-700 hover:text-green-600 cursor-pointer">Home</Link>
            <Link to="destination" smooth={true} duration={500} className="text-gray-700 hover:text-green-600 cursor-pointer">Destination</Link>
            <Link to="gallery" smooth={true} duration={500} className="text-gray-700 hover:text-green-600 cursor-pointer">Gallery</Link>
            <Link to="About" smooth={true} duration={500} className="text-gray-700 hover:text-green-600 cursor-pointer">About us </Link>
            <Link to="contact" smooth={true} duration={500} className="text-gray-700 hover:text-green-600 cursor-pointer">Contact</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
