import React from 'react'
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import SearchBox from './SearchBox';
import SpecificCars from './SpecificCars';
import CategorySection from './CategorySection';
import SellCarBox from './SellCarBox';
import { useContext } from 'react';
import ContextComponent from '../context/ContextComponent';

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
          <div className="lg:min-w-[20vw] mb-6 lg:mb-0 min-w-0 lg:sticky top-20 mx-5 lg:mx-0">
            <SellCarBox />
          </div>

          {/* Right column — car listings */}
          <div className=" lg:space-y-8 min-w-0">
            <CategorySection />
            {savedCars?.length > 0 && (<SpecificCars cars={savedCars} heading={"Saved Cars"} />)}
            {recentlyViewedCars?.length > 0 && (<SpecificCars cars={recentlyViewedCars} heading={`Recently viewed cars`} />)}
            {cars_in_userCity?.length > 0 && (<SpecificCars cars={cars_in_userCity} heading={`Cars available in ${user_city}`} />)}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home