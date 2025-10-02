import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import {
    Ingredient,
    createIngredient,
    getAllIngredients,
    getIngredientById,
    updateIngredientById,
    deleteIngredientById
} from "@/services/IngredientService";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";

type IngredientContextType = {
    ingredients: Ingredient[];
    loading: boolean;
    error: string | null;
    selectedIngredient: Ingredient | null;
    refresh: () => Promise<void>;
    addIngredient: (ingredient: Ingredient) => Promise<Ingredient | null>;
    fetchIngredient: (id: string) => Promise<Ingredient | null>;
    updateIngredient: (id: string, ingredient: Ingredient) => Promise<Ingredient | null>;
    deleteIngredient: (id: string) => Promise<void>;
    setSelectedIngredient: (ingredient: Ingredient | null) => void;
};

const IngredientContext = createContext<IngredientContextType | undefined>(undefined);

export function IngredientProvider({ children }: { children: ReactNode }) {
    const { token } = useAuth();
    const { user } = useUser();

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

    const refresh = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await getAllIngredients(token);
            setIngredients(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to fetch ingredients");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, [token, user]);

    const addIngredient = async (ingredient: Ingredient): Promise<Ingredient | null> => {
        if (!token) throw new Error("Please log in first");
        try {
            const newIngredient = await createIngredient(ingredient, token);
            setIngredients(prev => [...prev, newIngredient]);
            return newIngredient;
        } catch (error: any) {
            setError(error.message || "Failed to add ingredient");
            return null;
        }
    };

    const fetchIngredient = async (id: string): Promise<Ingredient | null> => {
        if (!token) return null;
        try {
            const ingredient = await getIngredientById(id, token);
            setSelectedIngredient(ingredient);
            return ingredient;
        } catch (err: any) {
            setError(err.message || "Failed to fetch ingredient");
            return null;
        }
    };

    const updateIngredient = async (id: string, updated: Ingredient): Promise<Ingredient | null> => {
        if (!token) return null;
        try {
            const updatedIngredient = await updateIngredientById(id, updated, token);
            setIngredients(prev =>
                prev.map(item => (item.ingredient_id === id ? updatedIngredient : item))
            );
            return updatedIngredient;
        } catch (err: any) {
            setError(err.message || "Failed to update ingredient");
            return null;
        }
    };

    const deleteIngredient = async (id: string): Promise<void> => {
        if (!token) return;
        try {
            await deleteIngredientById(id, token);
            setIngredients(prev => prev.filter(item => item.ingredient_id !== id));
        } catch (err: any) {
            setError(err.message || "Failed to delete ingredient");
        }
    };

    const value = useMemo(
        () => ({
            ingredients,
            loading,
            error,
            selectedIngredient,
            refresh,
            addIngredient,
            fetchIngredient,
            updateIngredient,
            deleteIngredient,
            setSelectedIngredient
        }),
        [ingredients, loading, error, selectedIngredient]
    );

    return (
        <IngredientContext.Provider value={value}>
            {children}
        </IngredientContext.Provider>
    );
}

export function useIngredient() {
    const context = useContext(IngredientContext);
    if (!context) {
        throw new Error("useIngredient must be used within an IngredientProvider");
    }
    return context;
}
