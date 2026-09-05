import React, { useState, useContext } from "react";
import ContextComponent from "../context/ContextComponent";
import { Link } from "react-router-dom";
import Hatchback_image from '../assets/images/Hatchback.png'
import SUV_image from '../assets/images/SUV.png'
import Sedan_image from '../assets/images/Sedan.png'

const bodyTypes = [
  { name: "Hatchback", image: Hatchback_image },
  { name: "Utility Vehicles", image: SUV_image },
  { name: "Sedan", image: Sedan_image },
];

const fuelTypes = [
  { name: "Petrol", image: "https://media.cars24.com/india/car-catalog/category-page/18022025/fuel/petrol.png" },
  { name: "Diesel", image: "https://media.cars24.com/india/car-catalog/category-page/18022025/fuel/diesel.png" },
  { name: "CNG", image: "https://media.cars24.com/india/car-catalog/category-page/18022025/fuel/cng.png" },
  { name: "Electric", image: "https://media.cars24.com/india/car-catalog/category-page/18022025/fuel/ev.png" },
  { name: "Hybrid", image: "https://media.cars24.com/india/car-catalog/category-page/18022025/fuel/hybrid.png" },
];

export default function CategorySection() {

  const { setBodyType, setFuelType, fetchCarList } = useContext(ContextComponent);

  const [selectedTab, setSelectedTab] = useState("body-type");

  const handleFuelClick = async (name) => {
    await setFuelType(name)
    await setBodyType('')

  }

  const handleBodyCLick = async (name) => {
    await setBodyType(name)
    await setFuelType('')
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E8E6E1] p-6 md:p-9">

      <div className="flex items-end justify-between flex-wrap gap-4 mb-7">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8862E] mb-2">Browse</p>
          <h1 className="font-serif text-2xl md:text-3xl text-[#14161A]">
            Cars by Category
          </h1>
        </div>

        {/* TABS */}
        <div className="flex gap-1 bg-[#FAFAF7] border border-[#E8E6E1] p-1 rounded-full">
          <button
            onClick={() => setSelectedTab("body-type")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedTab === "body-type"
              ? "bg-[#14161A] text-white"
              : "text-[#6B6D72] hover:text-[#14161A]"
              }`}
          >
            Body Type
          </button>

          <button
            onClick={() => setSelectedTab("fuel-type")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedTab === "fuel-type"
              ? "bg-[#14161A] text-white"
              : "text-[#6B6D72] hover:text-[#14161A]"
              }`}
          >
            Fuel Type
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div>

        {/* Body Type Cards */}
        {selectedTab === "body-type" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {bodyTypes.map((item, index) => (
              <Link
                key={item.name}
                to={`/carlists?body=${encodeURIComponent(item.name)}`}
                className="group bg-[#FAFAF7] hover:bg-white rounded-xl p-6 border border-[#E8E6E1] hover:border-[#B8862E]/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
              >
                <img src={item.image} alt={item.name} className="w-full h-32 md:h-44 object-contain group-hover:scale-105 transition-transform duration-500 ease-out" />
                <p className="text-center mt-4 font-serif text-[#14161A]">{item.name}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Fuel Type Cards */}
        {selectedTab === "fuel-type" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-5">
            {fuelTypes.map((item, index) => (
              <Link
                key={item.name}
                to={`/carlists?fuel=${encodeURIComponent(item.name)}`}
                className="group bg-[#FAFAF7] hover:bg-white rounded-xl p-5 flex flex-col items-center border border-[#E8E6E1] hover:border-[#B8862E]/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
              >
                <img src={item.image} alt={item.name} className="h-12 object-contain group-hover:scale-105 transition-transform duration-500 ease-out" />
                <p className="text-sm mt-3 font-mono uppercase tracking-wide text-[#6B6D72] group-hover:text-[#14161A] transition-colors">{item.name}</p>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}