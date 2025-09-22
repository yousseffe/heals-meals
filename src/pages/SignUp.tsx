import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUp, SignUpPayload } from "@/services/auth"

const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    state: z.string().optional(),
    city: z.string().optional(),
    gender: z.string().optional(),
    age: z
        .string()
        .transform((val) => (val === "" ? undefined : Number(val)))
        .optional()
        .refine((val) => val === undefined || val > 0, "Age must be positive"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
})

type SignUpSchema = z.infer<typeof signUpSchema>

export default function SignUp() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: SignUpSchema) => {
        try {
            const result = await signUp(data as SignUpPayload)
            console.log("Signed up:", result)
            // set logged to true and get user auth token
            navigate('/');
        } catch (err) {
            console.error("Signup failed:", err)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 mt-2 mb-2">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="HealMeals Logo" className="mx-auto w-20 h-20 mb-4" />
                    <p className="text-gray-600">Let&apos;s unlock a new chapter of healthy cooking!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...register("name")} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" {...register("phone")} />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" {...register("password")} />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="state">State</Label>
                            <Input id="state" {...register("state")} />
                        </div>
                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" {...register("city")} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Input id="gender" {...register("gender")} />
                        </div>
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" type="number" {...register("age")} />
                            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
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
