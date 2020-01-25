import React, { useContext, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AuthenticationContext } from '../providers/AuthenticationProvider';
import { TaskContext } from '../providers/TaskProvider';
import TimerBox from "./TimerBox";
import DropdownSegment from "./DropdownSegment";

import Queries from '../../graphql/Queries';
import Mutations from '../../graphql/Mutations';

/** 
 * Top level component for storing and getting data 
 * from the server
**/
function TopSegment() {
  const authenticationContext = useContext(AuthenticationContext);
  const ownerId = authenticationContext.user.id;

  const taskContext = useContext(TaskContext);

  const [activeClientId, setActiveClientId] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);

  const mapForDropdown = (data, itemName) => {
    return data.sort((a, b) => a[itemName].localeCompare(b[itemName]))
      .map((el, index) => ({
        key: index,
        text: el[itemName],
        value: el.id
      }))
  }

  const [deleteClient] = useMutation(Mutations.DELETE_CLIENT);
  const [deleteTask] = useMutation(Mutations.DELETE_TASK);

  const { loading: clientsLoading, error: clientsError, data: clientsData, refetch: clientsRefetch } = useQuery(Queries.ALL_CLIENTS, {
    variables: { ownerId },
  });

  const { loading: tasksLoading, error: tasksError, data: tasksData, refetch: tasksRefetch } = useQuery(Queries.ALL_TASKS, {
    variables: { ownerId },
  });

  if (clientsLoading || tasksLoading) return null;
  if (clientsError || tasksError) clientsError ? console.error(clientsError) : console.error(tasksError);

  taskContext.setClients(clientsData.getAllClients);
  const clients = mapForDropdown(clientsData.getAllClients, "clientName");

  taskContext.setTasks(tasksData.getAllTasks);
  const tasks = mapForDropdown(tasksData.getAllTasks
    .filter(task => task.client.id === activeClientId), "taskName");

  const activeSubtasks = tasksData.getAllTasks
    .filter(task => task.client.id === activeClientId && task.id === activeTaskId)
    .flatMap(task => task.subtasks);
  const subtasks = mapForDropdown(activeSubtasks, "subtaskName")

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

  const callDeleteTask = (id) => {
    if (id) {
      deleteTask({
        variables:
        {
          "ownerId": ownerId,
          "taskId": id
        }
      });
      tasksRefetch();
    }
  }

  return (
    <Segment.Group horizontal id="topSegment">
      <Segment id="selectionBox">
        <DropdownSegment
          refetch={clientsRefetch}
          items={clients}
          deleteItem={callDeleteClient}
          itemName={"client"}
          setActiveItem={setActiveClientId} />
        <DropdownSegment
          refetch={tasksRefetch}
          items={tasks}
          deleteItem={callDeleteTask}
          itemName={"task"}
          setActiveItem={setActiveTaskId}
          activeClientId={activeClientId} />
        <DropdownSegment
          refetch={tasksRefetch}
          items={subtasks}
          deleteItem={null}
          itemName={"subtask"}
          setActiveItem={null}
          activeSubtaskId={null} />
      </Segment>
      <TimerBox></TimerBox>
    </Segment.Group>
  );
}

export default TopSegment;
