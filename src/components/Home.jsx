import React from 'react'
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import SearchBox from './SearchBox';
import SpecificCars from './SpecificCars';
import CategorySection from './CategorySection';
import SellCarBox from './SellCarBox';
import { useContext } from 'react';
import ContextComponent from '../context/ContextComponent';
import CarCard from './CarCard';

const Home = () => {

  const { savedCars, cars_in_userCity, user_city, recentlyViewedCars } = useContext(ContextComponent)

  return (
    <div className="min-h-screen bg-[#FAFAF7]">

      {/* Hero Section */}
      <Hero />

      {/* Search Box */}
      <SearchBox />

      {/* Main content: SellCarBox as a fixed left rail on large screens, car sections fill the rest */}
      <div className="mx-auto lg:px-8 mt-8 pb-12">
        <div className="lg:flex lg:justify-start lg:gap-10">

          {/* Left rail — Sell Car */}
          <div className="lg:min-w-70 mb-6 lg:mb-0 min-w-0 lg:sticky top-20 mx-5 lg:mx-0">
            <SellCarBox />
          </div>

          {/* Right column — car listings */}
          <div className=" lg:space-y-8 min-w-0">
            <CategorySection />
            {savedCars?.length > 0 && (<SpecificCars cars={savedCars} heading={"Saved Cars"} />)}
            {recentlyViewedCars?.length > 0 && (<SpecificCars cars={recentlyViewedCars} heading={`Recently viewed cars`} />)}
            <div className='bg-white rounded-2xl border border-[#E8E6E1] pt-6 p-4 min-w-0'>
              <div className="flex items-center justify-between px-5 mb-5">
                <h2 className="font-serif text-xl md:text-2xl text-[#14161A]">Cars available in {user_city}</h2>
                <span className="font-mono text-[11px] uppercase tracking-wide text-[#6B6D72]">
                  {cars_in_userCity.length} {cars_in_userCity.length === 1 ? "car" : "cars"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars_in_userCity?.map((car) => (
                  <CarCard key={car._id} car={car} />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home