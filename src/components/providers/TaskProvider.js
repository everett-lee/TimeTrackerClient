import React, { useState, createContext } from 'react';

const TaskContext = createContext();

function TaskProvider({ children }) {
    const [clients, setClients] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [subtasks, setSubtasks] = useState(null);

    return (
        <TaskContext.Provider value={{ clients, setClients, 
                                       tasks, setTasks,
                                       subtasks, setSubtasks }}>
            {children}
        </ TaskContext.Provider>
    );
}

export { TaskContext, TaskProvider };

