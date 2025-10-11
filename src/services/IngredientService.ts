export type Ingredient = {
    ingredient_id: string;
    name: string;
    isHarmful_flag: boolean;
}

const BASE_URL = "http://localhost:8080/api/ingredients";

export async function createIngredient(ingredient: Ingredient, token: string): Promise<Ingredient> {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(ingredient)
    })

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to create ingredient");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json()
}

export async function getAllIngredients(token: string): Promise<Ingredient[]> {
    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to fetch ingredients");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json();
}

export async function getIngredientById(ingredientId: string, token: string): Promise<Ingredient> {
    const response = await fetch(`${BASE_URL}/${ingredientId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to fetch ingredients");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json()
}

export async function updateIngredientById(ingredientId: string, ingredient: Ingredient, token: string): Promise<Ingredient> {
    const response = await fetch(`${BASE_URL}/${ingredientId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(ingredient)
    })

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to fetch ingredients");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json()
}

export async function deleteIngredientById(ingredientId: string, token: string): Promise<string> {
    const response = await fetch(`${BASE_URL}/${ingredientId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to fetch favorite recipes");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}