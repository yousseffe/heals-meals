import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useUser } from "@/contexts/UserContext"
import { useState } from "react"
import { useLocation } from "react-router-dom";

function calculateAge(dob?: string): number | null {
    if (!dob) return null;
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasBirthdayPassed =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassed) age--;

    return age;
}


export default function UserProfile() {
    const [rand, setRand] = useState(false);
    const location = useLocation();
    const { user } = useUser();

    // Split address into city + state (fallbacks to empty if no address)
    const [city, state] = user?.address ? user.address.split(",").map(s => s.trim()) : ["", ""];

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">

                {/* Header / Avatar */}
                <div className="text-center mb-8">
                    <img
                        src="/icons8-profile-100.png"
                        alt="User avatar"
                        className="mx-auto w-[120px] h-[120px] mb-4 rounded-full"
                    />
                    <p className="text-gray-800 font-semibold text-2xl">
                        {user?.name || "User"}
                    </p>
                </div>

                {/* Profile Info Grid */}
                <div className="flex flex-col gap-6">
                    <div>
                        <Label className="text-lg">Name</Label>
                        <div className="text-gray-700 mt-2">{user?.name || "Not provided"}</div>
                    </div>
                    <div>
                        <Label className="text-lg">Email</Label>
                        <div className="text-gray-700 mt-2">{user?.email || "Not provided"}</div>
                    </div>

                    <div>
                        <Label className="text-lg">Phone Number</Label>
                        <div className="text-gray-700 mt-2">{user?.phone || "Not provided"}</div>
                    </div>

                    <div className="col-span-2">
                        <Label className="text-lg">Address</Label>
                        <div className="text-gray-700 mt-2">{user?.address || "Not provided"}</div>
                    </div>
                </div>


                <div className="grid md:grid-cols-2 gap-6 mt-6 mb-6">
                    <div>
                        <Label className="text-lg">State</Label>
                        <div className="text-gray-700 mt-2">{state || "Not provided"}</div>
                    </div>

                    <div>
                        <Label className="text-lg">City</Label>
                        <div className="text-gray-700 mt-2">{city || "Not provided"}</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6 mb-6">
                    <div>
                        <Label className="text-lg">Gender</Label>
                        <div className="text-gray-700 mt-2">{user?.gender || "Not provided"}</div>
                    </div>
                    <div>
                        <Label className="text-lg">Date of Birth</Label>
                        <div className="text-gray-700 mt-2">
                            {user?.dob
                                ? `${new Date(user.dob).toLocaleDateString()} (${calculateAge(user.dob)} years old)`
                                : "Not provided"}
                        </div>
                    </div>
                </div>


                {/* Actions */}
                <div className="flex flex-col mt-10 gap-4">
                    <Link to="/profile/health">
                        <Button variant="health" className="w-full">
                            Health Profile
                        </Button>
                    </Link>

                    <Link to="/profile/edit" state={{ backgroundLocation: location }} onClick={() => console.log(location)}>
                        <Button variant="outline" className="w-full rounded-full">
                            Edit Profile
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
