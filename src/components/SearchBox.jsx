import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = query.trim();
    navigate(trimmed ? `/carlists?search=${encodeURIComponent(trimmed)}` : "/carlists");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-9 md:-mt-11 relative z-10">

      <div className="bg-white rounded-2xl p-2.5 md:p-3 shadow-xl shadow-black/10 border border-[#E8E6E1]">

        <div className="flex w-full items-center gap-2">

          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6D72]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="text"
              placeholder="Search cars by brand or model..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAFAF7] border border-[#E8E6E1]
              text-[#14161A] placeholder:text-[#6B6D72]/70 focus:ring-2 focus:ring-[#B8862E]/40 focus:border-[#B8862E] focus:bg-white outline-none transition-colors"
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-[#14161A] hover:bg-[#B8862E] active:bg-[#8F6821] transition-colors duration-300 text-white px-6 py-3.5
          rounded-xl text-sm font-medium whitespace-nowrap"
          >
            Search
          </button>
        </div>

      </div>
    </div>
  );
}

export default SearchBox;