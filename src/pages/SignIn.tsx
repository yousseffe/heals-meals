import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function SignIn(){
    const handleSignIn = () => {
        //handle backend connection and then redirect to homepage
    }

    return(
        <>
        <div className="sign-in-wrapper">
            <div className="logo-wrapper">
                <img src="/logo.svg" alt="HealMeals Logo" />
                <p>Let's unlock a new chapter of healthy cooking!</p>
            </div>
            <form action="#">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
                
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" />

                <Button variant="health" onClick={handleSignIn}>Submit</Button>

                <Link to="/sign-up">
                    <h3 className="font-semibold text-gray-700 text-lg underline underline-offset-4">Or create a new account</h3>
                </Link>
            </form>
        </div>
        </>
    )
}