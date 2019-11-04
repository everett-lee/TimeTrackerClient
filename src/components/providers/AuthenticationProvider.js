import React, { useState, createContext } from 'react';
//import Modal from '../Modal';
//import axios from 'axios';

const AuthenticationContext = createContext();

function AuthenticationProvider({ children }) {
    const nullUser = { username: null, userid: null };
    const [authenticated, setAuthenticated] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [user, setUser] = useState(nullUser);

    return (
        <AuthenticationContext.Provider value={{ authenticated, setUser, setModalActive }}>
            {children}
        </ AuthenticationContext.Provider>
    );
}

export { AuthenticationContext, AuthenticationProvider };

