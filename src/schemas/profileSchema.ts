import { z } from "zod"

export const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    gender: z.enum(["Male", "Female"], {
        required_error: "Please select your gender",
    }),
    dob: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date")
        .refine((val) => {
            const dob = new Date(val);
            const today = new Date();
            const age =
                today.getFullYear() -
                dob.getFullYear() -
                (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);
            return age >= 13;
        }, "You must be at least 13 years old"),

})
