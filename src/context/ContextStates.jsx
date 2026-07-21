import React, { useState, useEffect, use } from 'react'
import ContextComponent from './ContextComponent'
import carDataset from '../Data/carDataset'

const ContextStates = ({ children }) => {
  const [bodyType, setBodyType] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [carList, setCarList] = useState([])
  const [carDetails, setCarDetails] = useState({})
  const [user, setUser] = useState({})
  const [savedCars, setSavedCars] = useState([])
  const [registeredCars, setRegisteredCars] = useState([])
  const [recentlyViewedCars, setRecentlyViewedCars] = useState([])
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)
  const [cars_in_userCity, setCars_in_userCity] = useState([])
  const [user_city, setUser_city] = useState()
  const [ip, setIp] = useState("");

  const sendOTP = async (mobile, username) => {
    try {
      setLoading(true)
      const response = await fetch('https://carbazaar-backend-1whv.onrender.com/api/auth/sendOTP', {
        method: 'Post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ mobile, username }),
        credentials: 'include'
      })
      const data = await response.json()
      alert(data.message)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchLogin = async (mobile, otp) => {
    try {
      setLoading(true)
      const response = await fetch('https://carbazaar-backend-1whv.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobile, otp }),
        credentials: 'include'
      })
      const data = await response.json()

      await fetchUser()
      alert(data.message)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchSignup = async (name, mobile, otp) => {
    try {
      setLoading(true)
      const response = await fetch('https://carbazaar-backend-1whv.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, mobile, otp }),
        credentials: 'include'
      })
      const data = await response.json()
      await fetchUser()
      alert(data.message)
      setLoading(false)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchUser = async () => {

    const response = await fetch(
      `https://carbazaar-backend-1whv.onrender.com/api/auth/getUser`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    setUser(data.user);
    setSavedCars(data.saved_cars);
    setRegisteredCars(data.reg_cars);
    setRecentlyViewedCars(data.recentlyViewedCars)
  };

  const fetchCarsInUserCity = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const res = await fetch(
          "https://carbazaar-backend-1whv.onrender.com/api/auth/getCarsInUserCity",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude,
              longitude,
            }),
          }
        );

        const data = await res.json();

        setUser_city(data.City);
        setCars_in_userCity(data.cars_in_userCity);
      },
      async () => {
        const res = await fetch(
          "https://carbazaar-backend-1whv.onrender.com/api/auth/getCarsInUserCity",
          {
            method: "POST",
          }
        );

        const data = await res.json();

        setUser_city(data.City);
        setCars_in_userCity(data.cars_in_userCity);
      }
    );
  };


  const fetchRegisterCar = async (CarDetails) => {
    try {
      const formData = new FormData();
      for (const key in CarDetails) {
        formData.append(key, CarDetails[key]);
      }
      setLoading(true)
      const response = await fetch(
        "https://carbazaar-backend-1whv.onrender.com/api/car/registerCar",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await response.json();
      await fetchUser();
      setLoading(false)
      alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCarList = async (filters) => {
    const response = await fetch("https://carbazaar-backend-1whv.onrender.com/api/car/carList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...filters, search }),
      credentials: "include",
    });

    const data = await response.json();
    await fetchUser()
    setCarList(data.filteredCars || []);
  };

  const saveCar = async (car_id) => {
    const user_id = user._id
    console.log(user_id, car_id)
    const response = await fetch('https://carbazaar-backend-1whv.onrender.com/api/car/saveCar', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ user_id, car_id }),
      credentials: 'include'
    })
    const data = await response.json()
    await fetchUser()
    console.log(data)
  }

  const unsaveCar = async (car_id) => {
    const user_id = user._id
    console.log(user_id, car_id)
    const response = await fetch('https://carbazaar-backend-1whv.onrender.com/api/car/unsaveCar', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ user_id, car_id }),
      credentials: 'include'
    })
    const data = await response.json()
    await fetchUser()
  }

  const addRecentlyViewedCars = async (car_id) => {
    const response = await fetch(`https://carbazaar-backend-1whv.onrender.com/api/car/recentlyViewedCars`, {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ car_id }),
      credentials: 'include'
    })
    const data = await response.json()
    await fetchUser()
  }

  useEffect(() => {
    fetchUser();
    fetchCarsInUserCity();
  }, []);


  const fetchPrediction = async () => {
    const predictionBody = {
      vehicle_age: new Date().getFullYear() - Number(carDetails.Reg_year),
      km_driven: Number(carDetails.KM),
      fuel_type: carDetails.Fuel_type,
      transmission_type: carDetails.Transmission,
      brand: carDetails.Brand,
      model: carDetails.Model,
      engine: carDetails.Engine_capacity,      // Hardcoded for now
      max_power: carDetails.Max_power     // Hardcoded for now
    };
    const response = await fetch(
      "https://carbazaar-backend-1whv.onrender.com/api/car/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(predictionBody),
        credentials: "include"
      }
    );

    const data = await response.json();

    setCarDetails(prev => ({
      ...prev,
      priceRange: data.priceRange
    }));
  };


  useEffect(() => {
    fetchPrediction()
  }, [carDetails])




  return (
    <ContextComponent.Provider value={{ search, setSearch, bodyType, setBodyType, fuelType, setFuelType, sendOTP, fetchLogin, fetchSignup, fetchCarList, fetchRegisterCar, carList, carDetails, setCarDetails, registeredCars, user, saveCar, unsaveCar, savedCars, loading, user_city, cars_in_userCity, addRecentlyViewedCars, recentlyViewedCars, fetchPrediction }}>
      {children}
    </ContextComponent.Provider>
  )
}

export default ContextStates
