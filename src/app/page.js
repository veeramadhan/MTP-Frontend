import { Home } from "@/components/Home";
import { Destination } from "@/components/Destination";
import { Packages } from "@/components/Packages";
import { OurPromise } from "@/components/OurPromise";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import HomeLayout from "@/components/HomeLayout";
import TalkWithUs from "@/components/TalkWithUs";

const navLinks = [
  { key: "home", value: "Home" },
  { key: "destination", value: "Destination" },
  { key: "packages", value: "Packages" },
  { key: "ourpromise", value: "Our Promise" },
  { key: "about-us", value: "About us" },
  { key: "contact", value: "Contact" },
  { key: "/book-trip", value: "Book Trip", isPage: true },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mtp-backend-45q8.onrender.com";

async function getSliderData() {
  try {
    const res = await fetch(`${API_URL}/slider-pics`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const sliderData = await getSliderData();

  return (
    <>
      <HomeLayout navLinks={navLinks}>
        <Home sliderData={sliderData} />
        <Destination />
        <Packages />
        <OurPromise />
        <About />
        <Contact />
      </HomeLayout>
      <TalkWithUs />
    </>
  );
}
