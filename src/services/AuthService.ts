export type SignUpPayload = {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    state?: string;
    city?: string;
    gender?: "male" | "female";  // instead of string
    dob?: string;                // ISO string (YYYY-MM-DD)
};


export type SignInPayload = {
    email: string
    password: string
}

export type AuthResponse = {
    token: string
    user: {
        userId: string
        name: string
        email: string
        role?: string
        gender?: string
        dob?: string
        address?: string
        phone?: string
    }
}

export type User = {
    userId: string
    name: string
    email: string
    role?: string
    gender?: string
    dob?: string
    address?: string
    phone?: string
}


export async function signUp(data: SignUpPayload): Promise<AuthResponse> { 
        // Combine state + city into address
        const address = [data.state, data.city].filter(Boolean).join(", ") || null;

        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            gender: data.gender,
            dob: data.dob,
            address,
            role: "USER", // or whatever your default is
        }

        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "Failed to sign up")
        }

        return response.json()
}

export async function signIn(data: SignInPayload): Promise<AuthResponse> { 
    const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "Failed to sign in")
        }

        return response.json()
}


export async function getCurrentUser(userId: string, token: string): Promise<User> {
    if (!userId) throw new Error("No userId available")
    
    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
    })

    if (!response.ok) {
        throw new Error("Failed to fetch current user")
    }

    return response.json()
}

// export async function updateProfile(id: string, data: UserDTO): Promise<UserDTO> { 
    
//  }

// export async function updatePassword(id: string, oldPassword: string, newPassword: string): Promise<string> { 

//  }

