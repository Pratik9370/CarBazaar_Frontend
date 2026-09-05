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

    const response = await fetch(
      `http://localhost:3000/api/auth/getUser`,
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
          "http://localhost:3000/api/auth/getCarsInUserCity",
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
          "http://localhost:3000/api/auth/getCarsInUserCity",
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

      // Add normal car details
      for (const key in CarDetails) {
        if (key !== "image" && key !== "images") {
          formData.append(key, CarDetails[key]);
        }
      }

      // Front image
      if (CarDetails.image) {
        formData.append("image", CarDetails.image);
      }

      // Additional images
      if (CarDetails.images) {
        CarDetails.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/api/car/registerCar",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log("Images:", CarDetails.images);

      await fetchUser();

      setLoading(false);

      alert(data.message);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchCarList = async (filters) => {
    setLoading(true)
    const response = await fetch("http://localhost:3000/api/car/carList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters), // filters already includes `search` from the caller
      credentials: "include",
    });

    const data = await response.json();
    await fetchUser()
    setCarList(data.filteredCars || []);
    setLoading(false)
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
      body: JSON.stringify({ user_id, car_id }),
      credentials: 'include'
    })
    const data = await response.json()
    await fetchUser()
  }

  const deleteCar = async (car_id) => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3000/api/car/deleteCar/${car_id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete car");
      }

      console.log(data.message);

      // Remove deleted car from car list
      setCarList((prevCars) =>
        prevCars.filter((car) => car._id !== car_id)
      );

      // Update user's RegisteredCars / SavedCars
      await fetchUser();

      alert(data.message);

    } catch (error) {
      console.error("Delete car error:", error);
      alert(error.message || "Failed to delete car");
    } finally {
      setLoading(false);
    }
  };


  const addRecentlyViewedCars = async (car_id) => {
    const response = await fetch(`http://localhost:3000/api/car/recentlyViewedCars`, {
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
    fetch("https://carbazaar-ml-model.onrender.com")
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }, []);


  const fetchPrediction = async (car) => {

    const predictionBody = {
      vehicle_age: new Date().getFullYear() - Number(car.Reg_year),
      km_driven: Number(car.KM),
      fuel_type: car.Fuel_type,
      transmission_type: car.Transmission,
      brand: car.Brand,
      model: car.Model,
      engine: Number(car.Engine_capacity),
      max_power: Number(car.Max_power)
    };

    const response = await fetch(
      "http://localhost:3000/api/car/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(predictionBody)
      }
    );

    const data = await response.json();

    setCarDetails({
      ...car,
      priceRange: data.priceRange
    });
  };

  const fetchLogout = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      setLoading(false);
      setUser(null)
      return true;
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ContextComponent.Provider value={{ search, setSearch, bodyType, setBodyType, fuelType, setFuelType, sendOTP, fetchLogin, fetchSignup, fetchCarList, fetchRegisterCar, carList, carDetails, setCarDetails, registeredCars, user, saveCar, unsaveCar, savedCars, loading, setLoading, user_city, cars_in_userCity, addRecentlyViewedCars, recentlyViewedCars, fetchPrediction, fetchLogout, deleteCar }}>
      {children}
    </ContextComponent.Provider>
  )
}

export default ContextStates
