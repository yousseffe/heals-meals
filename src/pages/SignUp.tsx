import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function SignUp(){
    const handleSignUp = () => {
        //handle backend connection and then redirect to homepage
    }

    return(
        <>
        <div className="sign-in-wrapper  w-full">
            <div className="logo-wrapper mb-16">
                <img src="/logo.svg" alt="HealMeals Logo" /> {/* image should be in the center of the page */}
                <p>Let's unlock a new chapter of healthy cooking!</p>
            </div>
            <form action="#" className="flex flex-col gap-6 w-full">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />

                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
                
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" name="phone" />
                
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" />
                
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="text" id="confirm-password" name="confirm-password" />
                
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" />

                <div className="gird md:gird-cols-2 gap-16"> {/** for small input fields**/}
                    <div className="flex flex-col gap-6">
                        <label htmlFor="state">State</label>
                        <input type="text" id="state" name="state" />

                        <label htmlFor="city">City</label>
                        <input type="text" id="city" name="city" />
                    </div>
                    
                    <div className="flex flex-col gap-6">
                        <label htmlFor="gender">Gender</label>
                        <input type="text" id="gender" name="gender" />

                        <label htmlFor="age">Age</label>
                        <input type="text" id="age" name="age" />
                    </div>

                </div>

                <Button variant="health" onClick={handleSignUp}>Submit</Button>

                <Link to="/sign-up">
                    <h3 className="font-semibold text-gray-700 text-lg underline underline-offset-4">Already have an account?</h3>
                </Link>
            </form>
        </div>
        </>
    )
}