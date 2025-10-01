import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { SignInPayload } from "@/services/AuthService"
import { useToast } from "@/hooks/use-toast";

const signInSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type SignInSchema = z.infer<typeof signInSchema>

export default function SignIn() {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: SignInSchema) => {
        try {
            await signIn(data as SignInPayload);
            navigate('/');

            toast({
                title: "Sign in successful",
                description: "Welcome back!",
            });
        } catch (err) {
            console.error("Signin failed:", err);

            toast({
                title: "Failed to sign in",
                description: "Something went wrong while signing in. Incorrect username or password.",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="HealMeals Logo" className="mx-auto w-20 h-20 mb-4" />
                    <p className="text-gray-600">Let&apos;s unlock a new chapter of healthy cooking!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                        <div className="text-right mt-2">
                            <Link to="/forgot-password" className="text-health-600 text-sm hover:underline">
                                Forgot your password?
                            </Link>
                        </div>
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
