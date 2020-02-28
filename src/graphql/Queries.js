import { gql } from 'apollo-boost';

/**
 * GraphQL queries for execution via the
 * APollo API
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
    `
}

export default Queries;