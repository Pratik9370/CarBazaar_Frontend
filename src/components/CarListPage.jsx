import React, { useContext, useEffect } from 'react';
import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import CarCard from './CarCard'
import ContextComponent from '../context/ContextComponent';
import Loader from './Loader';

export default function CarListPage() {
  const { bodyType, fuelType, carList, fetchCarList, search, setSearch, loading } = useContext(ContextComponent)
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    price: 2000000,
    fuel: fuelType,
    body: bodyType,
    transmission: "",
    brand: "",
    year: "",
    city: ""
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchCarList({
        price: filters.price,
        fuel: filters.fuel,
        body: filters.body,
        transmission: filters.transmission,
        brand: filters.brand,
        year: filters.year,
        city: filters.city
      });
    }, 300); // debounce 300ms

    return () => clearTimeout(delay);
  }, [filters, search]);

  // Build the list of currently active filters as chips
  const activeFilters = useMemo(() => {
    const labels = {
      fuel: "Fuel",
      body: "Body",
      transmission: "Transmission",
      brand: "Brand",
      year: "Year",
      city: "City",
    };

    const chips = Object.entries(filters)
      .filter(([key, value]) => key !== "price" && value)
      .map(([key, value]) => ({ key, label: `${labels[key]}: ${value}` }));

    if (filters.price < 2000000) {
      chips.push({ key: "price", label: `Max Price: ₹${filters.price.toLocaleString()}` });
    }

    if (search) {
      chips.push({ key: "search", label: `Search: ${search}` });
    }

    return chips;
  }, [filters, search]);

  const removeFilter = (key) => {
    if (key === "search") {
      setSearch("");
    } else if (key === "price") {
      setFilters({ ...filters, price: 2000000 });
    } else {
      setFilters({ ...filters, [key]: "" });
    }
  };

  const clearAllFilters = () => {
    setFilters({
      price: 2000000,
      fuel: "",
      body: "",
      transmission: "",
      brand: "",
      year: "",
      city: "",
    });
    setSearch("");
  };

  const filterFieldClass = "w-full p-3 mb-4 rounded-xl border border-[#E8E6E1] bg-[#FAFAF7] text-[#14161A] placeholder:text-[#6B6D72]/70 focus:ring-2 focus:ring-[#B8862E]/40 focus:border-[#B8862E] focus:bg-white outline-none transition-colors";

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-16 py-6 bg-[#FAFAF7] min-h-screen">
      <div className="flex items-center justify-between lg:hidden">

        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E8E6E1] bg-white text-sm font-medium text-[#14161A]"
        >
          <SlidersHorizontal size={17} strokeWidth={1.75} />
          Filters
        </button>
      </div>

      {/* Sidebar Filters */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute left-5 top-0 h-full w-[90%] max-w-sm bg-none shadow-xl overflow-y-auto custom-scrollbar">

            

            <div className="sticky top-20">
              <div className="">

                <div className="sticky overflow-y-auto custom-scrollbar top-20 max-h-[calc(100vh-6rem)] bg-white border border-[#E8E6E1] rounded-2xl p-5">
                  <span className='flex justify-between items-start text-center'>
                    <h2 className="font-serif text-xl text-[#14161A] flex items-center gap-2 mb-4">
                      <SlidersHorizontal size={19} strokeWidth={1.75} /> Filters
                    </h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-xl text-[#6B6D72] hover:text-[#14161A]"
                    >
                      ✕
                    </button>
                  </span>

                  {/* Search */}
                  <input
                    type="text"
                    placeholder="Search car..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={filterFieldClass}
                  />

                  <input
                    type="text"
                    placeholder="Search City"
                    name="city"
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
                    className={filterFieldClass}
                  />

                  {/* Price Range */}
                  <div className="mb-4">
                    <p className="font-mono text-xs uppercase tracking-wide text-[#6B6D72] mb-1">Max Price: <span className="text-[#14161A] font-semibold">₹{filters.price.toLocaleString()}</span></p>
                    <input
                      type="range"
                      min="200000"
                      max="2000000"
                      value={filters.price}
                      onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
                      className="w-full accent-[#B8862E]"
                    />
                  </div>

                  {/* Select Filters */}
                  {[
                    { key: "fuel", label: "Fuel Type", options: ["Petrol", "Diesel", "CNG", "Electric"] },
                    { key: "body", label: "Body Type", options: ["Hatchback", "Sedan", "SUV"] },
                    {
                      key: "transmission",
                      label: "Transmission",
                      options: ["MT", "AT", "AMT", "CVT", "DCT"],
                    },
                    { key: "brand", label: "Brand", options: ["Tata", "Hyundai", "Honda", "Maruti"] },
                    { key: "year", label: "Year", options: ["2020", "2021", "2022", "2023"] },
                  ].map((f) => (
                    <div key={f.key} className="mb-4">
                      <p className="text-sm font-medium text-[#14161A] mb-1">{f.label}</p>
                      <select
                        value={filters[f.key]}
                        onChange={(e) => setFilters({ ...filters, [f.key]: e.target.value })}
                        className={filterFieldClass + " mt-1"}
                      >
                        <option value="">Any</option>
                        {f.options.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      <div className="lg:w-1/4 hidden lg:block">

        <div className="sticky overflow-y-auto custom-scrollbar top-20 max-h-[calc(100vh-7rem)] bg-white border border-[#E8E6E1] rounded-2xl p-5">
          <h2 className="font-serif text-xl text-[#14161A] flex items-center gap-2 mb-5">
            <SlidersHorizontal size={19} strokeWidth={1.75} /> Filters
          </h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search car..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={filterFieldClass}
          />

          <input
            type="text"
            placeholder="Search City"
            name="city"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
            className={filterFieldClass}
          />

          {/* Price Range */}
          <div className="mb-4">
            <p className="font-mono text-xs uppercase tracking-wide text-[#6B6D72] mb-1">Max Price: <span className="text-[#14161A] font-semibold">₹{filters.price.toLocaleString()}</span></p>
            <input
              type="range"
              min="200000"
              max="2000000"
              value={filters.price}
              onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
              className="w-full accent-[#B8862E]"
            />
          </div>

          {/* Select Filters */}
          {[
            { key: "fuel", label: "Fuel Type", options: ["Petrol", "Diesel", "CNG", "Electric"] },
            { key: "body", label: "Body Type", options: ["Hatchback", "Sedan", "SUV"] },
            {
              key: "transmission",
              label: "Transmission",
              options: ["Manual", "Automatic", "AMT", "CVT", "DCT"],
            },
            { key: "brand", label: "Brand", options: ["Tata", "Hyundai", "Honda", "Maruti"] },
            { key: "year", label: "Year", options: ["2020", "2021", "2022", "2023"] },
          ].map((f) => (
            <div key={f.key} className="mb-4">
              <p className="text-sm font-medium text-[#14161A] mb-1">{f.label}</p>
              <select
                value={filters[f.key]}
                onChange={(e) => setFilters({ ...filters, [f.key]: e.target.value })}
                className={filterFieldClass + " mt-1"}
              >
                <option value="">Any</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Cars Grid */}
      <div className="flex-1 lg:w-3/4">

        {/* Active Filter Tags */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {activeFilters.map((chip) => (
              <span
                key={chip.key}
                className="flex items-center gap-1.5 bg-white text-[#14161A] text-sm font-medium pl-3 pr-2 py-1.5 rounded-full border border-[#E8E6E1]"
              >
                {chip.label}
                <button
                  onClick={() => removeFilter(chip.key)}
                  className="text-[#6B6D72] hover:text-[#14161A] w-4 h-4 flex items-center justify-center"
                  aria-label={`Remove ${chip.label} filter`}
                >
                  ✕
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm text-[#B8862E] font-medium hover:text-[#8F6821] ml-1"
            >
              Clear all
            </button>
          </div>
        )}
        
        {loading?(<div><Loader/></div>):(<div>
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-serif text-2xl text-[#14161A]">
              Available Cars
            </h2>
            <span className="font-mono text-xs uppercase tracking-wide text-[#6B6D72]">
              {carList?.length || 0} results
            </span>
          </div>

        {carList?.length === 0 ? (
          <div className="bg-white border border-[#E8E6E1] rounded-2xl py-16 text-center">
            <p className="text-[#6B6D72]">No cars match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {carList?.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}</div>)}
        
        
        
      </div>


    </div>
  );
}