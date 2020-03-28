const mapForDropdown = (data, itemName) => {
    return data.sort((a, b) => a[itemName].localeCompare(b[itemName]))
        .map((el, index) => ({
            key: index,
            text: el[itemName],
            value: el.id
        }))
}

const getMappedClients = (clients) => {
    return mapForDropdown(clients, 'clientName');
}

const getMappedTasks = (tasks, activeClientId) => {
    return mapForDropdown(tasks
        .filter(task => task.client.id === activeClientId), 'taskName');
}

const getMappedSubtasks = (tasks, activeClientId, activeTaskId) => {
    const activeSubtasks = tasks
        .filter(task => task.client.id === activeClientId && task.id === activeTaskId)
        .flatMap(task => task.subtasks);

    return mapForDropdown(activeSubtasks, 'subtaskName');
}

export { getMappedClients, getMappedTasks, getMappedSubtasks }