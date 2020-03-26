import React, { useContext, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import { GraphQLContext } from '../providers/GraphQLProvider';
import Queries from '../../graphql/Queries';

import { getMappedClients, getMappedTasks, getMappedSubtasks } from './helpers/DataProcessors'
import { curryDeleteItem, callDeleteClient, callDeleteTask, callDeleteSubtask } from './helpers/DeleteFunctions';
import DropdownSegment from './DropdownSegment';
import TimerBox from './timercomponents/TimerBox';

/** 
 * Top level component for fetching and processing data to supply
 * to its children
**/
function TopSegment({ userId, setTasks, activeTaskId, setActiveTaskId, activeTask,
  setActiveTask, activeSubtaskId, setActiveSubtaskId }) {

  const { getTask, deleteClient, deleteTask, deleteSubtask } = useContext(GraphQLContext);

  const [activeClientId, setActiveClientId] = useState(null);

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
    getTask({
      variables:
      {
        'ownerId': userId,
        'taskId': activeTaskId
      },
      onCompleted: data => {
        setActiveTask(data.getTask)
      }
    })
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
          handleTaskRefetch={handleTaskRefetch}
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
