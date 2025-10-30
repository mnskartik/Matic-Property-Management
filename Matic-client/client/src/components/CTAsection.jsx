import React from "react";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#790F34] to-[#a12d56] text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h3 className="text-3xl font-bold mb-4">
          Ready to streamline your property business?
        </h3>
        <p className="text-lg mb-8">
          Join Matic PMS today and experience effortless property management for Admins, Agents, and Tenants.
        </p>
        <a
          href="/register"
          className="bg-white text-[#790F34] px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Create Free Account
        </a>
      </div>
    </section>
  );
};

export default CTASection;
