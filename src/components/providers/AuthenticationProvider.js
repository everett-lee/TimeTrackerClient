import React, { useState, createContext } from 'react';

const AuthenticationContext = createContext();

function AuthenticationProvider({ children }) {
    const nullUser = { id: null, email: null };
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(nullUser);

    return (
        <AuthenticationContext.Provider value={{ authenticated, user, setUser }}>
            {children}
        </ AuthenticationContext.Provider>
    );
}

export { AuthenticationContext, AuthenticationProvider };

