import React from "react";

import HomeLayout from "../../Layouts/HomeLayout";

import { Destination } from "../../Destination";
import { Home } from "../../Home";
import { Packages } from "../../Packages";
import { About } from "../../About";
import { OurPromise } from "../../OurPromise"

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
      key: "ourpromise",
      value: "OurPromise"
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
    <HomeLayout navLinks={navLinks} >
      <Home />
      <Destination />
      <Packages />
      <OurPromise />
      <About />
    </HomeLayout>
  );
}

export default Homepage;
