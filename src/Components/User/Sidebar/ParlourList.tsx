import React, { useEffect, useState } from "react";
import pic from "../../../assets/palour1.jpeg";
import { allParlours } from "../../../Api/user";

const ParlourList = () => {
  const [filterBar, setFilterBar] = useState(false);
  const [sortOption, setSortOption] = useState(false);
  const [parlourDetails, setParlourDetails] = useState([]);
  const [currentPage,setCurrentPage] = useState(1)
  const 

  useEffect(() => {
    const fetchParlours = async () => {
      try {
        const res = await allParlours();
        console.log(res.data.data);
        setParlourDetails(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchParlours();
  }, []);

  return (
    <div>
      <>
        <div className="bg-white">
          <div>
            <div
              className="relative z-40 lg:hidden"
              role="dialog"
              aria-modal="true"
            >
              <div className="" />
              <div className="">
                <div className="relative hidden ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    >
                      <span className="sr-only">Close menu</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    <div className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-mobile-0"
                          aria-expanded="false"
                        >
                          <span className="font-medium text-gray-900">
                            Color
                          </span>
                          <span className="ml-6 flex items-center">
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      {/* Filter section, show/hide based on section state. */}
                      <div className="pt-6" id="filter-section-mobile-0">
                        <div className="space-y-6">
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-color-0"
                              name="color[]"
                              defaultValue="white"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-color-0"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              White
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-color-1"
                              name="color[]"
                              defaultValue="beige"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-color-1"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              Beige
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-color-2"
                              name="color[]"
                              defaultValue="blue"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-color-2"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              Blue
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-color-3"
                              name="color[]"
                              defaultValue="brown"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-color-3"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              Brown
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-color-4"
                              name="color[]"
                              defaultValue="green"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-color-4"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              Green
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-color-5"
                              name="color[]"
                              defaultValue="purple"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-color-5"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              Purple
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        {/* Expand/collapse section button */}
                        <button
                          type="button"
                          className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-mobile-1"
                          aria-expanded="false"
                        >
                          <span className="font-medium text-gray-900">
                            Category
                          </span>
                          <span className="ml-6 flex items-center">
                            {/* Expand icon, show/hide based on section open state. */}
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            {/* Collapse icon, show/hide based on section open state. */}
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      {/* Filter section, show/hide based on section state. */}
                      <div className="pt-6" id="filter-section-mobile-1">
                        <div className="space-y-6">
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-category-0"
                              name="category[]"
                              defaultValue="new-arrivals"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-category-0"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              Parlours near me
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-category-1"
                              name="category[]"
                              defaultValue="sale"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-category-1"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              Sale
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-category-2"
                              name="category[]"
                              defaultValue="travel"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-category-2"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              Travel
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-category-3"
                              name="category[]"
                              defaultValue="organization"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-category-3"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              Organization
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-category-4"
                              name="category[]"
                              defaultValue="accessories"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-category-4"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              Accessories
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        {/* Expand/collapse section button */}
                        <button
                          type="button"
                          className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-mobile-2"
                          aria-expanded="false"
                        >
                          <span className="font-medium text-gray-900">
                            Size
                          </span>
                          <span className="ml-6 flex items-center">
                            {/* Expand icon, show/hide based on section open state. */}
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            {/* Collapse icon, show/hide based on section open state. */}
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      {/* Filter section, show/hide based on section state. */}
                      <div className="pt-6" id="filter-section-mobile-2">
                        <div className="space-y-6">
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-size-0"
                              name="size[]"
                              defaultValue="2l"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-size-0"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              2L
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-size-1"
                              name="size[]"
                              defaultValue="6l"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-size-1"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              6L
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-size-2"
                              name="size[]"
                              defaultValue="12l"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-size-2"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              12L
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-size-3"
                              name="size[]"
                              defaultValue="18l"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-size-3"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              18L
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-size-4"
                              name="size[]"
                              defaultValue="20l"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-size-4"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              20L
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-mobile-size-5"
                              name="size[]"
                              defaultValue="40l"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-mobile-size-5"
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              40L
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 cursor-pointer">
                  Parlours near me
                </h1>
                <div className="flex items-center">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                        id="menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={() => setSortOption(!sortOption)}
                      >
                        Sort
                        <svg
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <div
                      className={`absolute ${
                        !sortOption && "hidden"
                      } right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex={-1}
                    >
                      <div className="py-1" role="none">
                        <a
                          href="#"
                          className="font-medium text-gray-900 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-0"
                        >
                          Most Popular
                        </a>
                        <a
                          href="#"
                          className="text-gray-500 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-1"
                        >
                          Best Rating
                        </a>
                        <a
                          href="#"
                          className="text-gray-500 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-2"
                        >
                          Newest
                        </a>
                        <a
                          href="#"
                          className="text-gray-500 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-3"
                        >
                          Price: Low to High
                        </a>
                        <a
                          href="#"
                          className="text-gray-500 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-4"
                        >
                          Price: High to Low
                        </a>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setFilterBar(!filterBar)}
                  >
                    <span className="sr-only">Filters</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className={`${!filterBar && "hidden"} lg:block`}>
                    <h3 className="sr-only">Categories</h3>

                    <div className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        {/* Expand/collapse section button */}
                        <button
                          type="button"
                          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-1"
                          aria-expanded="false"
                        >
                          <span className="font-medium text-gray-900">
                            Main services
                          </span>
                          <span className="ml-6 flex items-center">
                            {/* Expand icon, show/hide based on section open state. */}
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            {/* Collapse icon, show/hide based on section open state. */}
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>
                      </h3>
                      {/* Filter section, show/hide based on section state. */}
                      <div className="pt-6" id="filter-section-1">
                        <div className="space-y-4">
                          <div className="flex items-center cursor-pointer">
                            <input
                              id="filter-category-0"
                              name="category[]"
                              defaultValue="new-arrivals"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-0"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Bridals
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-1"
                              name="category[]"
                              defaultValue="sale"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-1"
                              className="ml-3 text-sm text-gray-600"
                            >
                              PreBridals
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-2"
                              name="category[]"
                              defaultValue="travel"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-2"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Facial
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-3"
                              name="category[]"
                              defaultValue="organization"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-3"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Manipadi
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="filter-category-4"
                              name="category[]"
                              defaultValue="accessories"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-category-4"
                              className="ml-3 text-sm text-gray-600"
                            >
                              Threading
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* Product grid */}

                  <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {/* {parlourDetails.length > 0 && */}
                      {parlourDetails.map((parlour) => (
                        <div className="max-w-sm rounded overflow-hidden shadow-lg  cursor-pointer">
                          <img
                            className="w-full"
                            src={parlour.banners[0]}
                            alt="Sunset in the mountains"
                          />
                          <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-1">
                              {parlour.parlourName}
                            </div>
                            <p className="text-gray-700 text-base">
                              {parlour.landmark},{parlour.locality} <br />
                              Hours: Open ⋅{parlour.openingTime} Closes{" "}
                              {parlour.closingTime} <br />
                            </p>
                          </div>
                        </div>
                      ))}
                      {/* } */}
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>



{/* 
        <div className="bg-white p-4 flex items-center flex-wrap justify-end">
          <nav aria-label="Page navigation">
            <ul className="inline-flex">
              <li>
                <button className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-r-0 border-green-600 rounded-l-lg focus:shadow-outline hover:bg-green-100">
                  Prev
                </button>
              </li>
              <li>
                <button className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-r-0 border-green-600 focus:shadow-outline">
                  1
                </button>
              </li>
              <li>
                <button className="px-4 py-2 text-white transition-colors duration-150 bg-green-600 border border-r-0 border-green-600 focus:shadow-outline">
                  2
                </button>
              </li>
              <li>
                <button className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-r-0 border-green-600 focus:shadow-outline hover:bg-green-100">
                  3
                </button>
              </li>
              <li>
                <button className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-green-600 rounded-r-lg focus:shadow-outline hover:bg-green-100">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div> */}



<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
  <div className="flex flex-1 justify-between sm:hidden">
    <a
      href="#"
      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Previous
    </a>
    <a
      href="#"
      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Next
    </a>
  </div>
  <div className="hidden sm:flex sm:flex-1 sm:items-center justify-end">
    
    <div>
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <a
          href="#"
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a
          href="#"
          aria-current="page"
          className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          1
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          2
        </a>
        <a
          href="#"
          className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
        >
          3
        </a>
        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
          ...
        </span>
        <a
          href="#"
          className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
        >
          8
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          9
        </a>
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          10
        </a>
        <a
          href="#"
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </nav>
    </div>
  </div>
</div>

      </>
    </div>
  );
};

export default ParlourList;
