import React from "react";

const CompanyOverview = () => {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-gray-50 text-center">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Why Choose DreamEstate?
      </h2>

      {/* Description */}
      <p className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg mb-10 px-2">
        At DreamEstate, we believe in turning dreams into addresses. With over
        10,000 successful property deals and 5-star client satisfaction, we’re
        India’s fastest-growing real estate platform.
      </p>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Card 1 */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-pink-600">
            Verified Listings
          </h3>
          <p className="text-gray-700 text-sm sm:text-base">
            All properties are 100% verified by our in-house experts.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-pink-600">
            Trusted Agents
          </h3>
          <p className="text-gray-700 text-sm sm:text-base">
            Connect with experienced and reliable property agents near you.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-pink-600">
            Best Deals
          </h3>
          <p className="text-gray-700 text-sm sm:text-base">
            We ensure competitive pricing and transparent transactions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
