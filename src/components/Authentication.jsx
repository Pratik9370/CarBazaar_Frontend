import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import carImage from '../assets/images/car.png';
import carImage2 from '../assets/images/car2.jpg';
import Loader from './Loader';
import { useContext } from 'react';
import ContextComponent from '../context/ContextComponent';

const Authentication = ({ authMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/";

  const { sendOTP, fetchLogin, fetchSignup, fetchUser, loading } = useContext(ContextComponent)

  const [formData, setFormData] = useState({
    username: '',
    mobile: null,
    password: null,
  });

  const [mode, setMode] = useState('login'); // 'signup' or 'login'

  useEffect(() => {
    setMode(authMode)
  }, [authMode])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${mode.toUpperCase()} Form submitted:`, formData);
    // Authentication logic
    isSignUp ? await fetchSignup(formData.username, formData.mobile, formData.password) : await fetchLogin(formData.mobile, formData.password)
    navigate(from, { replace: true });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    // Clear form data and hide password toggles when switching modes
    setFormData({ username: '', mobile: '', password: '' });
    setMode(mode === 'signup' ? 'login' : 'signup');
  };

  const isSignUp = mode === 'signup';

  const handleSendOTP = () => {
    if (isSignUp && formData.username.trim().length < 1) {
      return alert("User Name cant be empty")
    }
    (isNaN(formData.mobile) || formData.mobile.length != 10) ? alert("Enter valid mobile number") :
      (isSignUp ? sendOTP(formData.mobile, formData.username) : sendOTP(formData.mobile, ''))
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4">
      {loading?(<Loader/>):(<div className="bg-white border border-[#E8E6E1] rounded-2xl overflow-hidden max-w-5xl w-full flex relative">

        {/* Left Side - Image (Animated) */}
        {/* Note: Tailwind transition classes are used to slide the image */}
        <div
          className={`hidden md:block relative w-[50%] transition-all duration-1000 ease-in-out ${isSignUp ? 'md:translate-x-0' : 'md:translate-x-full'
            }`}
        >
          <img
            src={carImage}
            className={`
      absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms]
      ${isSignUp ? "opacity-100 scale-100" : "opacity-0 scale-105"}
    `}
          />

          {/* Second Image */}
          <img
            src={carImage2}
            className={`
      absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms]
      ${!isSignUp ? "opacity-100 scale-100" : "opacity-0 scale-105"}
    `}
          />

          {/* Ink gradient for legibility + brand tie-in */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14161A]/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="font-serif text-white text-xl leading-snug">
              {isSignUp ? 'Every great drive starts with a great deal.' : 'Back for another ride?'}
            </p>
          </div>
        </div>

        {/* Right Side - Form (Animated) */}
        {/* Note: The form container is animated to slide the opposite direction of the image */}
        <div
          className={`p-8 md:p-12 flex flex-col w-full md:w-[50%] justify-center transition-all duration-800 ease-in-out ${isSignUp ? 'md:translate-x-0' : 'md:-translate-x-full'
            }`}
        >
          <div className="max-w-md mx-auto w-full">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8862E] mb-2 text-center">
              {isSignUp ? 'Create account' : 'Welcome back'}
            </p>
            <h1 className="text-center mb-7 font-serif text-3xl md:text-4xl text-[#14161A] leading-tight">
              {isSignUp ? 'Join the Road to Your Next Car' : "Welcome Back to the Driver's Seat!"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

              {isSignUp && (
                <div className="relative">
                  <input
                    type='text'
                    name="username"
                    placeholder="User name"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border border-[#E8E6E1] bg-[#FAFAF7] rounded-xl px-4 py-3 text-[#14161A] placeholder:text-[#6B6D72]/70 focus:outline-none focus:ring-2 focus:ring-[#B8862E]/40 focus:border-[#B8862E] focus:bg-white transition-colors"
                    required={isSignUp}
                  />
                </div>
              )}

              {/* Mobile no. Input + Send OTP Button */}
              <div className="flex gap-2">
                <input
                  type="phone"
                  name="mobile"
                  placeholder="Mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full border border-[#E8E6E1] bg-[#FAFAF7] rounded-xl px-4 py-3 text-[#14161A] placeholder:text-[#6B6D72]/70 focus:outline-none focus:ring-2 focus:ring-[#B8862E]/40 focus:border-[#B8862E] focus:bg-white transition-colors"
                  required
                />

                <button
                  type="button"
                  className="whitespace-nowrap bg-[#14161A] hover:bg-[#B8862E] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300 disabled:opacity-50"
                  onClick={handleSendOTP}
                  disabled={loading}
                >
                  Send OTP
                </button>
              </div>


              {/* otp Input */}
              <div className="relative">
                <input
                  type={'password'}
                  name="password"
                  placeholder="OTP"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-[#E8E6E1] bg-[#FAFAF7] rounded-xl px-4 py-3 text-[#14161A] placeholder:text-[#6B6D72]/70 focus:outline-none focus:ring-2 focus:ring-[#B8862E]/40 focus:border-[#B8862E] focus:bg-white transition-colors tracking-[0.3em] font-mono"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-base font-medium bg-[#14161A] hover:bg-[#B8862E] text-white py-3.5 rounded-xl mt-6 transition-colors duration-300"
              >
                {isSignUp ? 'Create Account' : 'Log In'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center space-y-3">
              <p className="text-[#6B6D72] text-sm">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={toggleMode} // Use the dedicated toggleMode function
                  className="text-[#B8862E] font-medium hover:text-[#8F6821] ml-1 transition-colors"
                >
                  {isSignUp ? 'Log In' : 'Sign Up'}
                </button>
              </p>
              <div className="flex justify-center gap-6">
                <a className="text-[#6B6D72] hover:text-[#14161A] text-xs transition-colors" href="#">
                  Terms of Service
                </a>
                <a className="text-[#6B6D72] hover:text-[#14161A] text-xs transition-colors" href="#">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default Authentication;