// Number to divide totalTime by
const divisor = 50000;
const rbgValueTask = 'rgb(51, 204, 51)';
const rbgValueSubtask = 'rgb(153, 255, 153)';

const getTaskNode = (task) => {
    if (!task) {
        return;
    }

    const { id, taskName, totalTime, complete } = task;

    const minRadius = 16;
    const reducedTime = totalTime / divisor;

    const radius = Math.max(reducedTime, minRadius);

    return {
        'id': 1,
        'radius': radius,
        'depth': 1,
        'color': rbgValueTask
    }
}

const getSubtaskTaskNode = (subtask) => {
    if (!subtask) {
        return;
    }

    const { id, subtaskName, totalTime, complete, dependsOn } = subtask;

    // The node representing the origin task has taken id 1, 
    // so add one to each subsequent subtask id
    const idPlusOne = Number(id) + 1;

    const minRadius = 8;
    const reducedTime = totalTime / divisor;

    const radius = Math.max(reducedTime, minRadius);

    return {
        'id': idPlusOne,
        'radius': radius,
        'depth': 1,
        'dependsOn': dependsOn,
        'color': rbgValueSubtask
    }
}

const getLinks = (node) => {
    // Return links from this node to its dependencies
    if (node.dependsOn.length) {
        return node.dependsOn
            .map(dependency => getLink(node.id, Number(dependency.id) + 1));
    }

    // If no dependencies, return node linked to the origin task
    return [getLink(node.id, 1)]
}

const getLink = (from, to) => {
    return {
        'source': from,
        'target': to,
        'distance': 120
    }
}

export { getTaskNode, getSubtaskTaskNode, getLinks };