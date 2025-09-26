import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext"

function Header() {
    const { isLoggedIn, signOut } = useAuth();
    const navigate = useNavigate();
    const logoPath = "/logo.svg";

    const handleSignOut = async () => {
        try {
            await signOut(); // clear tokens, context, etc.
            console.log("Signed out");
            navigate("/"); // go home *after* logout
        } catch (err) {
            console.error("Failed to sign out:", err);
        }
    };

    return (
        <nav className="absolute top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md">
            <div className="flex justify-between items-center px-6 py-3">
                <div className="flex items-center gap-2 rounded-full bg-white/[0.8] px-4 shadow-sm">
                    <img src={logoPath} alt="HealMeals Logo" className="h-14 w-14" />
                    <h1 className="font-bold text-xl text-health-primary">HealMeals</h1>
                </div>

                <ul className="flex gap-2">
                    <li><Link to="/"><Button variant="health">Home</Button></Link></li>
                    <li><Link to="/donate"><Button variant="health">Donate</Button></Link></li>

                    {isLoggedIn ?
                        (<>
                        <li>
                            <Link to="/favorites">
                                <Button variant="health">Favorites</Button>
                            </Link>
                        </li>
                            <li><Link to="/profile">
                                <Button variant="health">Profile</Button>
                            </Link></li>
                            <li>
                                <Button
                                    variant="health"
                                    onClick={() => {
                                        handleSignOut();
                                    }}
                                >
                                    Sign out
                                </Button>
                            </li>
                            </>)
                        : (
                            <li>
                                <Link to="/sign-in">
                                    <Button variant="health"> Sign in </Button>
                                </Link>
                            </li>
                        )}
                </ul>
            </div>
        </nav>

    );
}

export default Header;
