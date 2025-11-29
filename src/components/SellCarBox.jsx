import { Link } from "react-router-dom";
import React from "react";
export default function SellCarBox() {
    return (
        <div className="md:max-w-4xl mx-auto mdm:px-6 my-6 relative z-10 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between bg-white shadow-md border border-gray-200 rounded-xl px-6 py-4">

                {/* Text Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Want to Sell Your Car?
                    </h2>
                    <p className="text-sm text-gray-500">
                        Get the best price with instant valuation.
                    </p>
                </div>

                {/* Button */}
                <Link to={'/carlisting'}>
                    <button className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition">
                        Sell Car
                    </button>
                </Link>
            </div>
        </div>
    );
}
