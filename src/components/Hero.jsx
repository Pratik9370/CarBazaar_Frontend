import React from 'react';
import bgImage from "../assets/images/bg.png";

export function Hero() {
    return (
        <section className="relative overflow-hidden min-h-[550px] md:min-h-[700px]">

            {/* Background Image */}
            <img
                src={bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl h-full mx-auto text-center px-4 pt-20 md:pt-28">

                {/* Heading */}
                <h1 className="text-white leading-tight mb-4 text-3xl md:text-5xl font-bold">
                    Upgrade Your Drive With Confidence
                </h1>


                {/* =================== SEARCH BOX =================== */}
                {/* <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg mb-6 flex flex-col md:flex-row gap-3 mt-40">

                    <input
                        type="text"
                        placeholder="Search cars by brand, model or year..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium">
                        Search
                    </button>
                </div> */}

                <div className="mt-10 md:mt-40 w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap">

                    {[
                        { icon: "✔️", text: "Verified Listings" },
                        { icon: "💰", text: "Fair Pricing" },
                        { icon: "🤖", text: "AI-powered Valuation" },
                        { icon: "⭐", text: "Most Trusted" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center bg-white/10 backdrop-blur-md p-5 rounded-2xl 
                 border border-white/20 shadow-lg transition-all duration-300 
                 hover:scale-105 hover:bg-white/20"
                        >
                            <div className="text-2xl">{item.icon}</div>
                            <p className="mt-3 text-white font-semibold text-base md:text-lg">
                                {item.text}
                            </p>
                        </div>
                    ))}

                </div>



            </div>
        </section>
    );
}

export default Hero;
