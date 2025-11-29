import React, { useState } from "react";
import { Menu, X, CircleUser } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="bg-white py-4 px-6 sticky top-0 z-100 shadow-xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <div className="text-2xl font-bold tracking-tight">
                    <span className="text-gray-800">Llec</span>
                    <span className="text-orange-500">ar</span>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-4 items-center">
                    <Link to={'profile'}>
                        <button className="pt-2 cursor-pointer">
                            <CircleUser size={30} />
                        </button>
                    </Link>
                    <Link to="/authentication/login">
                        <button className="px-5 py-2 border border-gray-400 rounded-lg hover:bg-gray-100">
                            Login
                        </button>
                    </Link>

                    <Link to="/authentication/signup">
                        <button className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
                            Signup
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-4">
                    <nav>
                        <Link to={'profile'}>
                            <button className="pt-2 cursor-pointer">
                                <CircleUser size={30} />
                            </button>
                        </Link>
                        <Link to="/authentication/login">
                            <button className="w-full py-2 border border-gray-400 rounded-lg">
                                Login
                            </button>
                        </Link>

                        <Link to="/authentication/signup">
                            <button className="w-full py-2 bg-gray-800 text-white rounded-lg">
                                Signup
                            </button>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Navbar;
