import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import {
    UserCondition,
    getConditions as apiGetUserConditions,
    addCondition as apiAddUserCondition,
    deleteCondition as apiDeleteUserCondition
} from "@/services/UserConditionService";
import { useAuth } from "@/contexts/AuthContext";
import { useCondition } from "@/contexts/ConditionContext";

type UserConditionContextType = {
    userConditions: UserCondition[] | null;
    userAllergies: UserCondition[] | null;
    userDiseases: UserCondition[] | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    addUserCondition: (conditionId: string) => Promise<void>;
    deleteUserCondition: (userConditionId: string) => Promise<void>;
};

const UserConditionContext = createContext<UserConditionContextType | undefined>(undefined);

export function UserConditionProvider({ children }: { children: ReactNode }) {
    const { token, user } = useAuth();
    const [userConditions, setUserConditions] = useState<UserCondition[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refresh = async () => {
        if (!token || !user) return;
        setLoading(true);
        try {
            const data = await apiGetUserConditions(user, token);
            setUserConditions(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to fetch user conditions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, [token, user]);

    const userAllergies = useMemo(() => {
        if (!userConditions) return null;

        return userConditions.filter((uc) => uc.conditionType === "ALLERGY")
    }, [userConditions]);

    const userDiseases = useMemo(() => {
        if (!userConditions) return null;

        return userConditions.filter((uc) => uc.conditionType === "DISEASE")
    }, [userConditions]);

    const addUserCondition = async (conditionId: string) => {
        if (!token || !user) return;
        try {
            await apiAddUserCondition(user, { conditionId: conditionId }, token);
            await refresh();
        } catch (err: any) {
            setError(err.message || "Failed to add user condition");
        }
    };

    const deleteUserCondition = async (userConditionId: string) => {
        if (!token) return;
        try {
            await apiDeleteUserCondition(userConditionId, token);
            setUserConditions(prev =>
                prev ? prev.filter(c => c.id !== userConditionId) : prev
            );
        } catch (err: any) {
            setError(err.message || "Failed to delete user condition");
        }
    };

    return (
        <UserConditionContext.Provider
            value={{ userConditions, userAllergies, userDiseases, loading, error, refresh, addUserCondition, deleteUserCondition }}>
            {children}
        </UserConditionContext.Provider>
    );
}

export function useUserCondition() {
    const context = useContext(UserConditionContext);
    if (!context)
        throw new Error("useUserCondition must be used within a UserConditionProvider");
    return context;
}
