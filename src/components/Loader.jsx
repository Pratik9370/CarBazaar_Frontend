import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/car-loader.json";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] bg-[#FAFAF7]">
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-72 md:w-96"
      />

      <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-[#6B6D72]">
        Loading
      </p>
    </div>
  );
}