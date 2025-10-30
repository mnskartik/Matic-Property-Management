import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-[#790F34]">Matic PMS</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li><a href="#features" className="hover:text-[#790F34]">Features</a></li>
          <li><a href="#about" className="hover:text-[#790F34]">About</a></li>
          <li><a href="#contact" className="hover:text-[#790F34]">Contact</a></li>
        </ul>

        {/* Desktop Button */}
        <a
          href="/login"
          className="hidden md:inline bg-[#790F34] text-white px-4 py-2 rounded-lg hover:bg-[#9c2351] transition"
        >
          Get Started
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <ul className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
            <li>
              <a
                href="#features"
                className="hover:text-[#790F34]"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-[#790F34]"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-[#790F34]"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="bg-[#790F34] text-white px-5 py-2 rounded-lg hover:bg-[#9c2351] transition"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
