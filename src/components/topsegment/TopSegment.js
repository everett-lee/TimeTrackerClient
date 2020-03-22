import React, { useContext, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AuthenticationContext } from '../providers/AuthenticationProvider';
import { TaskContext } from '../providers/TaskProvider';
import { MessageContext } from '../providers/MessageProvider';
import { getMappedClients, getMappedTasks, getMappedSubtasks } from './helpers/DataProcessors'
import TimerBox from './timer/TimerBox';

import { curryDeleteClient, callDeleteClient, callDeleteTask, callDeleteSubtask } from './helpers/DeleteFunctions';
import DropdownSegment from './DropdownSegment';
import Queries from '../../graphql/Queries';
import Mutations from '../../graphql/Mutations';

/** 
 * Top level component for retrieving and processing data 
**/
function TopSegment() {
  const { user } = useContext(AuthenticationContext);
  const { parseError } = useContext(MessageContext);

  const { setTasks, activeTaskId, setActiveTaskId, activeSubtaskId, setActiveSubtaskId } = useContext(TaskContext);
  const ownerId = user.id;

  const [activeClientId, setActiveClientId] = useState(null);

  const [deleteClient] = useMutation(Mutations.DELETE_CLIENT,
    {
      onError: (e) => {
        parseError(e);
      }
    });
  const [deleteTask] = useMutation(Mutations.DELETE_TASK,
    {
      onError: (e) => {
        parseError(e);
      }
    });
  // Define mutation, which will refetch results on completion
  const [deleteSubtask] = useMutation(Mutations.DELETE_SUBTASK,
    {
      onCompleted: () => {
        handleTaskRefetch()
      },
      onError: (e) => {
        parseError(e);
      }
    });

  // Returns curried function awaiting deleted item id
  const curriedDeleteClient = curryDeleteClient(callDeleteClient);
  const curriedDeleteTask = curryDeleteClient(callDeleteTask);
  const curriedDeleteSubtask = curryDeleteClient(callDeleteSubtask);

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

  setTasks(tasksData.getAllTasks);
  const tasks = getMappedTasks(tasksData.getAllTasks, activeClientId);

  // subtasks associated with the currently selected task
  const subtasks = getMappedSubtasks(tasksData.getAllTasks, activeClientId, activeTaskId)

  const callSetClientId = (id) => {
    setActiveClientId(id);
    setActiveTaskId(null);
    setTasks(null);
    setActiveSubtaskId(null);;
  }

  const callSetTaskId = (id) => {
    setActiveTaskId(id);
    setActiveSubtaskId(null);;
  }

  const handleTaskRefetch = () => {
    tasksRefetch()
    setActiveTaskId(activeTaskId);
    setTasks(tasksData.getAllTasks);
  }

  return (
    <Segment.Group size={"small"} compact horizontal id='topSegment'>
      <Segment size={"small"} id='selectionBox'>
        <DropdownSegment
          refetch={clientsRefetch}
          items={clients}
          deleteItem={curriedDeleteClient(setActiveClientId, deleteClient, ownerId)}
          itemName={'client'}
          setActiveItem={callSetClientId}
          deleteDisabled={!Boolean(activeClientId)}
          addDisabled={false} />
        <DropdownSegment
          refetch={handleTaskRefetch}
          items={tasks}
          deleteItem={curriedDeleteTask(setActiveTaskId, deleteTask, ownerId)}
          itemName={'task'}
          setActiveItem={callSetTaskId}
          activeClientId={activeClientId}
          addDisabled={!Boolean(activeClientId)}
          deleteDisabled={!Boolean(activeTaskId)} />
        <DropdownSegment
          refetch={handleTaskRefetch}
          items={subtasks}
          deleteItem={curriedDeleteSubtask(setActiveSubtaskId, deleteSubtask, ownerId)}
          itemName={'subtask'}
          setActiveItem={setActiveSubtaskId}
          activeTaskId={activeTaskId}
          addDisabled={!Boolean(activeTaskId)}
          deleteDisabled={!Boolean(activeSubtaskId)} />
      </Segment>
      <TimerBox refetch={handleTaskRefetch} />
    </Segment.Group>
  );
}

export default TopSegment;
