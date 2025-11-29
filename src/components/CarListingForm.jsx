import React from "react";
import { useState, useContext } from "react";
import ContextComponent from "../context/ContextComponent";
import { useEffect } from "react";
import carDataset from "../Data/carDataset";

export default function ListingForm() {

    const carMakes = Object.keys(carDataset)

    const [models, setModels] = useState([]);
    const [variants, setVariants] = useState([]);


    const { fetchRegisterCar, loading } = useContext(ContextComponent)

    const [CarDetails, setCarDetails] = useState({
        Brand: '',
        Model: '',
        Variant: '',
        Body_type: '',
        Reg_year: '',
        KM: '',
        Fuel_type: '',
        Transmission: '',
        Seating_capacity: '',
        Owner_type: '1st Owner',
        City: '',
        Area: '',
        Expected_price: '',
        image: null
    })

    const handleChange = (e) => {
        setCarDetails({ ...CarDetails, [e.target.name]: e.target.value })
    }

    const handleBrandChange = (e) => {
        const selectedBrand = e.target.value;

        setCarDetails({ ...CarDetails, Brand: selectedBrand });

        const modelList = Object.keys(carDataset[selectedBrand] || {});
        setModels(modelList);

        setVariants([]);
        setCarDetails(prev => ({ ...prev, Model: "", Variant: "" }));
    };


    const handleModelChange = (e) => {
        const selectedModel = e.target.value;

        setCarDetails({ ...CarDetails, Model: selectedModel });

        const variantList = carDataset[CarDetails.Brand]?.[selectedModel]?.variants || [];

        setVariants(variantList);

        setCarDetails(prev => ({ ...prev, Variant: "" }));
    };


    const handleVariantChange = (e) => {
        const selectedVariant = e.target.value

        const variant = variants.find((v) => v.name == selectedVariant)
        const Body_type = variant.body_type
        const Fuel_type = variant.fuel[0]
        const Transmission = variant.transmission[0]
        const Seating_capacity = variant.seating
        setCarDetails({ ...CarDetails, [e.target.name]: selectedVariant, Body_type: Body_type, Fuel_type: Fuel_type, Transmission: Transmission, Seating_capacity: Seating_capacity })
        console.log(Body_type, Fuel_type, Transmission)
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(CarDetails)
        fetchRegisterCar(CarDetails)
    }


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6 border border-gray-200">

                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    List Your Car
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">

                    {/* Brand */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Brand
                        </label>
                        <select
                            required
                            name="Brand"
                            value={CarDetails.Brand}
                            onChange={handleBrandChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                        >
                            <option>Select Brand</option>
                            {carMakes.map((make, index) => { return (<option key={index}>{make}</option>) })}
                        </select>
                    </div>

                    {/* Car Model */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Model
                        </label>
                        <select
                            required
                            name="Model"
                            value={CarDetails.Model}
                            onChange={handleModelChange}
                            placeholder="e.g. Swift, Creta, Nexon"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                        >
                            <option>Select Model</option>
                            {models.map((model, index) => { return (<option key={index}>{model}</option>) })}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Variant
                        </label>
                        <select
                            required
                            name="Variant"
                            value={CarDetails.Variant}
                            onChange={handleVariantChange}
                            placeholder="e.g. Swift, Creta, Nexon"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                        >
                            <option>Select Variant</option>
                            {variants.map((variant, index) => { return (<option key={index}>{variant.name}</option>) })}
                        </select>
                    </div>

                    {/* Year + KM */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Registration Year
                            </label>
                            <input
                                type="text"
                                name="Reg_year"
                                value={CarDetails.Reg_year}
                                required
                                onChange={handleChange}
                                placeholder="2018"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                KM Driven
                            </label>
                            <input
                                type="number"
                                name="KM"
                                value={CarDetails.KM}
                                required
                                onChange={handleChange}
                                placeholder="45000"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 
                focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                            />
                        </div>
                    </div>

                    {/* Fuel Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Body Type
                            </label>
                            <select
                                required
                                name="Body_type"
                                value={CarDetails.Body_type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                            >
                                <option>Select Body Type</option>
                                <option>Hatchback</option>
                                <option>Premium Hatchback</option>
                                <option>SUV</option>
                                <option>Compact SUV</option>
                                <option>Micro SUV</option>
                                <option>MUV</option>
                                <option>Sedan</option>
                                <optiion>Compact Sedan</optiion>
                            </select>
                        </div>

                        <div><label className="block text-sm font-medium text-gray-700 mb-1">
                            Fuel Type
                        </label>
                            <select
                                required
                                name="Fuel_type"
                                value={CarDetails.Fuel_type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                            >
                                <option>Select Fuel Type</option>
                                <option>Petrol</option>
                                <option>Diesel</option>
                                <option>CNG</option>
                                <option>Electric</option>
                            </select></div>
                    </div>

                    {/* Transmission */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Transmission
                        </label>
                        <select
                            onChange={handleChange}
                            name="Transmission"
                            value={CarDetails.Transmission}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                        >
                            <option>Select Transmission</option>
                            <option>MT</option>
                            <option>AMT</option>
                            <option>AT</option>
                            <option>CVT</option>
                        </select>
                    </div>

                    {/* Owner Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Owner Type
                        </label>
                        <select
                            required
                            name="Owner-type"
                            value={CarDetails.Owner_type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                        >
                            <option>1st Owner</option>
                            <option>2nd Owner</option>
                            <option>3rd Owner</option>
                            <option>4th Owner or More</option>
                        </select>
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                        </label>
                        <input
                            type="text"
                            name="City"
                            value={CarDetails.City}
                            onChange={handleChange}
                            required
                            placeholder="Your city"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                        />
                    </div>

                    {/* Area/Locality */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Area / Locality
                        </label>
                        <input
                            type="text"
                            name="Area"
                            value={CarDetails.Area}
                            onChange={handleChange}
                            placeholder="e.g. Baner, Wakad, Kothrud"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expected Price (₹)
                        </label>
                        <input
                            type="number"
                            name="Expected_price"
                            value={CarDetails.Expected_price}
                            onChange={handleChange}
                            required
                            placeholder="Example: 350000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 
              focus:border-orange-500 focus:ring-2 focus:ring-orange-300 outline-none"
                        />
                    </div>

                    {/* Photos */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Car Photos
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={async (e) => {
                                setCarDetails({...CarDetails, image: e.target.files[0]});
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white cursor-pointer"
                        />
                    </div>

                    

                    {/* Submit Button */}
                    <button type="submit" className="w-full py-3 mt-2 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition" disabled={loading}>
                        List Your Car
                    </button>

                </form>

            </div>
        </div>
    );
}
