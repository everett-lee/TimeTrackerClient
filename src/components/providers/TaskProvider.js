import React, { useState, createContext } from 'react';
import { getTaskNode, getSubtaskTaskNode, getLinks} from './NodeFactory';

const TaskContext = createContext();

// only store tasks here?
function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(null);
    const [activeTaskId, setActiveTaskId] = useState(null);
    const [activeSubtaskId, setActiveSubtaskId] = useState(null);

    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);

    const setActiveTaskIdHelper = (id) => {
        if (id === null) {
            setActiveTaskId(null);
            setNodes([]);
            setLinks([]);
            return;
        }

        const activeTask = tasks.filter(task => task.id === id)[0];
        const taskNode = getTaskNode(activeTask);
        const subtaskNodes = activeTask.subtasks
                                .map(subtask => getSubtaskTaskNode(subtask));

        console.log(activeTask)
        const links = subtaskNodes
                        .map(subtaskNode => getLinks(subtaskNode))
                        .flatMap(link => link);

        console.log("+++++++++")
        console.log([taskNode, ...subtaskNodes])
        console.log(links)

        setNodes([taskNode, ...subtaskNodes]);
        setLinks(links)

    }

    return (
        <TaskContext.Provider value={{
            tasks, setTasks,
            activeTaskId, setActiveTaskIdHelper,
            activeSubtaskId, setActiveSubtaskId,
            nodes, links
        }}>
            {children}
        </ TaskContext.Provider>
    );
}

export { TaskContext, TaskProvider };

