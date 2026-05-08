import BookingWizard from "@/components/BookTrip/BookingWizard";
import HomeLayout from "@/components/HomeLayout";
import TalkWithUs from "@/components/TalkWithUs";

export const metadata = {
  title: "Book Your Trip | Madurai Tour Planner",
  description: "Plan and customize your perfect trip with Madurai Tour Planner. Choose destinations, dates, activities, and download your personalized itinerary.",
};

const navLinks = [
  { key: "/", value: "Home", isPage: true },
];

export default function BookTripPage() {
  return (
    <>
      <HomeLayout navLinks={navLinks}>
        <BookingWizard />
      </HomeLayout>
      <TalkWithUs />
    </>
  );
}
