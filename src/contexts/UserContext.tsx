import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { getUser, updateUser } from "@/services/UserService"
import { useAuth } from "@/contexts/AuthContext" // to access token + userId
import { User } from "@/services/AuthService"

type UserContextType = {
    user: User | null
    loading: boolean
    refreshUser: () => Promise<void>
    updateProfile: (data: Partial<User>) => Promise<void>
    toggleFavorite: (recipeId: string ) => Promise<void>
    isFavorite: (recipeId: string ) => boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const { token } = useAuth()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)

    const userId = localStorage.getItem("userId")

    const refreshUser = async () => {
        if (!token || !userId) return
        setLoading(true)
        try {
            const currentUser = await getUser(userId, token)
            setUser(currentUser)
        } catch (err) {
            console.error("Failed to fetch user:", err)
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (data: Partial<User>) => {
        if (!token || !userId) return
        setLoading(true)
        try {
            const updated = await updateUser(userId, data, token)
            setUser(updated) // keep state in sync automatically
        } finally {
            setLoading(false)
        }
    }

    const toggleFavorite = async (recipeId: string) => {
        if (!user || !token || !userId) return
        const favorites = user.favorites || []
        const updatedFavorites = favorites.includes(recipeId)
            ? favorites.filter((id) => id !== recipeId)
            : [...favorites, recipeId]

        try {
            // optimistic update
            setUser({ ...user, favorites: updatedFavorites })

            await updateUser(userId, { favorites: updatedFavorites }, token)
        } catch (err) {
            console.error("Failed to update favorites:", err)
            // Optionally: rollback by refreshing user
            refreshUser()
        }
    }

    const isFavorite = (recipeId: string) => {
        return user?.favorites?.includes(recipeId) ?? false
    }

    useEffect(() => {
        if (token) refreshUser()
        else setUser(null)
    }, [token])

    return (
        <UserContext.Provider value={{ user, loading, refreshUser, updateProfile, toggleFavorite, isFavorite }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) throw new Error("useUser must be used within a UserProvider")
    return context
}
