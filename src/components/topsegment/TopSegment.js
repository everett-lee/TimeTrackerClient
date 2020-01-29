import React, { useContext, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AuthenticationContext } from '../providers/AuthenticationProvider';
import { TaskContext } from '../providers/TaskProvider';
import TimerBox from "./TimerBox";

import { curryDeleteClient, callDeleteClient, callDeleteTask, callDeleteSubtask } from './helpers/deleteFunctions';
import DropdownSegment from "./DropdownSegment";
import Queries from '../../graphql/Queries';
import Mutations from '../../graphql/Mutations';
/** 
 * Top level component for storing and sending data 
**/
function TopSegment() {
  const authenticationContext = useContext(AuthenticationContext);
  const taskContext = useContext(TaskContext);
  const ownerId = authenticationContext.user.id;
    
  const [activeClientId, setActiveClientId] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [activeSubtaskId, setActiveSubtaskId] = useState(null);
  
  const [deleteClient] = useMutation(Mutations.DELETE_CLIENT);
  const [deleteTask] = useMutation(Mutations.DELETE_TASK);
  const [deleteSubtask] = useMutation(Mutations.DELETE_SUBTASK);

  // Curry delete mutations to return when item id provided
  const curriedDeleteClient = curryDeleteClient(callDeleteClient);
  const curriedDeleteTask = curryDeleteClient(callDeleteTask);
  const curriedDeleteSubtask = curryDeleteClient(callDeleteSubtask);

  const mapForDropdown = (data, itemName) => {
    return data.sort((a, b) => a[itemName].localeCompare(b[itemName]))
      .map((el, index) => ({
        key: index,
        text: el[itemName],
        value: el.id
      }))
  }

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

  // subtasks associated with the currently selected task
  const activeSubtasks = tasksData.getAllTasks
    .filter(task => task.client.id === activeClientId && task.id === activeTaskId)
    .flatMap(task => task.subtasks);
  const subtasks = mapForDropdown(activeSubtasks, "subtaskName")

  const callSetClientId = (id) => {
    setActiveClientId(id);
    setActiveTaskId(null);
    setActiveSubtaskId(null);
  }

  const callSetTaskId = (id) => {
    setActiveTaskId(id);
    setActiveSubtaskId(null);
  }

  return (
    <Segment.Group horizontal id="topSegment">
      <Segment id="selectionBox">
        <DropdownSegment
          refetch={clientsRefetch}
          items={clients}
          deleteItem={curriedDeleteClient(setActiveClientId, clientsRefetch, deleteClient, ownerId)}
          itemName={"client"}
          setActiveItem={callSetClientId}
          deleteDisabled={!Boolean(activeClientId)}
          addDisabled={false} />
        <DropdownSegment
          refetch={tasksRefetch}
          items={tasks}
          deleteItem={curriedDeleteTask(setActiveTaskId, tasksRefetch, deleteTask, ownerId)}
          itemName={"task"}
          setActiveItem={callSetTaskId}
          activeClientId={activeClientId}
          addDisabled={!Boolean(activeClientId)}
          deleteDisabled={!Boolean(activeTaskId)} />
        <DropdownSegment
          refetch={tasksRefetch}
          items={subtasks}
          deleteItem={curriedDeleteSubtask(setActiveSubtaskId, tasksRefetch, deleteSubtask, ownerId)}
          itemName={"subtask"}
          setActiveItem={setActiveSubtaskId}
          activeTaskId={activeTaskId}
          addDisabled={!Boolean(activeTaskId)}
          deleteDisabled={!Boolean(activeSubtaskId)} />
      </Segment>
      <TimerBox></TimerBox>
    </Segment.Group>
  );
}

export default TopSegment;
