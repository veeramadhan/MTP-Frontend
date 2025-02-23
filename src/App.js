import React from 'react';
import { useEffect } from 'react';
import { Navbar } from "../src/components/Header/Navbar";
import { Home } from './components/Home';
import { Destination } from './components/Destination';
import { Contact } from './components/Contact';
import { Gallery } from './components/Gallery';
import { About } from './components/About';

const App = () => {

  useEffect(() => {
    var script = document.createElement('script');
    script.src = 'https://embed.tawk.to/67bad14b899774190ded0296/1ikos34es';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
  }, []);
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

