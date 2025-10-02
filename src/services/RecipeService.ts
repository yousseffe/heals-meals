export type RecipeIngredient = {
    ingredientId: string;
    recipeId: string;
    recipeIngredientId: string;
    ingredient_name: string;
    quantity: number;
    unit: string;
}

export type Recipe = {
    recipeId?: string;
    name: string;
    description: string;
    summary: string;
    prepTimeMinutes: number;
    averageRating: number;
    steps?: string[];
    recipeIngredients?: RecipeIngredient[];
    dateAdded: string;
    dateUpdated?: string;
    createdBy: string;
    updatedBy?: string;
}

export type RecipeSummary = {
    recipeId: string;
    name: string;
    description: string;
    prepTimeMinutes: number;
    stars: number;
}

export type Favourite = {
    favouriteId: string;
    userId: string;
    recipe: RecipeSummary;
    addedAt: string;
}

const BASE_URL = "http://localhost:8080/api/recipes";
const FAV_URL = "http://localhost:8080/api/favourites";

export async function createRecipe(recipe: Recipe, userId: string, token: string): Promise<Recipe> {
    if (!token) {
        throw new Error("Please log in first");
    }

    const response = await fetch(`${BASE_URL}?createdById=${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(recipe),
    })

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to create recipe");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json()
}

export async function getAllRecipes(): Promise<RecipeSummary[]> {
    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to fetch recipes");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json()
}

export async function getRecipeById(recipeId: string): Promise<Recipe> {
    const response = await fetch(`${BASE_URL}/${recipeId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to fetch recipe");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json()
}

// Endpoint being redone in backend 
export async function updateRecipe(recipeId: string, recipe: Recipe, userId: string, token: string): Promise<Recipe> {
    if (!token) {
        throw new Error("Please log in first");
    }

    const response = await fetch(`${BASE_URL}/${recipeId}?updatedById=${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(recipe),
    })

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to update recipe");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json()
}

export async function deleteRecipe(recipeId: string, token: string): Promise<void> {
    if (!token) {
        throw new Error("Please log in first");
    }

    const response = await fetch(`${BASE_URL}/${recipeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to delete recipe");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json()
}


export async function getFavorites(userId: string, token: string): Promise<Favourite[]> {
    if (!token) {
        throw new Error("Please log in first");
    }

    const response = await fetch(`${FAV_URL}/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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

    return response.json()
}

export async function addFavorite(userId: string, recipeId: string, token: string): Promise<Favourite> {
    if (!token) {
        throw new Error("Please log in first");
    }

    const response = await fetch(`${FAV_URL}/${userId}/${recipeId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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

    return response.json()
}

export async function deleteFavorite(userId: string, recipeId: string, token: string): Promise<string> {
    if (!token) {
        throw new Error("Please log in first");
    }

    const response = await fetch(`${FAV_URL}/${userId}/${recipeId}`, {
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