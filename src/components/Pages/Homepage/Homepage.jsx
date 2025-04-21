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
      key: "destination",
      value: "Destination",
    },
    {
      key: "packages",
      value: "Packages",
    },
    {
      key: "about-us",
      value: "About us",
    },
    {
      key: "contact",
      value: "Contact",
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
