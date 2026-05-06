import "./globals.css";

export const metadata = {
  title: "MTP - Best Travel Planning Services",
  description:
    "Plan your perfect trip with MTP! Get customized travel itineraries, best deals, and expert travel planning services.",
  keywords:
    "Madurai Tour Planner, travel agency, trip planning, vacation deals, best travel services",
  authors: [{ name: "MTP Team" }],
  openGraph: {
    title: "MTP - Best Travel Planning Services",
    description:
      "Plan your perfect trip with MTP! Get customized travel itineraries, best deals, and expert travel planning services.",
    url: "https://yourwebsite.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MTP - Best Travel Planning Services",
    description:
      "Plan your perfect trip with MTP! Get customized travel itineraries, best deals, and expert travel planning services.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/mtp.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  );
}
