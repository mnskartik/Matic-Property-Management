import React from "react";
import HeroSection from "../components/HeroSectio";
import PropertyCarousel from "../components/PropertyCarousel";
import CompanyOverview from "../components/CompanyOverview";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-900">
      <Navbar />
      <HeroSection />
      <PropertyCarousel />
      <CompanyOverview />
      <Footer />
    </div>
  );
};

export default LandingPage;
