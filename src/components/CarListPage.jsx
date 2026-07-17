import React, { useContext, useEffect } from 'react';
import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import CarCard from './CarCard'
import ContextComponent from '../context/ContextComponent';

export default function CarListPage() {
  const { bodyType, fuelType, carList, fetchCarList, search, setSearch } = useContext(ContextComponent)
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



  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-16 py-6">
      <div className="flex items-center justify-between  lg:hidden">

        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white shadow"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      {/* Sidebar Filters */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute left-5 top-0 h-full w-[90%] max-w-sm bg-none shadow-xl overflow-y-auto custom-scrollbar">

            

            <div className="sticky top-20">
              <div className="">

                <div className="sticky overflow-y-auto custom-scrollbar top-20 max-h-[calc(100vh-6rem)] bg-white shadow-md border rounded-2xl p-5">
                  <span className='flex justify-between items-start text-center'>
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                      <SlidersHorizontal size={20} /> Filters
                    </h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-xl"
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
                    className="w-full p-3 mb-4 rounded-xl border"
                  />

                  <input
                    type="text"
                    placeholder="Search City"
                    name="city"
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
                    className="w-full p-3 mb-4 rounded-xl border"
                  />

                  {/* Price Range */}
                  <div className="mb-4">
                    <p className="font-medium">Max Price: ₹{filters.price.toLocaleString()}</p>
                    <input
                      type="range"
                      min="200000"
                      max="2000000"
                      value={filters.price}
                      onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
                      className="w-full"
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
                      <p className="font-medium">{f.label}</p>
                      <select
                        value={filters[f.key]}
                        onChange={(e) => setFilters({ ...filters, [f.key]: e.target.value })}
                        className="w-full p-3 rounded-xl border mt-1"
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

        <div className="sticky overflow-y-auto custom-scrollbar top-20 max-h-[calc(100vh-7rem)] bg-white shadow-md border rounded-2xl p-5">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <SlidersHorizontal size={20} /> Filters
          </h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search car..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 mb-4 rounded-xl border"
          />

          <input
            type="text"
            placeholder="Search City"
            name="city"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
            className="w-full p-3 mb-4 rounded-xl border"
          />

          {/* Price Range */}
          <div className="mb-4">
            <p className="font-medium">Max Price: ₹{filters.price.toLocaleString()}</p>
            <input
              type="range"
              min="200000"
              max="2000000"
              value={filters.price}
              onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
              className="w-full"
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
              <p className="font-medium">{f.label}</p>
              <select
                value={filters[f.key]}
                onChange={(e) => setFilters({ ...filters, [f.key]: e.target.value })}
                className="w-full p-3 rounded-xl border mt-1"
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
        <h2 className="text-2xl font-semibold mb-4">
          Available Cars ({carList?.length || 0})
        </h2>

        {carList?.length === 0 ? (
          <p>No cars match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {carList?.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>


    </div>
  );
}
