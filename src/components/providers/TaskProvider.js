import React, { useState, createContext } from 'react';
import { getTaskNode } from './NodeFactory';

const TaskContext = createContext();

// only store tasks here?
function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(null);
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [activeSubtaskId, setActiveSubtaskId] = useState(null);

    const [nodes, setNodes] = useState([null]);
    const [links, setLinks] = useState([]);

    const setActiveTaskIdHelper = (id) => {
        if (id === null) {
            setActiveTaskId(null);
            setNodes(null);
            setLinks(null);
            return;
        }

        const activeTask = tasks.filter(task => task.id === id)[0];
        setNodes(getTaskNode(activeTask));

    }

    return (
        <TaskContext.Provider value={{
            tasks, setTasks,
            activeTaskId, setActiveTaskIdHelper,
            activeSubtaskId, setActiveSubtaskId
        }}>
            {children}
        </ TaskContext.Provider>
    );
}

export { TaskContext, TaskProvider };

