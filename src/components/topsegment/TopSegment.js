import React, { useContext, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';

import { AuthenticationContext } from '../providers/AuthenticationProvider';
import { TaskContext } from '../providers/TaskProvider';
import { MessageContext } from '../providers/MessageProvider';
import { getMappedClients, getMappedTasks, getMappedSubtasks } from './helpers/DataProcessors'
import TimerBox from './timercomponents/TimerBox';
import { curryDeleteItem, callDeleteClient, callDeleteTask, callDeleteSubtask } from './helpers/DeleteFunctions';
import DropdownSegment from './DropdownSegment';
import Queries from '../../graphql/Queries';
import Mutations from '../../graphql/Mutations';

/** 
 * Top level component for fetching and processing data to supply
 * to its children
**/
function TopSegment() {
  const { user: { id: userId } } = useContext(AuthenticationContext);
  const { parseError } = useContext(MessageContext);

  const { setTasks, activeTaskId, setActiveTaskId, activeSubtaskId, setActiveSubtaskId } = useContext(TaskContext);

  const [activeClientId, setActiveClientId] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const [getTask] = useLazyQuery(Queries.GET_TASK, {
    variables: {
      'ownerId': userId,
      'taskId': activeTaskId
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      setActiveTask(data.getTask)
    }
  });

  const [deleteClient] = useMutation(Mutations.DELETE_CLIENT,
    {
      onCompleted: () => {
        setActiveTask(null)
      },
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
        getTask()
        handleTaskRefetch()
      },
      onError: (e) => {
        parseError(e);
      }
    });

  // Returns curried function awaiting deleted item id
  const curriedDeleteClient = curryDeleteItem(callDeleteClient);
  const curriedDeleteTask = curryDeleteItem(callDeleteTask);
  const curriedDeleteSubtask = curryDeleteItem(callDeleteSubtask);

  // Retrieve data for all clients and tasks
  const { loading: clientsLoading, error: clientsError, data: clientsData, refetch: clientsRefetch } = useQuery(Queries.ALL_CLIENTS, {
    variables: { ownerId: userId },
  });
  const { loading: tasksLoading, error: tasksError, data: tasksData, refetch: tasksRefetch } = useQuery(Queries.ALL_TASKS, {
    variables: { ownerId: userId },
  });

  if (clientsLoading || tasksLoading) return null;
  if (clientsError || tasksError) clientsError ? console.error(clientsError) : console.error(tasksError);

  const clients = getMappedClients(clientsData.getAllClients);

  setTasks(tasksData.getAllTasks);
  const tasks = getMappedTasks(tasksData.getAllTasks, activeClientId);

  // subtasks associated with the currently selected task
  const subtasks = getMappedSubtasks(tasksData.getAllTasks, activeClientId, activeTaskId)

  const handleSetClientId = (id) => {
    setActiveClientId(id);
    setActiveTaskId(null);
    setTasks(null);
    setActiveSubtaskId(null);;
  }

  const handleSetTaskId = (id) => {
    setActiveTaskId(id);
    setActiveSubtaskId(null);;
  }

  const handleTaskRefetch = () => {
    tasksRefetch()
    setActiveTaskId(activeTaskId);
    setTasks(tasksData.getAllTasks);
  }

  return (
    <Segment.Group size={'small'} compact horizontal id='topSegment'>
      <Segment size={'small'} id='selectionBox'>
        <DropdownSegment
          refetch={clientsRefetch}
          items={clients}
          deleteItem={curriedDeleteClient(setActiveClientId, deleteClient, userId)}
          itemName={'client'}
          setActiveItem={handleSetClientId}
          deleteDisabled={!Boolean(activeClientId)}
          addDisabled={false} />
        <DropdownSegment
          refetch={handleTaskRefetch}
          items={tasks}
          deleteItem={curriedDeleteTask(setActiveTaskId, deleteTask, userId)}
          itemName={'task'}
          setActiveItem={handleSetTaskId}
          activeClientId={activeClientId}
          addDisabled={!Boolean(activeClientId)}
          deleteDisabled={!Boolean(activeTaskId)} />
        <DropdownSegment
          refetch={handleTaskRefetch}
          items={subtasks}
          deleteItem={curriedDeleteSubtask(setActiveSubtaskId, deleteSubtask, userId)}
          itemName={'subtask'}
          setActiveItem={setActiveSubtaskId}
          activeTaskId={activeTaskId}
          addDisabled={!Boolean(activeTaskId)}
          deleteDisabled={!Boolean(activeSubtaskId)} />
      </Segment>
      <Segment>
        <TimerBox
          getTask={getTask}
          activeTask={activeTask}
        />
      </Segment>
    </Segment.Group>
  );
}

export default TopSegment;
