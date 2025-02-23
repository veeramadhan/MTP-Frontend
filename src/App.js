import React from 'react';
import { Navbar } from "../src/components/Header/Navbar";
import { Home } from './components/Home';
import { Destination } from './components/Destination';
import { Contact } from './components/Contact';
import { Gallery } from './components/Gallery';
import { About } from './components/About';

const App = () => {
  return (
   <div>
      <Navbar />
      <Home />
      <Destination />
      <Gallery />
      <About />
      <Contact />
    </div>
  );
};

export default App;

