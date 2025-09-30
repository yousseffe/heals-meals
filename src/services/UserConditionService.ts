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
        // const error = await response.json()
        // throw new Error(error.message || "Failed to add condition")
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to add condition");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data }; //  simulate Axios-style
        throw error;
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

export async function getAllUserConditions(token: string): Promise<UserCondition[]> { // for all users
    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch all user conditions")
    }

    return response.json()
}

export async function getConditionById(conditionId: string, token: string): Promise<UserCondition> {
    const response = await fetch(`${BASE_URL}/${conditionId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch user condition by id")
    }

    return response.json()
}