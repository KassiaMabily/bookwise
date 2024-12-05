'use client'

import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

interface AuthContextType {
    user: any;
    login: (data: { key: string, user: IUserDetail }) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<{ key: string, user: IUserDetail } | null>(null);

    useEffect(() => {
        const data = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN || 'token');
        if (data) {
            setUser(JSON.parse(data));
        }
    }, []);

    const login = (data: { key: string, user: IUserDetail }) => {
        localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN || 'token', JSON.stringify(data));
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN || 'token');
        setUser(null);
    };

    const isLoggedIn = user !== null;

    return (
        <AuthContext.Provider value={{user, login, logout, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};