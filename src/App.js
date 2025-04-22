import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Homepage from "./components/Pages/Homepage/Homepage";
import PackagePage from "./components/Pages/PackagePage/PackagePage";
import TalkWithUs from "./components/TalkWithUs";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/package-details/:state/:packageName" element={<PackagePage />} />
      </Routes>
      <TalkWithUs />
    </Router>
  );
};

export default App;
