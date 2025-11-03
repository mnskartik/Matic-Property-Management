import React, { useState } from "react";

const HeroSection = () => {
  const [searchData, setSearchData] = useState({ location: "", type: "" });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching properties in ${searchData.location} (${searchData.type})`);
  };

  return (
    <section
      className="relative flex flex-col justify-center items-center text-center 
                 min-h-[80vh] sm:min-h-[90vh] md:min-h-[85vh] 
                 bg-cover bg-center px-4 sm:px-6 md:px-12 lg:px-20"
      style={{
        backgroundImage: "url('/assets/p2.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-white max-w-3xl w-full ">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                     font-bold mb-4 sm:mb-6 leading-snug"
        >
          Find Your Dream Property
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl 
                     mb-6 sm:mb-8 text-gray-200"
        >
          Explore premium homes, apartments, and villas across top cities.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 
                     justify-center items-center 
                     bg-white/95 rounded-xl shadow-xl 
                     p-4 sm:p-5 md:p-6 mx-auto w-full max-w-2xl"
        >
          <input
  type="text"
  name="location"
  placeholder="Search by location..."
  onChange={handleChange}
  className="p-3 sm:p-4 rounded-md w-full sm:w-64 md:w-72
             border border-gray-700 bg-gray-800 text-white
             placeholder-gray-400 focus:outline-none focus:ring-2 
             focus:ring-pink-500 text-sm sm:text-base"
/>

          <select
  name="type"
  onChange={handleChange}
  className="p-3 sm:p-4 rounded-md w-full sm:w-48 md:w-56 
             border border-gray-300 focus:outline-none focus:ring-2 
             focus:ring-pink-500 text-sm sm:text-base
             bg-gray-800 text-white"
>
  <option value="">Property Type</option>
  <option value="Apartment">Apartment</option>
  <option value="Villa">Villa</option>
  <option value="Commercial">Commercial</option>
</select>

          <button
            type="submit"
            className="w-full sm:w-auto bg-[#790F34] text-white px-6 sm:px-8 py-3 
                       rounded-md font-semibold hover:bg-[#9c2351] 
                       transition text-sm sm:text-base"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
