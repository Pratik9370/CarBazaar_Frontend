import React from "react";
import { Star, Gauge, Fuel, Settings, Calendar, Users } from "lucide-react";
import { useContext } from "react";
import ContextComponent from "../context/ContextComponent";

export default function CarDetails() {
  const {carDetails} = useContext(ContextComponent)
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Car Title */}
      <div className="text-3xl font-bold">{`${carDetails.Model}`}</div>
      <div className="text-xl text-gray-600 mb-4">{carDetails.Variant}</div>

      {/* Main Section */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* Left – Images */}
        <div className="md:col-span-2 space-y-4">
          <img
            src={carDetails.image}
            className="w-full h-80 object-cover rounded-xl shadow"
          />

          <div className="grid grid-cols-3 gap-3">
            {carDetails.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-28 w-full object-cover rounded-lg shadow-sm"
              />
            ))}
          </div>
        </div>

        {/* Right – Pricing + Score */}
        <div className="bg-white rounded-xl shadow p-5 h-fit sticky top-20">
          <h2 className="text-2xl font-semibold mb-2">₹ {carDetails.Expected_price}</h2>
          {/* AI Score */}
          <div className="p-4 bg-blue-50 rounded-xl mb-4">
            <p className="font-semibold text-lg">AI Predicted Score</p>
            <div className="flex items-center gap-2 mt-1">
              <Star className="text-yellow-500" />
              {/* <span className="text-2xl font-bold">{carDetails.aiScore}/10</span> */}
            </div>
          </div>

          {/* CTA Buttons */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2">
            Get Seller Details
          </button>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {/* <Spec icon={<Gauge />} label="Mileage" value={carDetails.mileage} /> */}
          <Spec icon={<Fuel />} label="Fuel Type" value={carDetails.Fuel_type} />
          <Spec icon={<Settings />} label="Transmission" value={carDetails.Transmission} />
          <Spec icon={<Calendar />} label="Model Year" value={carDetails.Reg_year} />
          {/* <Spec icon={<Users />} label="Seating Capacity" value={carDetails.seats} /> */}

        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-3">Overview</h2>
        {/* <p className="text-gray-600 leading-relaxed">{carDetails.description}</p> */}
      </div>
    </div>
  );
}

function Spec({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg shadow-sm">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
}
