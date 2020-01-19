import React, { useContext } from 'react';

import { Segment } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AuthenticationContext } from '../providers/AuthenticationProvider';
import Queries from '../../graphql/Queries';
import Mutations from '../../graphql/Mutations';
import TimerBox from "./TimerBox";
import DropdownSegment from "./DropdownSegment";

function TopSegment() {
  const authenticationContext = useContext(AuthenticationContext);

  const { loading, error, data, refetch } = useQuery(Queries.ALL_CLIENTS, {
    variables: { ownerId: authenticationContext.user.id },
  });
  
  const [deleteClient] = useMutation(Mutations.DELETE_CLIENT);

  const orderAlphabetically = (elOne, elTwo) => {
    return elOne.clientName.localeCompare(elTwo.clientName);
  }

  if (loading) return null; 
  if (error) console.log(error);

  const clients = {
    "type": "CLIENTS",
    "results": data.getAllClients
      .sort(orderAlphabetically)
      .map((el, index) => ({
        key: index,
        text: el.clientName,
        value: el.id
      })
      )
  };

  const callDeleteClient = (id) => {
    if (id) {
      deleteClient({
        variables:
        {
          "ownerId": authenticationContext.user.id,
          "clientId": id
        }
      });
      refetch();
    }
  }

  return (
    <Segment.Group horizontal id="topSegment">
      <Segment id="selectionBox">
        <DropdownSegment
          refetch={refetch}
          items={clients}
          deleteItem={callDeleteClient} />
      </Segment>
      <TimerBox></TimerBox>
    </Segment.Group>
  );
}

export default TopSegment;
