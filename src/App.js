import React, { useEffect } from "react";
import { Navbar } from "../src/components/Header/Navbar";
import { Home } from "./components/Home";
import { Destination } from "./components/Destination";
import { Contact } from "./components/Contact";
import { Gallery } from "./components/Gallery";
import { About } from "./components/About";
import Packages from "./components/Packages";
import Demo from "./components/demo";

const App = () => {
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
        window.Tawk_API.hide(); // Hide chat box initially
      };
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Home />
      <Destination />
      <Packages />
      <About />
      <Contact />
      {/* <Demo /> */}
      {/* <Gallery /> */}
    </div>
  );
};

export default App;
