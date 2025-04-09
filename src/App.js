import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Header/Navbar";
import { Home } from "./components/Home";
import { Destination } from "./components/Destination";
import { Contact } from "./components/Contact";
import { About } from "./components/About";
import Packages from "./components/Packages";
import ScrollToTop from "./components/ScrollToTop";
import PackageDetails from "./components/PackageDetails";

const App = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    var script = document.createElement("script");
    script.src = "https://embed.tawk.to/67bad14b899774190ded0296/1ikos34es";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    script.onload = () => {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_API.onLoad = function () {
        window.Tawk_API.hide();
      };
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Destination />
              <Packages setSelectedPackage={setSelectedPackage} />
              <About />
              <Contact />
            </>
          }
        />
        <Route path="/package-details/:id" element={<PackageDetails />} />
      </Routes>

      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/919578904139"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          left: "20px",
          bottom: "20px",
          zIndex: "1000",
          backgroundColor: "#25D366",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="Chat on WhatsApp"
          style={{ width: "35px", height: "35px" }}
        />
      </a>
    </Router>
  );
};

export default App;
