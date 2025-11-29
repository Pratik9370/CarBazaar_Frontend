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

  const {savedCars}= useContext(ContextComponent)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <Hero />

      {/* Search Box */}
      <SearchBox />
      <SellCarBox />
      {/* Car Listings Section */}
      <CategorySection />
      {savedCars?.length>0&&(<SpecificCars cars={savedCars} heading={"Saved Cars"} />)}
    </div>
  );
}

export default Home
