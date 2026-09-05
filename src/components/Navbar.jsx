// Navbar.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, CircleUser } from "lucide-react";
import { Link } from "react-router-dom";
import ContextComponent from "../context/ContextComponent";

export function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const { user, fetchLogout } = useContext(ContextComponent);

    const handleLogout = async () => {
        const success = await fetchLogout();

        if (success) {
            window.location.href = "/";
        }
    };

    return (
        <header className="bg-[#FAFAF7]/95 backdrop-blur-md py-4 px-6 sticky top-0 z-100 border-b border-[#E8E6E1]">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <div className="font-serif text-2xl tracking-tight select-none">
                    <span className="text-[#14161A]">Car</span>
                    <span className="text-[#B8862E]">Bazaar</span>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-3 items-center">
                    <Link to={'profile'}>
                        <button
                            aria-label="Profile"
                            className="p-2.5 rounded-full text-[#6B6D72] hover:text-[#14161A] hover:bg-[#EFEDE7] transition-colors cursor-pointer"
                        >
                            <CircleUser size={22} strokeWidth={1.5} />
                        </button>
                    </Link>
                    {user ? (<button
                        className="px-5 py-2.5 text-sm font-medium text-[#14161A] border border-[#E8E6E1] rounded-full hover:border-[#B8862E] hover:text-[#B8862E] transition-colors"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>)
                        : (<div>
                            <Link to="/authentication/login">
                                <button className="px-5 py-2.5 text-sm font-medium text-[#14161A] border border-[#E8E6E1] rounded-full hover:border-[#B8862E] hover:text-[#B8862E] transition-colors">
                                    Log in
                                </button>
                            </Link>

                            <Link to="/authentication/signup">
                                <button className="px-5 py-2.5 text-sm font-medium bg-[#14161A] text-white rounded-full hover:bg-[#B8862E] transition-colors duration-300">
                                    Sign up
                                </button>
                            </Link>
                        </div>
                        )}
                </div>

                {/* Mobile Menu Icon */}
                <button
                    className="md:hidden p-2 rounded-full text-[#14161A] hover:bg-[#EFEDE7] transition-colors"
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden border-t border-[#E8E6E1] mt-4 pt-4 px-1 pb-2 space-y-2">
                    <nav className="flex flex-col gap-2">
                        <Link
                            to={'profile'}
                            className="flex items-center gap-3 px-3 py-3 rounded-full text-[#14161A] hover:bg-[#EFEDE7] transition-colors"
                        >
                            <CircleUser size={20} strokeWidth={1.5} />
                            <span className="text-sm font-medium">Profile</span>
                        </Link>

                        {user ? (
                            <button
                                className="w-full px-5 py-2.5 text-sm font-medium text-[#14161A] border border-[#E8E6E1] rounded-full hover:border-[#B8862E] hover:text-[#B8862E] transition-colors"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link to="/authentication/login" className="w-full">
                                    <button className="w-full px-5 py-2.5 text-sm font-medium text-[#14161A] border border-[#E8E6E1] rounded-full hover:border-[#B8862E] hover:text-[#B8862E] transition-colors">
                                        Log in
                                    </button>
                                </Link>

                                <Link to="/authentication/signup" className="w-full">
                                    <button className="w-full px-5 py-2.5 text-sm font-medium bg-[#14161A] text-white rounded-full hover:bg-[#B8862E] transition-colors duration-300">
                                        Sign up
                                    </button>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Navbar;