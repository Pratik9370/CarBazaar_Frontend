import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import carImage from '../assets/images/car.png';
import carImage2 from '../assets/images/car2.jpg';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-400 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl overflow-hidden max-w-5xl w-full flex relative">

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
        </div>

        {/* Right Side - Form (Animated) */}
        {/* Note: The form container is animated to slide the opposite direction of the image */}
        <div
          className={`p-8 md:p-12 flex flex-col w-full md:w-[50%] justify-center transition-all duration-800 ease-in-out ${isSignUp ? 'md:translate-x-0' : 'md:-translate-x-full'
            }`}
        >
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-center mb-5 text-4xl font-bold text-gray-800">
              {isSignUp ? 'Join the Road to Your Next Car' : 'Welcome Back to the Driver\'s Seat!'}
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <button
                  type="button"
                  className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-xl font-bold bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-md mt-6 transition duration-300"
              >
                {isSignUp ? 'Create Account' : 'Log In'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center space-y-3">
              <p className="text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={toggleMode} // Use the dedicated toggleMode function
                  className="text-blue-600 font-semibold hover:text-blue-800 ml-1 transition duration-150"
                >
                  {isSignUp ? 'Log In' : 'Sign Up'}
                </button>
              </p>
              <div className="flex justify-center gap-6">
                <a className="text-blue-600 hover:underline text-sm" href="#">
                  Terms of Service
                </a>
                <a className="text-blue-600 hover:underline text-sm" href="#">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;