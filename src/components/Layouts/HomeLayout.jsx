import { useState } from "react";
import { Link } from "react-scroll";
import { Facebook, Instagram, Youtube, Send, Menu, X } from "lucide-react";
import mtpm from "../../assets/logo/mtpm.png";
import upi from "../../assets/images/upi.jpg";
import gpay from "../../assets/images/gpay.jpg";
import phonepe from "../../assets/images/phonepe.png";

const HomeLayout = ({ navLinks, children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
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
        </header>
        <div>
        <nav className="bg-white shadow-md w-full  top-0 z-50 sticky">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <img src={mtpm} alt="Logo" className="h-40 w-auto md:w-52" />
              </div>

              {/* Desktop links */}
              <div className="hidden md:flex space-x-6">
                {navLinks.map((value) => (
                  <Link
                    key={value.key}
                    to={value.key}
                    smooth={true}
                    duration={500}
                    className="text-gray-700 hover:text-green-600 cursor-pointer text-xl"
                  >
                    {value.value}
                  </Link>
                ))}
              </div>

              {/* Hamburger menu */}
              <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-gray-700">
                  {isMobileMenuOpen ? (
                    <X className="h-8 w-8" />
                  ) : (
                    <Menu className="h-8 w-8" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 flex flex-col items-center space-y-4 py-4">
              {navLinks.map((value) => (
                <Link
                  key={value.key}
                  to={value.key}
                  smooth={true}
                  duration={500}
                  onClick={toggleMobileMenu}
                  className="text-gray-700 hover:text-green-600 cursor-pointer text-xl"
                >
                  {value.value}
                </Link>
              ))}
            </div>
          )}
        </nav>
      

      {children}

     
      </div>
    </div>
  );
};

export default HomeLayout;
