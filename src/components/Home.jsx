import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import SearchBox from './SearchBox';
import SpecificCars from './SpecificCars';
import CategorySection from './CategorySection';
import SellCarBox from './SellCarBox';
import ContextComponent from '../context/ContextComponent';
import CarCard from './CarCard';
import AuthPromptModal from './AuthPromptModal';

const Home = () => {
  const { savedCars, cars_in_userCity, user_city, recentlyViewedCars, user } = useContext(ContextComponent)
  const navigate = useNavigate()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)

  useEffect(() => {
    if (!user && !sessionStorage.getItem('authPromptShown')) {
      setShowAuthPrompt(true)
    }
  }, [user])

  const dismissPrompt = () => {
    sessionStorage.setItem('authPromptShown', 'true')
    setShowAuthPrompt(false)
  }

  const handleLogin = () => {
    dismissPrompt()
    navigate('/authentication/login')
  }

  const handleSignup = () => {
    dismissPrompt()
    navigate('/authentication/signup')
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {showAuthPrompt && (
        <AuthPromptModal
          onLogin={handleLogin}
          onSignup={handleSignup}
          onClose={dismissPrompt}
        />
      )}

      {/* Hero Section */}
      <Hero />

      {/* Search Box */}
      <SearchBox />

      <div className="mx-auto lg:px-8 mt-8 pb-12">
        <div className="lg:flex lg:justify-start lg:gap-10">
          <div className="lg:w-70 lg:min-w-70 lg:max-w-70 shrink-0 mb-6 lg:mb-0 min-w-0 lg:sticky top-20 mx-5 lg:mx-0">
            <SellCarBox />
          </div>

          <div className="space-y-2 lg:space-y-8 min-w-0">
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