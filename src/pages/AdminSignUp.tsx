import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/contexts/AuthContext"
import { SignUpPayload } from "@/services/AuthService"

const adminSignUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    state: z.string().optional(),
    city: z.string().optional(),
    gender: z.enum(["Male", "Female"], {
        required_error: "Gender is required",
        invalid_type_error: "Invalid gender",
    }),
    dob: z.coerce.date({
        required_error: "Date of birth is required",
        invalid_type_error: "Invalid date format",
    })
        .max(new Date(), "Date of birth cannot be in the future")
        .refine((date) => {
            const today = new Date()
            const age = today.getFullYear() - date.getFullYear()
            const hasBirthdayPassed =
                today.getMonth() > date.getMonth() ||
                (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate())

            const realAge = hasBirthdayPassed ? age : age - 1
            return realAge >= 18 // admins must be adults
        }, { message: "Admins must be at least 18 years old" })
        .transform((date) => date.toISOString().split("T")[0]),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
})

type AdminSignUpSchema = z.infer<typeof adminSignUpSchema>

export default function AdminSignUp() {
    const navigate = useNavigate()
    const { signUp } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<AdminSignUpSchema>({
        resolver: zodResolver(adminSignUpSchema),
    })

    const onSubmit = async (data: AdminSignUpSchema) => {
        try {
            // Pass role = "ADMIN" explicitly
            await signUp({ ...(data as SignUpPayload), role: "ADMIN" })
            navigate("/admin/dashboard")
        } catch (err) {
            console.error("Admin signup failed:", err)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 mt-2 mb-2">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <img src="/logo.svg" alt="HealMeals Logo" className="mx-auto w-20 h-20 mb-4" />
                    <p className="text-gray-600 font-medium">Create a new <span className="text-red-600 font-bold">Admin</span> account</p>
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
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value || ""}>
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" {...register("dob")} />
                            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                        </div>
                    </div>

                    <Button type="submit" variant="destructive" className="w-full">
                        Create Admin
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        Already an admin?{" "}
                        <Link to="/sign-in" className="text-health-600 underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
