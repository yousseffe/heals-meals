import { useAuth } from "@/contexts/AuthContext";

export type Condition = {
    id: string;
    name: string;
    type: "DISEASE" | "ALLERGY";
}

const BASE_URL = "http://localhost:8080/api/profile-conditions";

export async function addCondition(condition: Condition, token: string): Promise<Condition> {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer "${token}"`
        },
        body: JSON.stringify(condition),
    })

    if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "Failed to add condition")
        }

        return response.json()
}

export async function getConditions(token: string): Promise<Condition[]> {
    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer "${token}"`
        }
    })

    if (!response.ok){
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch conditions")
    }

    return response.json()
}

export async function getCondition(id: string, token: string): Promise<Condition> {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer "${token}"`
        }
    })
    
    if (!response.ok){
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch condition")
    }

    return response.json()
}

export async function updateCondition(condition: Condition, token: string): Promise<Condition> {
    const response = await fetch(`${BASE_URL}/${condition.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer "${token}"`
        },
        body: JSON.stringify(condition),
    })
    
    if (!response.ok){
        const error = await response.json()
        throw new Error(error.message || "Failed to update condition")
    }

    return response.json()
}

export async function deleteCondition(id: string, token: string) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer "${token}"`
        }
    })
    
    if (!response.ok){
        const error = await response.json()
        throw new Error(error.message || "Failed to delete condition")
    }

}

export async function getAllergies(token: string): Promise<Condition[]> {
    const response =  await fetch(`${BASE_URL}/allergies`, {
        method:  "GET",
        headers: {
            "Authorization": `Bearer "${token}"`
        }
    })

    if (!response.ok){
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch allergies")
    }

    return response.json()
}

export async function getDiseases(token: string): Promise<Condition[]> {
    const response =  await fetch(`${BASE_URL}/diseases`, {
        method:  "GET",
        headers: {
            "Authorization": `Bearer "${token}"`
        }
    })

    if (!response.ok){
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch diseases")
    }

    return response.json()
}