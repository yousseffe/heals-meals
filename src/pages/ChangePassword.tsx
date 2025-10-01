import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast";

const changePasswordSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    currentPassword: z.string().min(6, "Current password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

type ChangePasswordForm = z.infer<typeof changePasswordSchema>

// Dummy API simulation
async function dummyChangePasswordApi(data: ChangePasswordForm) {
    console.log("Simulated password change for:", data.email)
    return new Promise((resolve) => setTimeout(resolve, 1500))
}

export default function ChangePassword() {
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ChangePasswordForm>({
        resolver: zodResolver(changePasswordSchema),
    })

    const onSubmit = async (data: ChangePasswordForm) => {
        try {
            // Placeholder logic until backend supports it
            await dummyChangePasswordApi(data)

            toast({
                title: "Password changed",
                description: "Your password has been successfully updated.",
            });
            reset()
        } catch (err) {
            console.error("Password change failed:", err)
            toast({
                title: "Failed to change password",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>

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
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            placeholder="••••••••"
                            {...register("currentPassword")}
                        />
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="••••••••"
                            {...register("newPassword")}
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        variant="health"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Updating..." : "Change Password"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
