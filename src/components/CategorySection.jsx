import React, { useState, useContext } from "react";
import ContextComponent from "../context/ContextComponent";
import { Link } from "react-router-dom";
import Hatchback_image from '../assets/images/Hatchback.png'
import SUV_image from '../assets/images/SUV.png'
import Sedan_image from '../assets/images/Sedan.png'

const bodyTypes = [
  { name: "Hatchback", image: Hatchback_image },
  { name: "SUV", image: SUV_image },
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

  const handleBodyCLick = async(name)=>{
    await setBodyType(name)
    await setFuelType('')
  }

  return (
    <div className="space-y-6 lg:mx-18">

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-300">
        <h1 className="text-2xl font-semibold text-gray-900 pb-4">
          Cars by Category
        </h1>

        {/* TABS */}
        <div className="flex gap-3 border-b border-gray-300 pb-3">
          <button
            onClick={() => setSelectedTab("body-type")}
            className={`px-6 py-2 rounded-full text-sm font-medium border ${selectedTab === "body-type"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-50 text-gray-600 border-gray-200"
              }`}
          >
            Body Type
          </button>

          <button
            onClick={() => setSelectedTab("fuel-type")}
            className={`px-6 py-2 rounded-full text-sm font-medium border ${selectedTab === "fuel-type"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-50 text-gray-600 border-gray-200"
              }`}
          >
            Fuel Type
          </button>
        </div>

        {/* CONTENT */}
        <div className="mt-6">

          {/* Body Type Cards */}
          {selectedTab === "body-type" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4 bg-blue-50 rounded-xl">
              {bodyTypes.map((item, index) => (
                <Link
                  key={item.name}
                  to="/carlists"
                  onClick={()=>handleBodyCLick(item.name)}
                  className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
                >
                    <img src={item.image} alt={item.name} className="w-full md:h-100 object-contain" />
                    <p className="text-center mt-2 font-medium">{item.name}</p>
                </Link>
              ))}
            </div>
          )}

          {/* Fuel Type Cards */}
          {selectedTab === "fuel-type" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4 bg-green-50 rounded-xl">
              {fuelTypes.map((item, index) => (
                <Link
                  key={item.name}
                  to="/carlists"
                  onClick={()=>handleFuelClick(item.name)}
                  className="bg-white rounded-xl p-4 flex flex-col items-center shadow hover:shadow-md transition"
                >
                    <img src={item.image} alt={item.name} className="h-14 object-contain" />
                    <p className="text-sm mt-2 font-medium">{item.name}</p>
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
