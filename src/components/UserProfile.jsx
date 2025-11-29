import React, { useContext } from "react";
import { Bookmark, Mail, User, Car, Heart } from "lucide-react";
import SpecificCars from "./SpecificCars";
import ContextComponent from "../context/ContextComponent";

export default function UserProfile() {

    const { registeredCars, savedCars, user } = useContext(ContextComponent)
    return (
        <>

            {/* Profile Header */}
            {user?.name ? (<div className="max-w-5xl mx-auto p-4 mt-10">
                <div className="bg-white shadow-md rounded-2xl p-6 flex gap-6 items-center">
                    <User size={40} />

                    <div>
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            {user.name}
                        </h2>

                    </div>
                </div>

                <SpecificCars cars={registeredCars} heading={'Registered Cars'} />

                {/* Saved Cars Section */}

                {user.SavedCars.length !== 0 && (
                    <SpecificCars cars={savedCars} heading={"Saved Cars"} />)}
            </div>
            ) : <div></div>}


        </>
    );
}
