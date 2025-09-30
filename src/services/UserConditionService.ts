import { Condition, ConditionType } from "./ConditionService";
import { User } from "./AuthService";

export type UserCondition = {
    id: string
    userId: string
    conditionId: string
    conditionName: string
    conditionType: ConditionType
}

const BASE_URL = "http://localhost:8080/api/user-conditions";

export async function addCondition(user: Partial<User>, condition: Partial<Condition>, token: string): Promise<UserCondition> {
    if (!user.userId || !condition.conditionId) {
        throw new Error("Missing userId or conditionId");
    }

    const response = await fetch(`${BASE_URL}/${user.userId}/${condition.conditionId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to add condition")
    }

    return await response.json()
}

export async function deleteCondition(userConditionId: string, token: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/${userConditionId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to delete condition")
    }
}

export async function getConditions(user: Partial<User>, token: string): Promise<UserCondition[]> {
    if (!user.userId) {
        throw new Error("Missing userId");
    }

    const response = await fetch(`${BASE_URL}/users/${user.userId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch user conditions")
    }

    return response.json()
}