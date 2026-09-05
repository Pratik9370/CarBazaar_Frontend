import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import ContextComponent from "../context/ContextComponent";
import carDataset from "../Data/carDataset";

/* ---------- static option lists ---------- */

const BODY_TYPES = ["Hatchback", "SUV", "Crossover", "MUV/MPV", "Sedan"];

const FUEL_TYPES = ["Petrol", "Diesel", "CNG", "Electric"];
const TRANSMISSIONS = ["MT", "AMT", "AT", "CVT"];
const OWNER_TYPES = ["1st Owner", "2nd Owner", "3rd Owner", "4th Owner or More"];
const INDIAN_STATES = [
    "Andhra Pradesh", "Delhi NCR", "Gujarat", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu",
    "Telangana", "Uttar Pradesh", "West Bengal", "Other"
];

const STEPS = [
    { key: "vehicle", label: "Vehicle" },
    { key: "specs", label: "Specifications" },
    { key: "docs", label: "Location & Docs" },
    { key: "valuation", label: "AI Valuation" },
    { key: "price", label: "Price & Photos" },
    { key: "review", label: "Review" },
];

/* ---------- shared field styling ---------- */

const fieldClass = "w-full px-4 py-3 rounded-xl border border-[#E8E6E1] bg-[#FAFAF7] text-[#14161A] placeholder:text-[#6B6D72]/70 focus:border-[#B8862E] focus:ring-2 focus:ring-[#B8862E]/30 focus:bg-white outline-none transition-colors";
const labelClass = "block text-sm font-medium text-[#14161A] mb-1.5";
const hintClass = "font-mono text-[11px] text-[#6B6D72] mt-1.5";

export default function CarListingForm() {

    const carMakes = Object.keys(carDataset);

    const [models, setModels] = useState([]);
    const [variants, setVariants] = useState([]);
    const [step, setStep] = useState(0);
    const [touched, setTouched] = useState(false);
    
    // Separate refs for front/cover image and additional gallery images
    const frontImageInputRef = useRef(null);
    const galleryInputRef = useRef(null);

    const { fetchRegisterCar, loading } = useContext(ContextComponent);

    const [CarDetails, setCarDetails] = useState({
        // vehicle
        Brand: '',
        Model: '',
        Variant: '',
        Reg_year: '',
        KM: '',
        Owner_type: '1st Owner',
        // specs
        Body_type: '',
        Fuel_type: '',
        Transmission: '',
        Seating_capacity: '',
        Engine_capacity: '',
        Max_power: '',
        Color: '',
        // location & docs
        City: '',
        Area: '',
        RTO_state: '',
        Insurance_valid: '',
        PUC_valid: '',
        // price & valuation
        Expected_price: '',
        priceRange: null, // string formatted price range
    });

    // Dedicated state for front/cover image
    const [frontImage, setFrontImage] = useState(null); // { file, url }
    // Dedicated state for additional gallery images
    const [galleryImages, setGalleryImages] = useState([]); // array of { file, url }

    // AI Valuation loading state
    const [calculatingValuation, setCalculatingValuation] = useState(false);

    useEffect(() => {
        return () => {
            if (frontImage) URL.revokeObjectURL(frontImage.url);
            galleryImages.forEach(img => URL.revokeObjectURL(img.url));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        setCarDetails({ ...CarDetails, [e.target.name]: e.target.value });
    };

    const handleBrandChange = (e) => {
        const selectedBrand = e.target.value;
        const modelList = Object.keys(carDataset[selectedBrand] || {});
        setModels(modelList);
        setVariants([]);
        setCarDetails(prev => ({ ...prev, Brand: selectedBrand, Model: "", Variant: "" }));
    };

    const handleModelChange = (e) => {
        const selectedModel = e.target.value;
        const variantList = carDataset[CarDetails.Brand]?.[selectedModel]?.variants || [];
        setVariants(variantList);
        setCarDetails(prev => ({ ...prev, Model: selectedModel, Variant: "" }));
    };

    const handleVariantChange = (e) => {
        const selectedVariant = e.target.value;
        const variant = variants.find((v) => v.name == selectedVariant);
        if (!variant) return;
        setCarDetails(prev => ({
            ...prev,
            Variant: selectedVariant,
            Body_type: variant.body_type,
            Fuel_type: variant.fuel[0],
            Transmission: variant.transmission[0],
            Seating_capacity: variant.seating,
        }));
    };

    /* ---------- image handling ---------- */

    const handleFrontImageInput = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            if (frontImage) URL.revokeObjectURL(frontImage.url);
            setFrontImage({ file, url: URL.createObjectURL(file) });
        }
        e.target.value = "";
    };

    const removeFrontImage = () => {
        if (frontImage) {
            URL.revokeObjectURL(frontImage.url);
            setFrontImage(null);
        }
    };

    const addGalleryImages = (fileList) => {
        const newOnes = Array.from(fileList)
            .filter(f => f.type.startsWith("image/"))
            .map(f => ({ file: f, url: URL.createObjectURL(f) }));
        setGalleryImages(prev => [...prev, ...newOnes]);
        console.log(galleryImages)
    };

    const handleGalleryInput = (e) => {
        addGalleryImages(e.target.files);
        e.target.value = "";
    };

    const handleGalleryDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files?.length) addGalleryImages(e.dataTransfer.files);
    };

    const removeGalleryImage = (index) => {
        setGalleryImages(prev => {
            const next = [...prev];
            URL.revokeObjectURL(next[index].url);
            next.splice(index, 1);
            return next;
        });
    };

    /* ---------- live API prediction function ---------- */

    const fetchPrediction = async (currentCarState) => {
        setCalculatingValuation(true);
        try {
            const predictionBody = {
                vehicle_age: new Date().getFullYear() - Number(currentCarState.Reg_year),
                km_driven: Number(currentCarState.KM),
                fuel_type: currentCarState.Fuel_type,
                transmission_type: currentCarState.Transmission,
                brand: currentCarState.Brand,
                model: currentCarState.Model,
                engine: Number(currentCarState.Engine_capacity),
                max_power: Number(currentCarState.Max_power)
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

            // Safely parse priceRange object into a readable string
            let formattedRange = "Price range unavailable";
            if (data.priceRange) {
                if (typeof data.priceRange === "string") {
                    formattedRange = data.priceRange;
                } else if (typeof data.priceRange === "object") {
                    const lower = data.priceRange.lowerBound || data.priceRange.min || Object.values(data.priceRange)[0];
                    const upper = data.priceRange.upperBound || data.priceRange.max || Object.values(data.priceRange)[1];
                    if (lower && upper) {
                        formattedRange = `₹${Number(lower).toLocaleString("en-IN")} - ₹${Number(upper).toLocaleString("en-IN")}`;
                    } else {
                        formattedRange = JSON.stringify(data.priceRange);
                    }
                }
            }

            setCarDetails(prev => ({
                ...prev,
                priceRange: formattedRange
            }));
        } catch (error) {
            console.error("Failed to fetch prediction:", error);
            setCarDetails(prev => ({
                ...prev,
                priceRange: "Unable to calculate pricing"
            }));
        } finally {
            setCalculatingValuation(false);
        }
    };

    /* ---------- step validation ---------- */

    const stepValid = {
        vehicle: !!(CarDetails.Brand && CarDetails.Model && CarDetails.Variant && CarDetails.Reg_year && CarDetails.KM),
        specs: !!(CarDetails.Body_type && CarDetails.Fuel_type && CarDetails.Transmission && CarDetails.Engine_capacity && CarDetails.Max_power && CarDetails.Color),
        docs: !!(CarDetails.City && CarDetails.RTO_state),
        valuation: true, // informational step
        price: !!(CarDetails.Expected_price && frontImage),
        review: true,
    };

    const currentKey = STEPS[step].key;
    const canAdvance = stepValid[currentKey];

    const goNext = async () => {
        setTouched(true);
        if (!canAdvance) return;
        setTouched(false);
        
        const nextStepIndex = step + 1;
        const nextKey = STEPS[nextStepIndex]?.key;

        // If moving into the AI Valuation step, fetch live backend prediction
        if (nextKey === "valuation") {
            await fetchPrediction(CarDetails);
        }
        
        setStep(s => Math.min(s + 1, STEPS.length - 1));
    };

    const goBack = () => {
        setTouched(false);
        setStep(s => Math.max(s - 1, 0));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!stepValid.vehicle || !stepValid.specs || !stepValid.docs || !stepValid.price) return;
        
        // Combine front image and gallery images into final payload structure
        const allImages = galleryImages.map(img => img.file);

        const payload = {
            ...CarDetails,
            image: frontImage?.file || null,      // front/cover image
            images: allImages,                     // full gallery array including front image
        };
        fetchRegisterCar(payload);
    };

    /* ---------- render ---------- */

    return (
        <div className="min-h-screen bg-[#FAFAF7] py-10 px-4 flex justify-center">
            <div className="w-full max-w-2xl">

                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B8862E] text-center mb-2">Sell your car</p>
                <h2 className="font-serif text-2xl md:text-3xl text-[#14161A] text-center mb-8">List Your Car</h2>

                <Stepper steps={STEPS} current={step} completed={stepValid} onJump={(i) => i < step && setStep(i)} />

                <form
                    className="bg-white rounded-2xl border border-[#E8E6E1] p-6 md:p-8 mt-6"
                    onSubmit={handleSubmit}
                >
                    {currentKey === "vehicle" && (
                        <VehicleStep
                            CarDetails={CarDetails}
                            carMakes={carMakes}
                            models={models}
                            variants={variants}
                            handleBrandChange={handleBrandChange}
                            handleModelChange={handleModelChange}
                            handleVariantChange={handleVariantChange}
                            handleChange={handleChange}
                        />
                    )}

                    {currentKey === "specs" && (
                        <SpecsStep CarDetails={CarDetails} handleChange={handleChange} />
                    )}

                    {currentKey === "docs" && (
                        <DocsStep CarDetails={CarDetails} handleChange={handleChange} />
                    )}

                    {currentKey === "valuation" && (
                        <ValuationStep
                            CarDetails={CarDetails}
                            calculatingValuation={calculatingValuation}
                            onRefresh={() => fetchPrediction(CarDetails)}
                        />
                    )}

                    {currentKey === "price" && (
                        <PriceStep
                            CarDetails={CarDetails}
                            handleChange={handleChange}
                            frontImage={frontImage}
                            frontImageInputRef={frontImageInputRef}
                            handleFrontImageInput={handleFrontImageInput}
                            removeFrontImage={removeFrontImage}
                            galleryImages={galleryImages}
                            galleryInputRef={galleryInputRef}
                            handleGalleryInput={handleGalleryInput}
                            handleGalleryDrop={handleGalleryDrop}
                            removeGalleryImage={removeGalleryImage}
                        />
                    )}

                    {currentKey === "review" && (
                        <ReviewStep CarDetails={CarDetails} frontImage={frontImage} galleryImages={galleryImages} />
                    )}

                    {touched && !canAdvance && (
                        <p className="font-mono text-[11px] text-[#B8452E] mt-4">
                            Please fill the required fields marked * before continuing.
                        </p>
                    )}

                    {/* Nav */}
                    <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#E8E6E1]">
                        {step > 0 && (
                            <button
                                type="button"
                                onClick={goBack}
                                className="flex-1 py-3.5 rounded-xl border border-[#E8E6E1] text-[#14161A] font-medium hover:border-[#B8862E] transition-colors"
                            >
                                Back
                            </button>
                        )}

                        {step < STEPS.length - 1 ? (
                            <button
                                type="button"
                                onClick={goNext}
                                className="flex-1 py-3.5 rounded-xl bg-[#14161A] text-white font-medium hover:bg-[#B8862E] transition-colors duration-300"
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3.5 rounded-xl bg-[#14161A] text-white font-medium hover:bg-[#B8862E] transition-colors duration-300 disabled:opacity-50"
                            >
                                {loading ? "Listing your car..." : "List Your Car"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ---------- stepper ---------- */

function Stepper({ steps, current, completed, onJump }) {
    return (
        <div className="flex items-center">
            {steps.map((s, i) => {
                const isDone = i < current;
                const isActive = i === current;
                return (
                    <React.Fragment key={s.key}>
                        <button
                            type="button"
                            onClick={() => onJump(i)}
                            className="flex flex-col items-center gap-1.5 group"
                        >
                            <span
                                className={
                                    "w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border transition-colors " +
                                    (isActive
                                        ? "bg-[#14161A] border-[#14161A] text-white"
                                        : isDone
                                            ? "bg-[#B8862E] border-[#B8862E] text-white"
                                            : "bg-[#FAFAF7] border-[#E8E6E1] text-[#6B6D72]")
                                }
                            >
                                {isDone ? "✓" : i + 1}
                            </span>
                            <span className={"font-mono text-[10px] uppercase tracking-wide hidden sm:block " + (isActive ? "text-[#14161A]" : "text-[#6B6D72]")}>
                                {s.label}
                            </span>
                        </button>
                        {i < steps.length - 1 && (
                            <div className={"flex-1 h-px mx-1 " + (i < current ? "bg-[#B8862E]" : "bg-[#E8E6E1]")} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

/* ---------- step 1: vehicle ---------- */

function VehicleStep({ CarDetails, carMakes, models, variants, handleBrandChange, handleModelChange, handleVariantChange, handleChange }) {
    return (
        <div className="space-y-5">
            <StepHeading title="Vehicle details" subtitle="Tell us which car you're selling" />

            <div>
                <label className={labelClass}>Brand *</label>
                <select required name="Brand" value={CarDetails.Brand} onChange={handleBrandChange} className={fieldClass}>
                    <option value="">Select Brand</option>
                    {carMakes.map((make, i) => <option key={i}>{make}</option>)}
                </select>
            </div>

            <div>
                <label className={labelClass}>Model *</label>
                <select required name="Model" value={CarDetails.Model} onChange={handleModelChange} className={fieldClass} disabled={!CarDetails.Brand}>
                    <option value="">Select Model</option>
                    {models.map((model, i) => <option key={i}>{model}</option>)}
                </select>
            </div>

            <div>
                <label className={labelClass}>Variant *</label>
                <select required name="Variant" value={CarDetails.Variant} onChange={handleVariantChange} className={fieldClass} disabled={!CarDetails.Model}>
                    <option value="">Select Variant</option>
                    {variants.map((variant, i) => <option key={i}>{variant.name}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Registration Year *</label>
                    <input type="text" name="Reg_year" value={CarDetails.Reg_year} required onChange={handleChange} placeholder="2018" className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass}>KM Driven *</label>
                    <input type="number" name="KM" value={CarDetails.KM} required onChange={handleChange} placeholder="45000" className={fieldClass} />
                </div>
            </div>

            <div>
                <label className={labelClass}>Owner Type *</label>
                <select required name="Owner_type" value={CarDetails.Owner_type} onChange={handleChange} className={fieldClass}>
                    {OWNER_TYPES.map((o, i) => <option key={i}>{o}</option>)}
                </select>
            </div>
        </div>
    );
}

/* ---------- step 2: specs ---------- */

function SpecsStep({ CarDetails, handleChange }) {
    return (
        <div className="space-y-5">
            <StepHeading title="Specifications" subtitle="Confirm the details pulled from your variant, and fill in the rest" />

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Body Type *</label>
                    <select required name="Body_type" value={CarDetails.Body_type} onChange={handleChange} className={fieldClass}>
                        <option value="">Select Body Type</option>
                        {BODY_TYPES.map((b, i) => <option key={i}>{b}</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Fuel Type *</label>
                    <select required name="Fuel_type" value={CarDetails.Fuel_type} onChange={handleChange} className={fieldClass}>
                        <option value="">Select Fuel Type</option>
                        {FUEL_TYPES.map((f, i) => <option key={i}>{f}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Transmission *</label>
                    <select required name="Transmission" value={CarDetails.Transmission} onChange={handleChange} className={fieldClass}>
                        <option value="">Select Transmission</option>
                        {TRANSMISSIONS.map((t, i) => <option key={i}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Seating Capacity</label>
                    <input type="number" name="Seating_capacity" value={CarDetails.Seating_capacity} onChange={handleChange} placeholder="5" className={fieldClass} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Engine Capacity (cc) *</label>
                    <input type="number" name="Engine_capacity" value={CarDetails.Engine_capacity} onChange={handleChange} required placeholder="e.g. 1197" className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass}>Max Power (bhp) *</label>
                    <input type="number" step="0.1" name="Max_power" value={CarDetails.Max_power} onChange={handleChange} required placeholder="e.g. 88.5" className={fieldClass} />
                </div>
            </div>

            <div>
                <label className={labelClass}>Color *</label>
                <input type="text" name="Color" value={CarDetails.Color} onChange={handleChange} required placeholder="e.g. Pearl White" className={fieldClass} />
            </div>
        </div>
    );
}

/* ---------- step 3: location & docs ---------- */

function DocsStep({ CarDetails, handleChange }) {
    return (
        <div className="space-y-5">
            <StepHeading title="Location & documents" subtitle="Buyers check registration and validity before viewing" />

            <div>
                <label className={labelClass}>City *</label>
                <input type="text" name="City" value={CarDetails.City} onChange={handleChange} required placeholder="Your city" className={fieldClass} />
            </div>

            <div>
                <label className={labelClass}>Area / Locality</label>
                <input type="text" name="Area" value={CarDetails.Area} onChange={handleChange} placeholder="e.g. Baner, Wakad, Kothrud" className={fieldClass} />
            </div>

            <div>
                <label className={labelClass}>RTO / Registration State *</label>
                <select required name="RTO_state" value={CarDetails.RTO_state} onChange={handleChange} className={fieldClass}>
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((s, i) => <option key={i}>{s}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Insurance Valid Till</label>
                    <input type="date" name="Insurance_valid" value={CarDetails.Insurance_valid} onChange={handleChange} className={fieldClass} />
                </div>
                <div>
                    <label className={labelClass}>PUC Valid Till</label>
                    <input type="date" name="PUC_valid" value={CarDetails.PUC_valid} onChange={handleChange} className={fieldClass} />
                </div>
            </div>
            <p className={hintClass}>Leave insurance/PUC blank if you're unsure — you can update this after listing.</p>
        </div>
    );
}

/* ---------- step 4: ai valuation ---------- */

function ValuationStep({ CarDetails, calculatingValuation, onRefresh }) {
    return (
        <div className="space-y-6 text-center py-4">
            <StepHeading 
                title="AI Market Valuation" 
                subtitle="Based on market trends, condition, and vehicle specifications provided" 
            />

            {calculatingValuation ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                    <div className="w-10 h-10 border-4 border-[#B8862E] border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-mono text-xs text-[#6B6D72] uppercase tracking-wider">Analyzing market pricing data...</p>
                </div>
            ) : (
                <div className="bg-[#FAFAF7] border border-[#E8E6E1] rounded-2xl p-6 max-w-md mx-auto space-y-4">
                    <p className="font-mono text-[11px] text-[#B8862E] uppercase tracking-wider">AI Estimated Range</p>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#14161A]">
                        {CarDetails.priceRange || "Calculating..."}
                    </h3>
                    <button
                        type="button"
                        onClick={onRefresh}
                        className="text-[11px] font-mono text-[#B8862E] underline hover:text-[#14161A] pt-2"
                    >
                        Recalculate Valuation
                    </button>
                </div>
            )}

            <p className={hintClass}>You can set your own price in the next step based on this recommendation.</p>
        </div>
    );
}

/* ---------- step 5: price & photos ---------- */

function PriceStep({ CarDetails, handleChange, frontImage, frontImageInputRef, handleFrontImageInput, removeFrontImage, galleryImages, galleryInputRef, handleGalleryInput, handleGalleryDrop, removeGalleryImage }) {
    return (
        <div className="space-y-6">
            <StepHeading title="Price & photos" subtitle="Set your price and upload photos of your car" />

            <div>
                <label className={labelClass}>Expected Price (₹) *</label>
                <input type="number" name="Expected_price" value={CarDetails.Expected_price} onChange={handleChange} required placeholder="Example: 350000" className={fieldClass} />
            </div>

            {/* Front / Cover Image Section */}
            <div>
                <label className={labelClass}>Front View / Cover Photo *</label>
                {frontImage ? (
                    <div className="relative rounded-xl overflow-hidden border border-[#E8E6E1] aspect-video max-h-48 group">
                        <img src={frontImage.url} alt="Cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                type="button"
                                onClick={removeFrontImage}
                                className="text-white text-[10px] font-mono uppercase bg-[#B8452E] px-3 py-1.5 rounded-md hover:bg-[#B8452E]/90"
                            >
                                Change Front Photo
                            </button>
                        </div>
                        <span className="absolute top-2 left-2 bg-[#B8862E] text-white font-mono text-[9px] uppercase tracking-wide px-2.5 py-1 rounded-full">
                            Cover Image
                        </span>
                    </div>
                ) : (
                    <div
                        onClick={() => frontImageInputRef.current.click()}
                        className="border-2 border-dashed border-[#E8E6E1] rounded-xl p-6 text-center cursor-pointer hover:border-[#B8862E] transition-colors bg-[#FAFAF7]"
                    >
                        <p className="text-sm text-[#14161A] font-medium">Click to upload main front view photo</p>
                        <p className={hintClass}>A clear front angle gets significantly more buyer clicks.</p>
                        <input
                            ref={frontImageInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFrontImageInput}
                            className="hidden"
                        />
                    </div>
                )}
            </div>

            {/* Additional Gallery Photos Section */}
            <div>
                <label className={labelClass}>Additional Gallery Photos</label>

                <div
                    onClick={() => galleryInputRef.current.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleGalleryDrop}
                    className="border-2 border-dashed border-[#E8E6E1] rounded-xl p-6 text-center cursor-pointer hover:border-[#B8862E] transition-colors bg-[#FAFAF7]"
                >
                    <p className="text-sm text-[#14161A] font-medium">Click to upload or drag rear, interior & side photos</p>
                    <p className={hintClass}>Add multiple angles to build buyer trust.</p>
                    <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryInput}
                        className="hidden"
                    />
                </div>

                {galleryImages.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                        {galleryImages.map((img, i) => (
                            <div key={img.url} className="relative group rounded-xl overflow-hidden border border-[#E8E6E1] aspect-square">
                                <img src={img.url} alt={`Gallery photo ${i + 1}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => removeGalleryImage(i)}
                                        className="text-white text-[10px] font-mono uppercase bg-[#B8452E]/90 px-2 py-1 rounded-md hover:bg-[#B8452E]"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ---------- step 6: review ---------- */

function ReviewStep({ CarDetails, frontImage, galleryImages }) {
    const totalImagesCount = (frontImage ? 1 : 0) + galleryImages.length;
    
    const rows = [
        ["Brand / Model", `${CarDetails.Brand} ${CarDetails.Model}`],
        ["Variant", CarDetails.Variant],
        ["Reg. Year / KM", `${CarDetails.Reg_year} · ${CarDetails.KM} km`],
        ["Owner", CarDetails.Owner_type],
        ["Body / Fuel / Transmission", `${CarDetails.Body_type} · ${CarDetails.Fuel_type} · ${CarDetails.Transmission}`],
        ["Engine / Power", `${CarDetails.Engine_capacity} cc · ${CarDetails.Max_power} bhp`],
        ["Color", CarDetails.Color],
        ["Location", `${CarDetails.Area ? CarDetails.Area + ", " : ""}${CarDetails.City} (${CarDetails.RTO_state})`],
        ["Expected Price", CarDetails.Expected_price ? `₹${Number(CarDetails.Expected_price).toLocaleString("en-IN")}` : ""],
        ["Photos", `${totalImagesCount} uploaded`],
    ];

    return (
        <div className="space-y-6">
            <StepHeading title="Review your listing" subtitle="Double check everything before it goes live" />

            {frontImage && (
                <img src={frontImage.url} alt="Cover" className="w-full aspect-video object-cover rounded-xl border border-[#E8E6E1]" />
            )}

            <dl className="divide-y divide-[#E8E6E1] border border-[#E8E6E1] rounded-xl overflow-hidden">
                {rows.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 px-4 py-3 bg-white">
                        <dt className="font-mono text-[11px] uppercase tracking-wide text-[#6B6D72]">{label}</dt>
                        <dd className="text-sm text-[#14161A] text-right">{value || "—"}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

/* ---------- shared heading ---------- */

function StepHeading({ title, subtitle }) {
    return (
        <div className="mb-6">
            <h3 className="font-serif text-xl text-[#14161A]">{title}</h3>
            <p className="text-sm text-[#6B6D72] mt-1">{subtitle}</p>
        </div>
    );
}