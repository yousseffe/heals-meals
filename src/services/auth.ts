export type SignUpPayload = {
    name: string
    email: string
    phone?: string
    password: string
    confirmPassword: string
    state?: string
    city?: string
    gender?: string
    age?: number
}

export async function signUp(data: SignUpPayload) {
    // const response = await fetch("http://localhost:8080/api/auth/signup", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    // })

    // if (!response.ok) {
    //     const error = await response.json()
    //     throw new Error(error.message || "Failed to sign up")
    // }

    // return response.json()
}
