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
        Engine_capacity: '',
        Max_power: '',
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

    const fieldClass = "w-full px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAFAF7] text-[#14161A] placeholder:text-[#6B6D72]/70 focus:border-[#B8862E] focus:ring-2 focus:ring-[#B8862E]/30 focus:bg-white outline-none transition-colors";
    const labelClass = "block text-sm font-medium text-[#14161A] mb-1.5";

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#FAFAF7] p-4 py-10">

            <div className="w-full max-w-lg bg-white rounded-2xl border border-[#E8E6E1] p-6 md:p-8">

                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8862E] text-center mb-2">Sell your car</p>
                <h2 className="font-serif text-2xl md:text-3xl text-[#14161A] text-center mb-7">
                    List Your Car
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit} encType="multipart/form-data">

                    {/* Brand */}
                    <div>
                        <label className={labelClass}>
                            Brand
                        </label>
                        <select
                            required
                            name="Brand"
                            value={CarDetails.Brand}
                            onChange={handleBrandChange}
                            className={fieldClass}
                        >
                            <option>Select Brand</option>
                            {carMakes.map((make, index) => { return (<option key={index}>{make}</option>) })}
                        </select>
                    </div>

                    {/* Car Model */}
                    <div>
                        <label className={labelClass}>
                            Model
                        </label>
                        <select
                            required
                            name="Model"
                            value={CarDetails.Model}
                            onChange={handleModelChange}
                            placeholder="e.g. Swift, Creta, Nexon"
                            className={fieldClass}
                        >
                            <option>Select Model</option>
                            {models.map((model, index) => { return (<option key={index}>{model}</option>) })}
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>
                            Variant
                        </label>
                        <select
                            required
                            name="Variant"
                            value={CarDetails.Variant}
                            onChange={handleVariantChange}
                            placeholder="e.g. Swift, Creta, Nexon"
                            className={fieldClass}
                        >
                            <option>Select Variant</option>
                            {variants.map((variant, index) => { return (<option key={index}>{variant.name}</option>) })}
                        </select>
                    </div>

                    {/* Year + KM */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>
                                Registration Year
                            </label>
                            <input
                                type="text"
                                name="Reg_year"
                                value={CarDetails.Reg_year}
                                required
                                onChange={handleChange}
                                placeholder="2018"
                                className={fieldClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                KM Driven
                            </label>
                            <input
                                type="number"
                                name="KM"
                                value={CarDetails.KM}
                                required
                                onChange={handleChange}
                                placeholder="45000"
                                className={fieldClass}
                            />
                        </div>
                    </div>

                    {/* Fuel Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>
                                Body Type
                            </label>
                            <select
                                required
                                name="Body_type"
                                value={CarDetails.Body_type}
                                onChange={handleChange}
                                className={fieldClass}
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

                        <div><label className={labelClass}>
                            Fuel Type
                        </label>
                            <select
                                required
                                name="Fuel_type"
                                value={CarDetails.Fuel_type}
                                onChange={handleChange}
                                className={fieldClass}
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
                        <label className={labelClass}>
                            Transmission
                        </label>
                        <select
                            onChange={handleChange}
                            name="Transmission"
                            value={CarDetails.Transmission}
                            required
                            className={fieldClass}
                        >
                            <option>Select Transmission</option>
                            <option>MT</option>
                            <option>AMT</option>
                            <option>AT</option>
                            <option>CVT</option>
                        </select>
                    </div>

                    {/* Engine Capacity + Max Power */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>
                                Engine Capacity (cc)
                            </label>
                            <input
                                type="number"
                                name="Engine_capacity"
                                value={CarDetails.Engine_capacity}
                                onChange={handleChange}
                                required
                                placeholder="e.g. 1197"
                                className={fieldClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Max Power (bhp)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="Max_power"
                                value={CarDetails.Max_power}
                                onChange={handleChange}
                                required
                                placeholder="e.g. 88.5"
                                className={fieldClass}
                            />
                        </div>
                    </div>

                    {/* Owner Type */}
                    <div>
                        <label className={labelClass}>
                            Owner Type
                        </label>
                        <select
                            required
                            name="Owner-type"
                            value={CarDetails.Owner_type}
                            onChange={handleChange}
                            className={fieldClass}
                        >
                            <option>1st Owner</option>
                            <option>2nd Owner</option>
                            <option>3rd Owner</option>
                            <option>4th Owner or More</option>
                        </select>
                    </div>

                    {/* City */}
                    <div>
                        <label className={labelClass}>
                            City
                        </label>
                        <input
                            type="text"
                            name="City"
                            value={CarDetails.City}
                            onChange={handleChange}
                            required
                            placeholder="Your city"
                            className={fieldClass}
                        />
                    </div>

                    {/* Area/Locality */}
                    <div>
                        <label className={labelClass}>
                            Area / Locality
                        </label>
                        <input
                            type="text"
                            name="Area"
                            value={CarDetails.Area}
                            onChange={handleChange}
                            placeholder="e.g. Baner, Wakad, Kothrud"
                            className={fieldClass}
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className={labelClass}>
                            Expected Price (₹)
                        </label>
                        <input
                            type="number"
                            name="Expected_price"
                            value={CarDetails.Expected_price}
                            onChange={handleChange}
                            required
                            placeholder="Example: 350000"
                            className={fieldClass}
                        />
                    </div>

                    {/* Photos */}
                    <div>
                        <label className={labelClass}>
                            Car Photos
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={async (e) => {
                                setCarDetails({ ...CarDetails, image: e.target.files[0] });
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAFAF7] text-sm text-[#6B6D72] cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#14161A] file:text-white file:text-sm file:font-medium hover:file:bg-[#B8862E] file:transition-colors file:cursor-pointer"
                        />
                    </div>



                    {/* Submit Button */}
                    <button type="submit" className="w-full py-3.5 mt-2 bg-[#14161A] text-white font-medium rounded-xl hover:bg-[#B8862E] transition-colors duration-300 disabled:opacity-50" disabled={loading}>
                        List Your Car
                    </button>

                </form>

            </div>
        </div>
    );
}