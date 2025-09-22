import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export default function SignIn() {
    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault()
        // handle backend sign-in logic here
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="HealMeals Logo" className="mx-auto w-20 h-20 mb-4" />
                    <p className="text-gray-600">Let&apos;s unlock a new chapter of healthy cooking!</p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>

                    <Button type="submit" variant="health" className="w-full">
                        Sign In
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link to="/sign-up" className="text-health-600 underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
