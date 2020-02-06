import gql from 'graphql-tag';

const Mutations = {
    CREATE_CLIENT: gql`
    mutation createClient($ownerId: ID!, $clientName: String!, $businessType: String!, $location: String!){
        createClient(ownerId: $ownerId, clientName: $clientName, businessType: $businessType, location: $location) {
          id
          clientName
          businessType
          location
        }
      }
    `,
    DELETE_CLIENT: gql`
    mutation deleteClient($ownerId: ID!, $clientId: ID!){
      deleteClient(ownerId: $ownerId, clientId: $clientId) 
    }
    `,
    CREATE_TASK: gql`
    mutation createTask($ownerId: ID!, $taskName: String!, $clientId: ID!) {
      createTask(ownerId: $ownerId, taskName: $taskName, clientId: $clientId) {
        id
        taskName
        client {
          id
          clientName
        }
      }
    }
    `,
    DELETE_TASK: gql`
    mutation deleteTask($ownerId: ID!, $taskId: ID!){
      deleteTask(ownerId: $ownerId, taskId: $taskId) 
    }
    `,
    CREATE_SUBTASK: gql`
    mutation createSubtask($ownerId: ID!, $taskId: ID!, $subtaskName: String!, $category: String!, $dependsOnIds: [ID]!) {
      createSubtask(ownerId: $ownerId, taskId: $taskId, subtaskName: $subtaskName, category: $category, dependsOnIds: $dependsOnIds) {
             id
             dependsOn {
                 id
             }
        }
    }
    `,
    DELETE_SUBTASK: gql`
    mutation deleteSubtask($ownerId: ID!, $subtaskId: ID!){
      deleteSubtask(ownerId: $ownerId, subtaskId: $subtaskId) 
    }
    `,
    CREATE_OR_UPDATE_TIMECOMMIT: gql`
    mutation createOrUpdateTimeCommit($ownerId: ID!, $subtaskId: ID!, $time: Long!){
      createOrUpdateTimeCommit(ownerId: $ownerId, subtaskId: $subtaskId, time: $time) {
        id
        ownerId
        time
      }
    }
    `,
};

export default Mutations;