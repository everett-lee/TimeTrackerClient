import React, { useState, createContext } from 'react';

import sleep from '../utils/sleep';

const MessageContext = createContext();

function MessageProvider({ children }) {
    const [errorMessage, setErrorMessage] = useState('');

    // Strips 'GraphQL error:' from message
    const parseError = ({ message }) => {
        const firstColon = message.indexOf(':');
        const outputMessage = message.slice(firstColon + 1);

        setErrorMessage(outputMessage);
        sleep(1000).then( () => {
            setErrorMessage("");
        })
    }

    return (
        <MessageContext.Provider value={{ errorMessage, parseError }}>
            {children}
        </ MessageContext.Provider>
    );
}

export { MessageContext, MessageProvider };

