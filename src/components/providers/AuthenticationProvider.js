import React, { useState, createContext } from 'react';

const AuthenticationContext = createContext();

/**
 * Makes the logged-in user's authentication details and
 * id globally available
 */
function AuthenticationProvider({ children }) {
    const nullUser = { id: null, token: null };
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(nullUser);

    const updateUserAndLocalStorage = (user) => {
        localStorage.setItem('token', user.token);
        setUser(user);
    }

    return (
        <AuthenticationContext.Provider value={{ authenticated, setAuthenticated, 
                                                 user, updateUserAndLocalStorage }}>
            {children}
        </ AuthenticationContext.Provider>
    );
}

export { AuthenticationContext, AuthenticationProvider };

