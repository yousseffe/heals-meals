import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";


type HeaderProps = {
    loggedIn?: boolean
    token?: string
}

function Header({ loggedIn=false }: HeaderProps) {
    const logoPath = "/logo.svg";
    const [logged, setLogged] = useState<boolean>(loggedIn);

    const handleSignOut = () => {
        console.log("Signed out, switching home view");
        setLogged(prev => !prev);
    }

    return (
        <nav className="absolute top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md">
            <div className="flex justify-between items-center px-6 py-3">
                <div className="flex items-center gap-2 rounded-full bg-white/[0.8] px-4">
                    <img src={logoPath} alt="HealMeals Logo" className="h-14 w-14" />
                    <h1 className="font-bold text-xl text-health-primary">HealMeals</h1>
                </div>

                <ul className="flex gap-2">
                    <li><Link to="/"><Button variant="health">Home</Button></Link></li>
                    <li><Link to="/donate"><Button variant="health">Donate</Button></Link></li>

                    {logged? 
                    (<><li><Link to="/favorites"><Button variant="health">Favorites</Button></Link></li><li><Link to="/profile"><Button variant="health">Profile</Button></Link></li><li>
                            <Link to="/">
                                <Button
                                    variant="health"
                                    onClick={() => {
                                        handleSignOut();
                                    } }
                                >
                                    Sign out
                                </Button>
                            </Link>
                        </li></>)
                    : (
                        <li>
                        <Link to="/sign-in">
                            <Button
                                variant="health"
                                onClick={() => {
                                    handleSignOut();
                                }}
                            >
                                Sign in
                            </Button>
                        </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>

    );
}

export default Header;
