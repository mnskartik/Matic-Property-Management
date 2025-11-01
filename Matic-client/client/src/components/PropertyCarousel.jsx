import React from "react";

const properties = [
  {
    id: 1,
    title: "Luxury Villa in Goa",
    price: "₹2.5 Cr",
    img: "/assets/p1.jpg",
  },
  {
    id: 2,
    title: "Modern Apartment in Mumbai",
    price: "₹1.2 Cr",
    img: "/assets/p2.jpg",
  },
  {
    id: 3,
    title: "Beachside House in Kerala",
    price: "₹3.8 Cr",
    img: "/assets/p3.jpg",
  },
  {
    id: 4,
    title: "Premium Flat in Bangalore",
    price: "₹1.8 Cr",
    img: "/assets/p4.jpg",
  },
  {
    id: 5,
    title: "Spacious Condo in Delhi",
    price: "₹2.0 Cr",
    img: "/assets/p5.jpg",
  },
  {
    id: 6,
    title: "Elegant Bungalow in Chennai",
    price: "₹2.3 Cr",
    img: "/assets/p6.jpg",
  },
  {
    id: 7,
    title: "Penthouse in Hyderabad",
    price: "₹4.0 Cr",
    img: "/assets/p6.jpg",
  },
  {
    id: 8,
    title: "Cozy Cottage in Pune",
    price: "₹1.5 Cr",
    img: "/assets/p1.jpg",
  }
];

const PropertyCarousel = () => {
  return (
    <section className="py-12 px-4 sm:px-6 md:px-10 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Featured Properties
      </h2>

      {/* ✅ Responsive layout for all screen sizes */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        gap-6 justify-items-center"
      >
        {properties.map((prop) => (
          <div
            key={prop.id}
            className="w-full sm:w-[300px] bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <img
              src={prop.img}
              alt={prop.title}
              className="w-full h-48 sm:h-56 md:h-64 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {prop.title}
              </h3>
              <p className="text-pink-600 font-bold mt-2">{prop.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Horizontal scroll only on very small screens */}
      <div className="sm:hidden flex gap-4 overflow-x-auto mt-6 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
        {properties.map((prop) => (
          <div
            key={prop.id}
            className="snap-center min-w-[80%] bg-gray-100 rounded-xl overflow-hidden shadow-md"
          >
            <img
              src={prop.img}
              alt={prop.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{prop.title}</h3>
              <p className="text-pink-600 font-bold">{prop.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyCarousel;
