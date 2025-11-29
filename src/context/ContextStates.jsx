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
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)

  const sendOTP = async (mobile, username) => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/auth/sendOTP', {
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
      const response = await fetch('http://localhost:3000/api/auth/login', {
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
      const response = await fetch('http://localhost:3000/api/auth/signup', {
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
    const response = await fetch(`http://localhost:3000/api/auth/getUser`, {
      method: 'GET',
      headers: {
        'Content-tupe': 'application/json'
      },
      credentials: 'include'
    })
    const data = await response.json()
    setUser(data.user)
    setSavedCars(data.saved_cars)
    setRegisteredCars(data.reg_cars)
  }

  const fetchRegisterCar = async (CarDetails) => {
  try {
    const formData = new FormData();
    for (const key in CarDetails) {
      formData.append(key, CarDetails[key]);
    }
    setLoading(true)
    const response = await fetch(
      "http://localhost:3000/api/car/registerCar",
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
    const response = await fetch("http://localhost:3000/api/car/carList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...filters,search}),
      credentials: "include",
    });

    const data = await response.json();
    await fetchUser()
    setCarList(data.filteredCars || []);
  };

  const saveCar = async (car_id) => {
    const user_id = user._id
    console.log(user_id, car_id)
    const response = await fetch('http://localhost:3000/api/car/saveCar', {
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
    const response = await fetch('http://localhost:3000/api/car/unsaveCar', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({user_id, car_id}),
      credentials: 'include'
    })
    const data = await response.json()
    await fetchUser()
  }

  useEffect(() => {
    fetchUser()
  }, [])
  


  return (
    <ContextComponent.Provider value={{ search, setSearch, bodyType, setBodyType, fuelType, setFuelType, sendOTP, fetchLogin, fetchSignup, fetchCarList, fetchRegisterCar, carList, carDetails, setCarDetails, registeredCars, user, saveCar, unsaveCar, savedCars, loading }}>
      {children}
    </ContextComponent.Provider>
  )
}

export default ContextStates
