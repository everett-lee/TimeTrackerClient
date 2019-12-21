import { gql } from 'apollo-boost';

/**
 * GraphQL queries for execution via the
 * APollo API
 */

const queries = {
    ALL_CLIENTS: (id) => gql`
    {
    getAllClients(ownerId: ${id}) {
        clientName
        businessType
        location
    }
    }
    `,
}

export default queries;