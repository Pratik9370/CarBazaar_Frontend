import React from 'react';
import bgImage from "../assets/images/bg.png";

export function Hero() {
    return (
        <section className="relative overflow-hidden min-h-[500px] md:min-h-[640px]">

            {/* Background Image */}
            <img
                src={bgImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#14161A]/70 via-[#14161A]/40 to-[#14161A]/75"></div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl h-full mx-auto text-center px-4 pt-24 md:pt-32 flex flex-col items-center">

                {/* Eyebrow */}
                <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-mono uppercase tracking-[0.2em] text-[#E8C77E] mb-5 border border-white/25 rounded-full px-4 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8862E]"></span>
                    Trusted by thousands of buyers
                </span>

                {/* Heading */}
                <h1 className="font-serif text-white leading-[1.1] mb-4 text-4xl md:text-6xl">
                    Upgrade Your Drive
                    <br />
                    With Confidence
                </h1>

                <p className="text-white/70 text-sm md:text-lg max-w-md mx-auto">
                    Buy and sell quality used cars with transparent pricing and verified sellers.
                </p>

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

                



            </div>
        </section>
    );
}

export default Hero;