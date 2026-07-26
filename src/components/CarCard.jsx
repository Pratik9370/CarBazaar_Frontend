// CarCard.jsx
import React, { useContext } from 'react';
import { Bookmark } from "lucide-react";
import { Link } from 'react-router-dom';
import ContextComponent from '../context/ContextComponent';

export function CarCard({ car }) {

  const { saveCar, unsaveCar, user, setCarDetails, addRecentlyViewedCars, fetchPrediction } = useContext(ContextComponent)

  const handleSaveClick = (e,car_id) => {
    e.stopPropagation();
    e.preventDefault();
    if(!user.SavedCars.some(c => c._id==car_id)){
      saveCar(car_id)
    }
    else{
      unsaveCar(car_id)
    }
  }

  const isSaved = user?.SavedCars?.some(c => c._id === car._id);

  return (
    <Link to={'/cardetails'} onClick={()=>{fetchPrediction(car), setCarDetails(car), addRecentlyViewedCars(car._id)}}>
      <div
        key={car._id}
        className="group bg-white rounded-xl border border-[#E8E6E1] hover:border-[#B8862E]/50 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 overflow-hidden cursor-pointer"
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-[#F1EFEA]">
          <img
            src={car.image}
            className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            alt={car.Model}
          />

          {/* Reg year — plate style */}
          <span className="absolute top-3 left-3 bg-[#14161A] text-white font-mono text-xs tracking-widest px-2.5 py-1 rounded">
            {car.Reg_year}
          </span>

          {/* Bookmark icon */}
          <button
            className="absolute top-3 right-3 bg-white/95 hover:bg-white rounded-full p-2 shadow-sm transition-colors"
            onClick={(e) => handleSaveClick(e, car._id)}
            aria-label="Save car"
          >
            <Bookmark
              size={17}
              strokeWidth={1.75}
              className={isSaved ? "text-[#B8862E]" : "text-[#6B6D72]"}
              fill={isSaved ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="font-serif text-lg text-[#14161A] truncate">
            {`${car.Brand} ${car.Model}`}
          </h3>

          {/* Price — tag style */}
          <div className="mt-2 pt-2 border-t border-[#E8E6E1]">
            <p className="text-[#B8862E] text-xl font-semibold tracking-tight">
              ₹{car.Expected_price}
            </p>
          </div>

          {/* Spec plate */}
          <div className="flex items-center gap-2 mt-3 font-mono text-[11px] uppercase tracking-wide text-[#6B6D72]">
            <span>{car.KM} km</span>
            <span className="text-[#E8E6E1]">•</span>
            <span>{car.Fuel_type}</span>
            <span className="text-[#E8E6E1]">•</span>
            <span className="truncate">{car.City}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;