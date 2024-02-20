import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img className="h-8" src="/logo.svg" alt="Logo" />
          </div>
          {/* Navigation Links */}
          <div className="flex justify-center flex-grow">
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-bold ">Home</Link>
              <Link to="/parlours" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-bold">Parlours</Link>
            </div>
          </div>
          {/* Search Bar */}
          <div className="flex">
            <input type="text" placeholder="Search" className="bg-gray-100 border border-gray-300 px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          {/* Profile */}
          <div className="flex items-center">
            <button className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Profile</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
