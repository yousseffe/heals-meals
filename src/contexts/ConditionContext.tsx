import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import {
    Condition,
    getConditions,
    getCondition as apiGetCondition,
    addCondition as apiAddCondition,
    updateCondition as apiUpdateCondition,
    deleteCondition as apiDeleteCondition,
    getAllergies as apiGetAllergies,
    getDiseases as apiGetDiseases,
} from "@/services/ConditionService";
import { useAuth } from "@/contexts/AuthContext";

type ConditionContextType = {
    conditions: Condition[];
    allergies: Condition[];
    diseases: Condition[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    getCondition: (id: string) => Promise<Condition | null>;
    addCondition: (condition: Condition) => Promise<void>;
    updateCondition: (condition: Condition) => Promise<void>;
    deleteCondition: (id: string) => Promise<void>;
    getAllergies: () => Promise<Condition[]>
    getDiseases: () => Promise<Condition[]>
};

const ConditionContext = createContext<ConditionContextType | undefined>(undefined);

export function ConditionProvider({ children }: { children: ReactNode }) {
    const { token } = useAuth();
    const [conditions, setConditions] = useState<Condition[]>([]);
    // const [allergies, setAllergies] = useState<Condition[] | null>(null);
    // const [diseases, setDiseases] = useState<Condition[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const allergies = useMemo(
        () => conditions?.filter((c) => c.conditionType.toUpperCase() === "ALLERGY"),
        [conditions]
    );

    const diseases = useMemo(
        () => conditions?.filter((c) => c.conditionType.toUpperCase() === "DISEASE"),
        [conditions]
    );

    const refresh = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await getConditions(token);
            setConditions([...data]);

            // setAllergies(data.filter(condition => condition.type === "ALLERGY"));
            // setDiseases(data.filter(condition => condition.type === "DISEASE"));

            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to fetch conditions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getConditions(token)
            .then(setConditions)
            .catch(() => setConditions(null));
    }, []);

    useEffect(() => {
        refresh();
    }, [token]);

    const getCondition = async (id: string): Promise<Condition | null> => {
        if (!token) return null;
        try {
            return await apiGetCondition(id, token);
        } catch (err: any) {
            setError(err.message || "Failed to fetch condition")
            return null;
        }
    };

    const addCondition = async (condition: Condition) => {
        if (!token) return;
        try {
            await apiAddCondition(condition, token);
            await refresh();
        } catch (err: any) {
            setError(err.message || "Failed to add condition");
        }
    };

    const updateCondition = async (condition: Condition) => {
        if (!token) return;
        try {
            await apiUpdateCondition(condition, token);
            await refresh();
        } catch (err: any) {
            setError(err.message || "Failed to update condition");
        }
    };

    const deleteCondition = async (id: string) => {
        if (!token) return;
        try {
            await apiDeleteCondition(id, token);
            await refresh();
        } catch (err: any) {
            setError(err.message || "Failed to delete condition");
        }
    };

    const getAllergies = async () => {
        if (!token) return null;
        try {
            return await apiGetAllergies(token);
        } catch {
            return null;
        }
    };

    const getDiseases = async () => {
        if (!token) return null;
        try {
            return await apiGetDiseases(token);
        } catch {
            return null;
        }
    };

    return (
        <ConditionContext.Provider
            value={{ conditions, allergies, diseases, loading, error, refresh, getCondition, addCondition, updateCondition, deleteCondition, getAllergies, getDiseases }}
        >
            {children}
        </ConditionContext.Provider>
    );
}

export function useCondition() {
    const context = useContext(ConditionContext);
    if (!context) throw new Error("useCondition must be used within a ConditionProvider");
    return context;
}
