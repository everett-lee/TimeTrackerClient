// Number to divide totalTime by
const divisor = 50000;
const rbgValueTask = 'rgb(51, 204, 51)';
const rbgValueLightGreen = 'rgb(153, 255, 153)';
const rbgValueRed = 'rgb(255, 77, 77)';

/**
 * Input a task to create a corresponding graph node object
 * 
 * @param {Object} task 
 */
const getTaskNode = (task) => {
    if (!task) {
        return;
    }

    const { totalTime } = task;

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

/**
 * Input a task to create a corresponding graph node object 
 * 
 * @param {Object} subtask 
 * @param {Number} activeSubtaskId the id of the active subtask 
 * to highlight
 */
const getSubtaskTaskNode = (subtask, activeSubtaskId) => {
    if (!subtask) {
        return;
    }

    const { id, subtaskName, totalTime, dependsOn } = subtask;

    // The node representing the original task has taken id 1, 
    // so add one to each subsequent subtask id
    const idPlusOne = Number(id) + 1;

    const colour = activeSubtaskId === id ? rbgValueRed : rbgValueLightGreen

    const minRadius = 8;
    const reducedTime = totalTime / divisor;

    const radius = Math.max(reducedTime, minRadius);

    return {
        'id': idPlusOne,
        'name': subtaskName,
        'radius': radius,
        'depth': 1,
        'dependsOn': dependsOn,
        'color': colour
    }
}

/**
 * 
 * Map each node to an array of links to 
 * other nodes
 * 
 * @param {Object} node 
 */
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