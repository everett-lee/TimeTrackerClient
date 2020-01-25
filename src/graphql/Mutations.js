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
    `
};

export default Mutations;