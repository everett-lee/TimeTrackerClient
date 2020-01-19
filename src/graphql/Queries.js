import { gql } from 'apollo-boost';

/**
 * GraphQL queries for execution via the
 * APollo API
 */

const Queries = {
    ALL_CLIENTS: gql`
    query getAllClients($ownerId: ID!) {
        getAllClients(ownerId: $ownerId) {
           clientName
           businessType
           location
        }
    }
    `,
}

export default Queries;