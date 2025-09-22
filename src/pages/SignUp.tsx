import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export default function SignUp() {
    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault() // prevent page reload
        // handle backend signup logic here
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 mt-2 mb-2">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="HealMeals Logo" className="mx-auto w-20 h-20 mb-4" />
                    <p className="text-gray-600">Let&apos;s unlock a new chapter of healthy cooking!</p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" required />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>

                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>

                    <div>
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" name="confirm-password" type="password" required />
                    </div>

                    {/* Smaller inputs side by side */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="state">State</Label>
                            <Input id="state" name="state" type="text" />
                        </div>
                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" type="text" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Input id="gender" name="gender" type="text" />
                        </div>
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" name="age" type="number" />
                        </div>
                    </div>

                    <Button type="submit" variant="health" className="w-full">
                        Sign Up
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/sign-in" className="text-health-600 underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
