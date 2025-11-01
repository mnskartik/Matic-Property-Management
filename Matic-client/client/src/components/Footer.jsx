import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 text-center sm:text-left">
        
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-3 text-white">DreamEstate</h3>
          <p className="text-sm sm:text-base leading-relaxed">
            Helping you find your dream home with trust, transparency, and
            technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="/" className="hover:text-pink-500 transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-pink-500 transition-colors duration-200">
                Features
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-pink-500 transition-colors duration-200">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold mb-3 text-white">Contact</h4>
          <p className="text-sm sm:text-base">📧 info@dreamestate.com</p>
          <p className="text-sm sm:text-base">📞 +91 98765 43210</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 pt-4 text-center text-xs sm:text-sm">
        © {new Date().getFullYear()} <span className="text-white font-semibold">DreamEstate</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
