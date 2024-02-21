import React from 'react';
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-100 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Elysian Book" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Elysian Book</span>
        </a>
        <ul className="flex items-center space-x-4">
          <li>
            <button className="text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg py-2 px-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Get started
            </button>
          </li>
          <li>
            <div className="relative">
            <div className="flex justify-center flex-grow">
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-bold ">Home</Link>
              <Link to="/parlours" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-lg font-bold">Parlours</Link>
            </div>
          </div>
              {/* <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.875 19.34l-3.78-3.78a8.5 8.5 0 10-1.414 1.414l3.78 3.78c.389.39 1.025.39 1.414 0a1 1 0 000-1.414zM6.5 15.5a7 7 0 115.686-2.844 1 1 0 10-1.372 1.457A5 5 0 106.5 13a.75.75 0 010-1.5zM4.75 11.5a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" fill="currentColor" />
                </svg>
              </span> */}
              <input
                className="block w-48 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                type="text"
                placeholder="Search..."
              />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
