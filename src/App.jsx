import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CarListPage from "./components/CarListPage";
import CarDetails from "./components/CarDetails";
import Authentication from "./components/Authentication";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import CarListingForm from "./components/CarListingForm";
import ContextComponent from "./context/ContextComponent";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const {user}=useContext(ContextComponent)
  return (

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carlists" element={<CarListPage/>} />
          <Route path="/cardetails" element={<CarDetails />} />
          <Route path="/authentication/login" element={<Authentication authMode={'login'} />} />
          <Route path="/authentication/signup" element={<Authentication authMode={'signup'} />} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/carlisting" element={<ProtectedRoute><CarListingForm /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  );
}
