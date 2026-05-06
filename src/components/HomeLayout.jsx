"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-scroll";
import { Facebook, Instagram, Youtube, Send, Menu, X } from "lucide-react";
import Image from "next/image";

const HomeLayout = ({ navLinks, children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMobileMenu();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Close on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") closeMobileMenu(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-green-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <header>
        <div className="bg-[#222] py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-white text-sm">
              <a
                href="mailto:maduraitourplanner@gmail.com"
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
        <nav className="bg-white shadow-md w-full top-0 z-50 sticky" ref={menuRef}>
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Image src="/assets/logo/mtpm.png" alt="Madurai Tour Planner Logo" width={208} height={64} className="h-14 w-auto md:w-52" priority />
              </div>

              <div className="hidden md:flex space-x-6">
                {navLinks.map((value) => (
                  <Link
                    key={value.key}
                    to={value.key}
                    smooth={true}
                    duration={500}
                    spy={true}
                    activeClass="text-green-600 font-semibold"
                    className="text-gray-700 hover:text-green-600 cursor-pointer text-xl transition-colors"
                  >
                    {value.value}
                  </Link>
                ))}
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-700"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-8 w-8" />
                  ) : (
                    <Menu className="h-8 w-8" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div
            className={`md:hidden bg-white border-t border-gray-200 flex flex-col items-center space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
            }`}
          >
            {navLinks.map((value) => (
              <Link
                key={value.key}
                to={value.key}
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-green-600 font-semibold"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-green-600 cursor-pointer text-xl transition-colors"
              >
                {value.value}
              </Link>
            ))}
          </div>
        </nav>

        <main id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
