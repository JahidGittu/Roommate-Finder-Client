import React from "react";
import FeaturedRoommates from "../../Components/FeaturedRoommates";
import RecentBooked from "../../Components/RecentBooked";
import UserTestimonials from "../../Components/UserTestimonials";
import StatCards from "./StatCards";
import ChartReport from "./ChartsReport";

const Default = () => {
  return (
    <div className="p-4 space-y-12 max-w-7xl mx-auto">
      {/* Stat Summary Cards */}
      <StatCards />

      {/* Charts */}
      <ChartReport />

      {/* Featured Roommate Posts */}
      <FeaturedRoommates />

      {/* Recently Booked Roommate Posts */}
      {/* <RecentBooked /> */}

      {/* User Testimonials Section */}
      <UserTestimonials />
    </div>
  );
};

export default Default;
