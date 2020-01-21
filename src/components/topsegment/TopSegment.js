import React, { useContext } from 'react';
import { Segment } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AuthenticationContext } from '../providers/AuthenticationProvider';
import { TaskContext } from '../providers/TaskProvider';
import TimerBox from "./TimerBox";
import DropdownSegment from "./DropdownSegment";

import Queries from '../../graphql/Queries';
import Mutations from '../../graphql/Mutations';


function TopSegment() {
  const authenticationContext = useContext(AuthenticationContext);
  const ownerId = authenticationContext.user.id;

  const taskContext = useContext(TaskContext);

  const { loading: clientsLoading, error: clientsError, data: clientsData, refetch: clientsRefetch } = useQuery(Queries.ALL_CLIENTS, {
    variables: { ownerId },
  });

  const { loading: tasksLoading, error: tasksError, data: tasksData, refetch: tasksRefetch } = useQuery(Queries.ALL_TASKS, {
    variables: { ownerId },
  });

  const [deleteClient] = useMutation(Mutations.DELETE_CLIENT);

  if (clientsLoading || tasksLoading) return null;
  if (clientsError || tasksError) clientsError ? console.error(clientsError) : console.error(tasksError);

  taskContext.setClients(clientsData.getAllClients);
  const clients = clientsData.getAllClients
    .sort((a, b) => a.clientName.localeCompare(b.clientName))
    .map((el, index) => ({
      key: index,
      text: el.clientName,
      value: el.id
    })
    );

  taskContext.setTasks(tasksData.getAllTasks);
  const tasks = tasksData.getAllTasks
    .sort((a, b) => a.taskName.localeCompare(b.taskName))
    .map((el, index) => ({
      key: index,
      text: el.taskName,
      value: el.id
    })
    );

  console.log(taskContext.tasks)

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
          deleteItem={callDeleteClient} 
          itemName={"client"} />
        <DropdownSegment
          refetch={tasksRefetch}
          items={tasks}
          deleteItem={null} 
          itemName={"task"} />
      </Segment>
      <TimerBox></TimerBox>
    </Segment.Group>
  );
}

export default TopSegment;
