import { gql } from 'apollo-boost';

/**
 * GraphQL queries for execution via the
 * APollo API
 */

const Queries = {
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

export default Queries;