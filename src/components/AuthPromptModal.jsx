// AuthPromptModal.jsx
import React from "react";
import { X } from "lucide-react";

const AuthPromptModal = ({ onLogin, onSignup, onClose }) => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#14161A]/40 backdrop-blur-sm px-4">
            <div className="bg-[#FAFAF7] border border-[#E8E6E1] rounded-2xl max-w-md w-full p-8 relative shadow-xl">
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 p-2 rounded-full text-[#6B6D72] hover:text-[#14161A] hover:bg-[#EFEDE7] transition-colors"
                >
                    <X size={18} strokeWidth={1.5} />
                </button>

                <div className="font-serif text-2xl tracking-tight select-none mb-3">
                    <span className="text-[#14161A]">Car</span>
                    <span className="text-[#B8862E]">Bazaar</span>
                </div>

                <h2 className="text-lg font-medium text-[#14161A] mb-2">
                    Get the most out of CarBazaar
                </h2>
                <p className="text-sm text-[#6B6D72] mb-6 leading-relaxed">
                    Save cars, track your listings, and get picks tailored to your city — log in or create a free account.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={onLogin}
                        className="px-5 py-2.5 text-sm font-medium bg-[#14161A] text-white rounded-full hover:bg-[#B8862E] transition-colors duration-300 cursor-pointer"
                    >
                        Log in
                    </button>
                    <button
                        onClick={onSignup}
                        className="px-5 py-2.5 text-sm font-medium text-[#14161A] border border-[#E8E6E1] rounded-full hover:border-[#B8862E] hover:text-[#B8862E] transition-colors cursor-pointer"
                    >
                        Sign up
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="w-full text-center text-xs text-[#6B6D72] hover:text-[#14161A] mt-5 transition-colors"
                >
                    Continue browsing
                </button>
            </div>
        </div>
    );
};

export default AuthPromptModal;