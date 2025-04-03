import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Header/Navbar";
import { Home } from "./components/Home";
import { Destination } from "./components/Destination";
import { Contact } from "./components/Contact";
import { About } from "./components/About";
import Packages from "./components/Packages";
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
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Destination />
            <Packages setSelectedPackage={setSelectedPackage} />
            <About />
            <Contact />
          </>
        } />
        <Route path="/package-details/:id" element={<PackageDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
