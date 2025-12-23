import React, { useContext } from 'react';
import { Bookmark, } from "lucide-react";
import { Link } from 'react-router-dom';
import ContextComponent from '../context/ContextComponent';

export function CarCard({ car }) {

  const { saveCar, unsaveCar, user, setCarDetails, addRecentlyViewedCars } = useContext(ContextComponent)

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

  return (
    <Link to={'/cardetails'} onClick={()=>{setCarDetails(car), addRecentlyViewedCars(car._id)}}>
      <div
        key={car._id}
        className="relative bg-white rounded-2xl shadow-md border border-gray-400 hover:shadow-xl transition overflow-hidden cursor-pointer"
      >
        {/* Bookmark icon */}
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow" onClick={(e) => {
          handleSaveClick(e, car._id)
        }}>
          <Bookmark size={20} className="text-gray-700" fill={user?.SavedCars?.some(c => c._id === car._id) ? 'currentColor' : 'none'} />
        </div>

        <img
          src={car.image}
          className="h-48 w-full object-cover"
          alt={car.Model}
        />

        <div className="p-2 md:p-4">
          <h3 className="text-xl font-semibold">{`${car.Brand} ${car.Model}`}</h3>
          <p className="text-blue-600 text-lg">
            ₹{car.Expected_price}
          </p>

          <div className="flex text-gray-700 text-sm mt-3">
            <span>{car.KM} km | {car.Fuel_type} | {car.City}</span>
          </div>

          <p className="text-sm text-gray-500 mt-2">Year: {car.Reg_year}</p>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;
