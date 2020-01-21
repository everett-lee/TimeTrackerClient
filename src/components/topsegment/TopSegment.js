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
  const ownerId = authenticationContext.user.id;

  const orderAlphabetically = (elOne, elTwo) => {
    return elOne.clientName.localeCompare(elTwo.clientName);
  }

  const { loading: clientsLoading, error: clientsError, data: clientsData, refetch: clientsRefetch } = useQuery(Queries.ALL_CLIENTS, {
    variables: { ownerId },
  });

  const { loading: tasksLoading, error: tasksError, data: tasksData, refetch: tasksRefetch } = useQuery(Queries.ALL_TASKS, {
    variables: { ownerId },
  });

  const [deleteClient] = useMutation(Mutations.DELETE_CLIENT);

  if (clientsLoading || tasksLoading) return null;
  if (clientsError || tasksError) clientsError ? console.error(clientsError) : console.error(tasksError);

  const clients = {
    "type": "CLIENTS",
    "results": clientsData.getAllClients
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
          "ownerId": ownerId,
          "clientId": id
        }
      });
      clientsRefetch();
    }
  }

  return (
    <Segment.Group horizontal id="topSegment">
      <Segment id="selectionBox">
        <DropdownSegment
          refetch={clientsRefetch}
          items={clients}
          deleteItem={callDeleteClient} />
      </Segment>
      <TimerBox></TimerBox>
    </Segment.Group>
  );
}

export default TopSegment;
