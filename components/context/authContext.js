// 'use client'
// import React, { createContext, useState, useEffect, useContext } from 'react';

// export const AuthContext = createContext(null);


// const AuthProvider = props => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);

//     useEffect(() => {
        
//         const storedToken = localStorage.getItem('jwtToken');
//         if (storedToken) {
//             setToken(storedToken);
            
//         }
//     }, []);

//     const login = (userData, jwtToken) => {
        
//         setToken(jwtToken);
//         setUser(userData);
//         localStorage.setItem('jwtToken', jwtToken);
//     };

//     const logout = () => {
        
//         setToken(null);
//         setUser(null);
//         localStorage.removeItem('jwtToken');
//     };

//     return (
//         <AuthContext.Provider value={{ user, token, login, logout }}>
//             {props.children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

// export default AuthProvider;



'use client'
import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);   

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (userData, jwtToken) => {
        setToken(jwtToken);
        setUser(userData);
        localStorage.setItem('jwtToken', jwtToken);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('jwtToken');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
    

