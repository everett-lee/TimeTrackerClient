import React, { useState, createContext } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import Queries from '../../graphql/Queries';
import Mutations from '../../graphql/Mutations';
import sleep from '../utils/sleep';

const GraphQLContext = createContext();

function GraphQLProvider({ children }) {
    const [errorMessage, setErrorMessage] = useState('');

    // Used by both the top and bottom components to fetch a single
    // task with the latest total time
    const [getTask] = useLazyQuery(Queries.GET_TASK, {
        fetchPolicy: 'cache-and-network'
    });

    const [deleteClient] = useMutation(Mutations.DELETE_CLIENT,
        {
            onError: (e) => {
                parseError(e);
            }
        });

    const [deleteTask] = useMutation(Mutations.DELETE_TASK,
        {
            onError: (e) => {
                parseError(e);
            }
        });
        
    // Define mutation, which will refetch results on completion
    const [deleteSubtask] = useMutation(Mutations.DELETE_SUBTASK,
        {
            onError: (e) => {
                parseError(e);
            }
        });

    // Strips 'GraphQL error:' from message
    const parseError = ({ message }) => {
        const firstColon = message.indexOf(':');
        const outputMessage = message.slice(firstColon + 1);

        setErrorMessage(outputMessage);
        sleep(1000).then(() => {
            setErrorMessage('');
        })
    }

    return (
        <GraphQLContext.Provider value={{
            errorMessage, parseError, getTask,
            deleteClient, deleteTask, deleteSubtask
        }}>
            {children}
        </ GraphQLContext.Provider>
    );
}

export { GraphQLContext, GraphQLProvider };

