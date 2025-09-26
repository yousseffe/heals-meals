import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import {
    signIn as apiSignIn, signUp as apiSignUp,
    SignUpPayload, SignInPayload, User, getCurrentUser
} from "@/services/AuthService"

type AuthContextType = {
    token: string | null
    user: User | null
    isLoggedIn: boolean
    loading: boolean
    signIn: (data: SignInPayload) => Promise<void>
    signUp: (data: SignUpPayload) => Promise<void>
    signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"))
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    // const [isLoggedIn, setIsLoggedIn] = useState(!!token)

    const isLoggedIn = !!token;

    const signIn = async (data: SignInPayload) => {
        setLoading(true)
        try {
            const result = await apiSignIn(data)
            setToken(result.token)
            setUser(result.user)
            localStorage.setItem("token", result.token)
            localStorage.setItem("userId", result.user.userId)
            // setIsLoggedIn(true)
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (data: SignUpPayload) => {
        setLoading(true)
        try {
            const result = await apiSignUp(data)
            setToken(result.token)
            setUser(result.user)
            localStorage.setItem("token", result.token)
            localStorage.setItem("userId", result.user.userId)
            // setIsLoggedIn(true)
        } finally {
            setLoading(false)
        }
    }

    const signOut = async () => {
        setLoading(true)
        try {
            // If you add a logout API later, await it here
            setToken(null)
            setUser(null)
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
        } finally {
            setLoading(false)
            // setIsLoggedIn(false)
        }
    }

    useEffect(() => {
        const restoreSession = async () => {
            if (token) {
                try {
                    const userId = localStorage.getItem("userId")
                    if (!userId) throw new Error("No userId found")
                    
                    const currentUser = await getCurrentUser(userId, token)
                    setUser(currentUser)
                } catch (err) {
                    console.error("Failed to restore session:", err)
                    setToken(null)
                    setUser(null)
                    localStorage.removeItem("token")
                    localStorage.removeItem("userId")
                }
            }
            setLoading(false)
        }
        restoreSession()
    }, [token])

    return (
        <AuthContext.Provider value={{ token, user, isLoggedIn: !!token, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}
