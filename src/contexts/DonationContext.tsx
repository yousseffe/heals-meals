import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import {
    DonationRequest, DonationResponse, createDonation,
    getDonations, getDonation, deleteDonation
} from "@/services/DonationService";
import { useAuth } from "@/contexts/AuthContext";

type DonationContextType = {
    donations: DonationResponse[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    donate: (donation: DonationRequest) => Promise<DonationResponse>;
    viewDonation: (donationId: string) => Promise<DonationResponse>;
    removeDonation: (donationId: string) => Promise<void>;
}

const DonationContext = createContext<DonationContextType>(undefined);

export function DonationProvider({ children }: { children: ReactNode }) {
    const { token } = useAuth();
    const [donations, setDonations] = useState<DonationResponse[]>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const refresh = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const data = await getDonations(token);
            setDonations([...data]);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to fetch donations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, [token]);

    const donate = async (donation: DonationRequest): Promise<DonationResponse> => {
        try {
            return await createDonation(donation, token);
        } catch (err: any) {
            setError(err || "Failed to process donation");
            return null;
        }
    }

    const viewDonation =  async (donationId: string): Promise<DonationResponse> => {
        if (!token) return null;

        try {
            return getDonation(donationId, token);
        } catch (err: any) {
            setError(err || "Failed to view donation");
            return null;
        }
    }

    const removeDonation = async (donationId: string): Promise<void> => {
        if (!token) return null;

        try {
            return deleteDonation(donationId, token);
        } catch (err: any) {
            setError(err || "Failed to delete donation");
            return null;
        }
    }

    return (
        <DonationContext.Provider value={{ donations, loading, error, refresh, donate, viewDonation, removeDonation }}>
            {children}
        </DonationContext.Provider>
    )
}

export function useDonation() {
    const context = useContext(DonationContext);
    if (!context) throw new Error("useDonation must be used within a DonationProvider");
    return context;
}