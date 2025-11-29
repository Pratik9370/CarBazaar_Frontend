import React, { useState, useContext } from "react";
import ContextComponent from "../context/ContextComponent";
import { Link } from "react-router-dom";
export function SearchBox() {

  const { fetchCarList, search, setSearch } = useContext(ContextComponent)

  const handleChange = (e) => {
    setSearch(e.target.value)
    fetchCarList()
  }

  return (
    <div className="md:max-w-4xl mx-auto mdm:px-6 -mt-12 relative z-10 rounded-2xl shadow-xl">

      <div className="bg-gray-900 text-white rounded-2xl p-3 md:p-8 shadow-2xl border border-white/10">

        {/* Search Row */}
        <div className="flex w-full items-center gap-2">

          {/* Search Input */}
          <div className="relative flex-1">

            <input
              type="text"
              placeholder="Search cars by brand or model ..."
              onChange={handleChange}
              className="w-full p-4 py-3 rounded-lg bg-gray-800 border border-gray-700 
              text-white focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Search Button */}
          <Link to={'/carlists'} >
            <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-5 py-3 
          rounded-lg text-base font-medium whitespace-nowrap">
              <svg
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default SearchBox;
