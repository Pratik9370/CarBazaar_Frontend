import React, { useContext } from "react";
import { Bookmark, Mail, User, Car, Heart } from "lucide-react";
import SpecificCars from "./SpecificCars";
import ContextComponent from "../context/ContextComponent";

export default function UserProfile() {

    const { registeredCars, savedCars, user } = useContext(ContextComponent)
    return (
        <div className="min-h-screen bg-[#FAFAF7]">

            {/* Profile Header */}
            {user?.name ? (<div className="max-w-7xl mx-auto pt-10">
                <div className="bg-white border border-[#E8E6E1] rounded-2xl p-6 mx-2 flex gap-5 items-center mb-5 md:w-60">
                    <div className="w-16 h-16 rounded-full bg-[#B8862E]/10 flex items-center justify-center shrink-0">
                        <User size={28} strokeWidth={1.5} className="text-[#B8862E]" />
                    </div>

                    <div >
                        <p className="font-mono text-[11px] uppercase tracking-wide text-[#6B6D72] mb-1">Account</p>
                        <h2 className="font-serif text-2xl text-[#14161A] flex items-center gap-2">
                            {user.name}
                        </h2>
                    </div>
                </div>

                <div className="mb-5">
                    <SpecificCars cars={registeredCars} heading={'Registered Cars'} className='mb-5' />
                </div>
                {/* Saved Cars Section */}

                {user.SavedCars.length !== 0 && (
                    <SpecificCars cars={savedCars} heading={"Saved Cars"} className='' />)}

            </div>
            ) : <div></div>}


        </div>
    );
}