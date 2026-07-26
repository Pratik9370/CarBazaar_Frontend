import React, { useState } from "react";
import { Star, Gauge, Fuel, Settings, Calendar, Users } from "lucide-react";
import { useContext } from "react";
import ContextComponent from "../context/ContextComponent";

export default function CarDetails() {
  const { carDetails } = useContext(ContextComponent)
  const [seller, setSeller] = useState({ name: '', mobile: '' })
  const [sellerModal, setSellerModal] = useState(false)

  const getSellerDetails = async (car_id) => {
    setLoading(true)
    const response = await fetch('https://carbazaar-backend-1whv.onrender.com/api/car/carSellerDetails', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ car_id }),
      credentials: 'include'
    })
    const data = await response.json()
    await setSeller({ name: data.name, mobile: data.mobile })
    setSellerModal(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Car Title */}
      <div className="mb-7">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="font-serif text-3xl md:text-4xl text-[#14161A] tracking-tight">
            {carDetails.Model}
          </h1>
          <span className="font-mono text-[11px] tracking-wide uppercase text-[#B8862E] bg-[#B8862E]/10 rounded-full px-3 py-1">
            {carDetails.Variant}
          </span>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* Left – Images */}
        <div className="md:col-span-2 space-y-3">
          <div className="rounded-2xl overflow-hidden border border-[#E8E6E1]">
            <img
              src={carDetails.image}
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {carDetails.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-28 w-full object-cover rounded-xl border border-[#E8E6E1] hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Right – Pricing + Score */}
        <div className="bg-white rounded-2xl border border-[#E8E6E1] p-6 h-fit sticky top-20">
          <p className="font-mono text-[11px] uppercase tracking-wide text-[#6B6D72] mb-1">Asking price</p>
          <h2 className="font-serif text-3xl text-[#14161A] mb-5">
            ₹ {carDetails.Expected_price}
          </h2>

          {/* AI Score */}
          <div className="rounded-xl bg-[#FAFAF7] border border-[#E8E6E1] p-4 mb-5">
            <p className="text-sm font-medium text-[#14161A] mb-3">AI estimated price range</p>
            {carDetails?.priceRange ? (
              <p className="text-lg font-semibold text-[#14161A]">
                ₹{carDetails.priceRange.lowerBound.toLocaleString("en-IN")} – ₹{carDetails.priceRange.upperBound.toLocaleString("en-IN")}
              </p>
            ) : (
              <p className="text-[#6B6D72] text-sm">Calculating price range…</p>
            )}
          </div>

          {/* CTA Buttons */}
          <button
            className="w-full bg-[#14161A] hover:bg-[#B8862E] text-white font-medium py-3 rounded-xl transition-colors duration-300"
            onClick={() => { getSellerDetails(carDetails._id) }}
          >
            Get seller details
          </button>
        </div>
      </div>

      {
        sellerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

              {/* Close Button */}
              <button
                onClick={() => { setSellerModal(false) }}
                className="absolute right-5 top-5 text-[#6B6D72] hover:text-[#14161A] transition-colors"
              >
                ✕
              </button>

              <h2 className="font-serif mb-5 text-xl text-[#14161A]">
                Seller details
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between border-b border-[#E8E6E1] pb-2">
                  <span className="text-sm text-[#6B6D72]">Name</span>
                  <span className="font-medium text-[#14161A]">{seller.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E6E1] pb-2">
                  <span className="text-sm text-[#6B6D72]">Mobile</span>
                  <span className="font-mono font-medium text-[#14161A]">{seller.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#6B6D72]">City</span>
                  <span className="font-medium text-[#14161A]">{carDetails.City}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">


                <a href={`tel:${seller.mobile}`}
                  className="flex-1 rounded-xl bg-[#2F6B52] py-2.5 text-center text-white font-medium hover:bg-[#26583F] transition-colors">
                  📞 Call
                </a>



                <a href={`https://wa.me/${seller.mobile}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-xl bg-[#25D366] py-2.5 text-center text-white font-medium hover:bg-[#1FB959] transition-colors">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        )
      }


      {/* Specifications */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl text-[#14161A] mb-4">Specifications</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {/* <Spec icon={<Gauge />} label="Mileage" value={carDetails.mileage} /> */}
          <Spec icon={<Fuel />} label="Fuel Type" value={carDetails.Fuel_type} />
          <Spec icon={<Settings />} label="Transmission" value={carDetails.Transmission} />
          <Spec icon={<Calendar />} label="Model Year" value={carDetails.Reg_year} />
          {/* <Spec icon={<Users />} label="Seating Capacity" value={carDetails.seats} /> */}

        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="font-serif text-2xl text-[#14161A] mb-3">Overview</h2>
        {/* <p className="text-gray-600 leading-relaxed">{carDetails.description}</p> */}
      </div>
    </div>
    </div>
  );
}

function Spec({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E8E6E1] hover:border-[#B8862E]/40 transition-colors">
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#B8862E]/10 text-[#B8862E] shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wide text-[#6B6D72]">{label}</p>
        <p className="font-semibold text-[#14161A]">{value}</p>
      </div>
    </div>
  );
}