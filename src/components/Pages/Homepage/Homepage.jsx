import React from "react";

import HomeLayout from "../../Layouts/HomeLayout";

import { Destination } from "../../Destination";
import { Home } from "../../Home";
import { Packages } from "../../Packages";
import { About } from "../../About";

function Homepage() {

  const navLinks = [
    {
      key: "home",
      value: "Home",
    },
    {
      key: "packages",
      value: "Packages",
    },
    {
      key: "contact",
      value: "Contact",
    },
    {
      key: "about-us",
      value: "About us",
    },
    {
      key: "destination",
      value: "Destination",
    },
  ];

  return (
    <HomeLayout navLinks={navLinks}>
      <Home />
      <Destination />
      <Packages />
      <About />
    </HomeLayout>
  );
}

export default Homepage;
