import { gql } from 'apollo-boost';

/**
 * GraphQL queries for execution via the
 * Apollo API
 */
const Queries = {
    ALL_CLIENTS: gql`
    query getAllClients($ownerId: ID!) {
        getAllClients(ownerId: $ownerId) {
           id
           clientName
           businessType
           location
        }
    }
    `,
    ALL_TASKS: gql`
    query getAllTasks($ownerId: ID!) {
        getAllTasks(ownerId: $ownerId) {
           id
           taskName
           totalTime
           subtasks {
            id
            subtaskName
            category
            totalTime
            dependsOn {
               id   
            }
        }
           client {
               id
               clientName
               businessType
               location
           }
           completed
        }
    }
    `,
    GET_TASK: gql`
    query getTask($ownerId: ID!, $taskId: ID!) {
        getTask(ownerId: $ownerId, taskId: $taskId) {
           id
           taskName
           totalTime
        }
    }
    `,
    ALL_SUBTASKS: gql`
    query getAllSubtasks($ownerId: ID!, $taskId: ID!) {
        getAllSubtasks(ownerId: $ownerId, taskId: $taskId) {
           id
           timeCommits {
               id
               date
               time
           }
        }
    }
    `,
    ALL_TIMECOMMITS: gql`
    query getAllTimeCommits($ownerId: ID!, $subtaskId: ID!) {
        getAllTimeCommits(ownerId: $ownerId, subtaskId: $subtaskId) {
           id
           date
           time
        }
    }
    `
}

export default Queries;