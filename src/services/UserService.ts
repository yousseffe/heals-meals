import { User } from "@/services/AuthService"

export async function getUser(userId: string, token: string): Promise<User> {
    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) throw new Error("Failed to fetch user")
    return response.json()
}

export async function updateUser(userId: string, data: Partial<User>, token: string): Promise<User> {
    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) throw new Error("Failed to update user")
    return response.json()
}

