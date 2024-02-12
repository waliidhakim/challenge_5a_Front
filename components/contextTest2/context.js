'use client';

import { createContext, useState, useContext , useEffect} from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const initialState = {
        id: "0",
        token: '',
        role: "ROLE_PUBLIC_ACCESS"
    };

    const [user, setUser] = useState(initialState);

    useEffect(() => {
        // Charger l'état à partir de localStorage quand le composant est monté
        const userId = localStorage.getItem('userId') || "0";
        const jwtToken = localStorage.getItem('jwtToken') || '';
        const role = localStorage.getItem('role') || 'ROLE_PUBLIC_ACCESS';
        console.log(`User ID : ${userId} | User Role : ${role}`);
        setUser({
            id: userId,
            token: jwtToken,
            role : role
        });
    }, []); // Le tableau vide signifie que l'effet ne s'exécute qu'une fois, après le premier rendu

    // Sauvegarder l'état dans localStorage à chaque modification
    useEffect(() => {
        if (user.id !== "0") {
            localStorage.setItem('userId', user.id);
        }
        if (user.token !== '') {
            localStorage.setItem('jwtToken', user.token);
        }
        if (user.role !== 'ROLE_PUBLIC_ACCESS' ) {
            localStorage.setItem('role', user.role);
        }
    }, [user]); // Se déclenche à chaque fois que l'état 'user' change

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
