import React, { useState } from "react";
import { Star, Gauge, Fuel, Settings, Calendar, Users } from "lucide-react";
import { useContext } from "react";
import ContextComponent from "../context/ContextComponent";

export default function CarDetails() {
  const { carDetails } = useContext(ContextComponent)
  const [seller, setSeller] = useState({name:'', mobile:''})
  const [sellerModal, setSellerModal] = useState(false)

  const getSellerDetails = async (car_id) => {
    const response = await fetch('https://carbazaar-backend-1whv.onrender.com/api/car/carSellerDetails', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ car_id }),
      credentials: 'include'
    })
    const data = await response.json()
    await setSeller({name:data.name, mobile:data.mobile})
    setSellerModal(true)
  }

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
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2" onClick={() => { getSellerDetails(carDetails._id) }}>
            Get Seller Details
          </button>
        </div>
      </div>

      {
        sellerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

              {/* Close Button */}
              <button
                onClick={() => { setSellerModal(false) }}
                className="absolute right-4 top-4 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Seller Details
              </h2>

              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Name:</span> { seller.name }</p>
                <p><span className="font-medium">Mobile:</span> { seller.mobile }</p>
                <p><span className="font-medium">City:</span> { carDetails.City }</p>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={`tel:${seller.mobile}`}
                  className="flex-1 rounded-lg bg-green-600 py-2 text-center text-white hover:bg-green-700"
                >
                  📞 Call
                </a>

                <a
                  href={`https://wa.me/${seller.mobile}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-lg bg-emerald-500 py-2 text-center text-white hover:bg-emerald-600"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        )
      }


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
