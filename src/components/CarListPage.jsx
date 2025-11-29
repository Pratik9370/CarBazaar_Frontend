import React, { useContext, useEffect } from 'react';
import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import CarCard from './CarCard'
import ContextComponent from '../context/ContextComponent';

export default function CarListPage() {
  const { bodyType, fuelType, carList, fetchCarList, search, setSearch } = useContext(ContextComponent)

  const [filters, setFilters] = useState({
    price: 2000000,
    fuel: fuelType,
    body: bodyType,
    transmission: "",
    brand: "",
    year: "",
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
      });
    }, 300); // debounce 300ms

    return () => clearTimeout(delay);
  }, [filters, search]);



  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-16 py-6">

      {/* Sidebar Filters */}
      <div className="lg:w-1/4 bg-white shadow-md border rounded-2xl p-5 h-fit sticky top-4">
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

      {/* Cars Grid */}
      <div className="flex-1">
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
