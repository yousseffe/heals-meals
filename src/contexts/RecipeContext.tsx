import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import {
    Recipe, RecipeSummary, createRecipe, 
    getAllRecipes, getRecipeById,
    updateRecipe as apiUpdateRecipe, deleteRecipe
} from "@/services/RecipeService";
import { useAuth } from "@/contexts/AuthContext";

type RecipeContextType = {
    recipes: RecipeSummary[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    addRecipe: (recipe: Recipe, userId: string) => Promise<Recipe>;
    getRecipes: () => Promise<RecipeSummary[]>;
    getRecipe: (recipeId: string) => Promise<Recipe>;
    updateRecipe: (recipeId: string, recipe: Recipe, userId: string) => Promise<Recipe>;
    removeRecipe: (recipeId: string) => Promise<void>;
}

const RecipeContext = createContext<RecipeContextType>(undefined);

export function RecipeProvider({ children }: { children: ReactNode }) {
    const { token } = useAuth();
    const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refresh = async () => {
        setLoading(true);
        try {
            const data = await getAllRecipes();
            setRecipes([...data]);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to fetch recipes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, [token]);    //may need to revise dependency

    const addRecipe = async (recipe: Recipe, userId: string): Promise<Recipe> => {
        if (!token) {
            throw new Error("Please log in first");
        }

        try {
            return await createRecipe(recipe, userId, token);
        } catch (error: any) {
            setError(error || "Failed to add recipe");
            return null;
        }
    }

    const getRecipes = async (): Promise<RecipeSummary[]> => {
        try {
            return await getAllRecipes();
        } catch (error: any) {
            setError(error || "Failed to fetch recipes");
            return null;
        }
    }
    
    const getRecipe = async (recipeId: string): Promise<Recipe> => {
        try {
            return await getRecipeById(recipeId);
        } catch (error: any) {
            setError(error || "Failed to fetch recipe");
            return null;
        }
    }

    const updateRecipe = async (recipeId: string, recipe: Recipe, userId: string): Promise<Recipe> => {
        try {
            return await apiUpdateRecipe(recipeId, recipe, userId, token);
        } catch (error: any) {
            setError(error || "Failed to update recipe");
            return null;
        }
    }

    const removeRecipe = async (recipeId: string): Promise<void> => {
        try {
            return await deleteRecipe(recipeId, token);
        } catch (error: any) {
            setError(error || "Failed to delete recipe");
            return null;
        }
    }


    return (
        <RecipeContext.Provider value={{ recipes, loading, error, refresh, addRecipe, getRecipes, getRecipe, updateRecipe, removeRecipe }}>
            {children}
        </RecipeContext.Provider>
    )
}

export function useRecipe() {
    const context = useContext(RecipeContext);
    if (!context) throw new Error("useRecipe must be used within a RecipeProvider");
    return context;
}