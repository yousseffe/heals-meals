export type RecipeIngredient = {
    recipe_ingredientId: string;
    recipe_id: string;
    ingredient_id: string;
    ingredient_name: string;
    quantity: number;
    unit: string;
}

export type Recipe = {
    recipe_id: string;
    title: string;
    description: string;
    prepTime: string;
    stars: number;
    steps?: string[];
    recipeIngredients?: RecipeIngredient[];
    dateAdded: string;
    dateUpdated?: string;
    updatedBy?: string;
    createdBy: string;
}

export type RecipeSummary = {
    recipe_id: string;
    title: string;
    description: string;
    prepTime: string;
    stars: number;
}

const BASE_URL = "http://localhost:8080/api/recipes";

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

    if (!response.ok){
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

    if (!response.ok){
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

    if (!response.ok){
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to fetch recipe");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json()
}

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

    if (!response.ok){
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

    if (!response.ok){
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to delete recipe");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json()
}

// gets all recipes for now until favorites endpoint is done
export async function getFavorites(userId: string, token: string): Promise<RecipeSummary[]> {
    const response = await fetch(`${BASE_URL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (!response.ok){
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || "Failed to fetch favorite recipes");
        (error as any).status = response.status;
        (error as any).response = { status: response.status, data };
        throw error;
    }

    return response.json()
}