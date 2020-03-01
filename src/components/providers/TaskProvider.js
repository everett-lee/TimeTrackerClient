import React, { useEffect, useState, createContext } from 'react';
import { getTaskNode, getSubtaskTaskNode, getLinks } from './NodeFactory';

const TaskContext = createContext();

function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(null);
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [activeSubtaskId, setActiveSubtaskId] = useState(null);

    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if (activeTaskId === null) {
            setNodes([]);
            setLinks([]);
            return;
        }

        const activeTask = tasks.filter(task => task.id === activeTaskId)[0];

        // Transform the active task and its subtasks to graph nodes
        // and the links between them 
        const taskNode = getTaskNode(activeTask);
        const subtaskNodes = activeTask.subtasks
            .map(subtask => getSubtaskTaskNode(subtask));

        const links = subtaskNodes
            .map(subtaskNode => getLinks(subtaskNode))
            .flatMap(link => link);

        setNodes([taskNode, ...subtaskNodes]);
        setLinks(links)
    }, [tasks, activeTaskId, activeSubtaskId]);

    return (
        <TaskContext.Provider value={{
            tasks, setTasks,
            activeTaskId, setActiveTaskId,
            activeSubtaskId, setActiveSubtaskId,
            nodes, links
        }}>
            {children}
        </ TaskContext.Provider>
    );
}

export { TaskContext, TaskProvider };

