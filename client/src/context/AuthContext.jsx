import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import api from "../api";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const location = useLocation()
    const protectedRoutes = location.pathname.startsWith('/products') || location.pathname.startsWith('/admin');


    const { data: user, isLoading, error, refetch } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const res = await api.get('/auth/me');
            return res.data.user
        },
        enabled: protectedRoutes,
        retry: false,
    })

    const values = {
        user, isLoading, error, refetch
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);