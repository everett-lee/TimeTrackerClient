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
`
};

export default Mutations;