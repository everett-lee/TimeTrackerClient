import React, { useContext, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AuthenticationContext } from '../providers/AuthenticationProvider';
import { TaskContext } from '../providers/TaskProvider';
import { getMappedClients, getMappedTasks, getMappedSubtasks } from './helpers/DataProcessors'
import TimerBox from "./timer/TimerBox";

import { curryDeleteClient, callDeleteClient, callDeleteTask, callDeleteSubtask } from './helpers/DeleteFunctions';
import DropdownSegment from "./DropdownSegment";
import Queries from '../../graphql/Queries';
import Mutations from '../../graphql/Mutations';

/** 
 * Top level component for getting and processing data 
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

  const handleUpdateActiveSubtaskId = (id) => {
    setActiveSubtaskId(id);
    taskContext.setActiveSubtaskId(id);
  }

  // Retrieve data for all clients and tasks
  const { loading: clientsLoading, error: clientsError, data: clientsData, refetch: clientsRefetch } = useQuery(Queries.ALL_CLIENTS, {
    variables: { ownerId },
  });
  const { loading: tasksLoading, error: tasksError, data: tasksData, refetch: tasksRefetch } = useQuery(Queries.ALL_TASKS, {
    variables: { ownerId },
  });

  if (clientsLoading || tasksLoading) return null;
  if (clientsError || tasksError) clientsError ? console.error(clientsError) : console.error(tasksError);

  const clients = getMappedClients(clientsData.getAllClients);

  taskContext.setTasks(tasksData.getAllTasks);
  const tasks = getMappedTasks(tasksData.getAllTasks, activeClientId);

  // subtasks associated with the currently selected task
  const subtasks = getMappedSubtasks(tasksData.getAllTasks, activeClientId, activeTaskId)

  const callSetClientId = (id) => {
    setActiveClientId(id);
    setActiveTaskId(null);
    taskContext.setTasks(null);
    taskContext.setActiveTaskIdHelper(null);
    setActiveSubtaskId(null);;
  }

  const callSetTaskId = (id) => {
    setActiveTaskId(id);
    taskContext.setActiveTaskIdHelper(id);
    setActiveSubtaskId(null);;
  }

  const handleTaskRefetch = () => {
    tasksRefetch()
    taskContext.setActiveTaskIdHelper(activeTaskId);
    taskContext.setTasks(tasksData.getAllTasks);
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
          refetch={handleTaskRefetch}
          items={tasks}
          deleteItem={curriedDeleteTask(setActiveTaskId, tasksRefetch, deleteTask, ownerId)}
          itemName={"task"}
          setActiveItem={callSetTaskId}
          activeClientId={activeClientId}
          addDisabled={!Boolean(activeClientId)}
          deleteDisabled={!Boolean(activeTaskId)} />
        <DropdownSegment
          refetch={handleTaskRefetch}
          items={subtasks}
          deleteItem={curriedDeleteSubtask(setActiveSubtaskId, tasksRefetch, deleteSubtask, ownerId)}
          itemName={"subtask"}
          setActiveItem={handleUpdateActiveSubtaskId}
          activeTaskId={activeTaskId}
          addDisabled={!Boolean(activeTaskId)}
          deleteDisabled={!Boolean(activeSubtaskId)} />
      </Segment>
      <TimerBox></TimerBox>
    </Segment.Group>
  );
}

export default TopSegment;
