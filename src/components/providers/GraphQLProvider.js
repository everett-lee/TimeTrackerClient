import React, { useState, createContext } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import Queries from '../../graphql/Queries';
import sleep from '../utils/sleep';

const GraphQLContext = createContext();

function GraphQLProvider({ children }) {
    const [errorMessage, setErrorMessage] = useState('');

    // Used by both the top and bottom components to fetch a single
    // task with the latest total time
    const [getTask] = useLazyQuery(Queries.GET_TASK, {
      fetchPolicy: 'cache-and-network'
    });

    // Strips 'GraphQL error:' from message
    const parseError = ({ message }) => {
        const firstColon = message.indexOf(':');
        const outputMessage = message.slice(firstColon + 1);

        setErrorMessage(outputMessage);
        sleep(1000).then( () => {
            setErrorMessage('');
        })
    }

    return (
        <GraphQLContext.Provider value={{ errorMessage, parseError, getTask }}>
            {children}
        </ GraphQLContext.Provider>
    );
}

export { GraphQLContext, GraphQLProvider };

