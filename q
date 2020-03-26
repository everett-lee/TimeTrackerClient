[1mdiff --git a/src/components/topsegment/TopSegment.js b/src/components/topsegment/TopSegment.js[m
[1mindex b26e22f..a8c1e53 100644[m
[1m--- a/src/components/topsegment/TopSegment.js[m
[1m+++ b/src/components/topsegment/TopSegment.js[m
[36m@@ -13,16 +13,28 @@[m [mimport Queries from '../../graphql/Queries';[m
 import Mutations from '../../graphql/Mutations';[m
 [m
 /** [m
[31m- * Top level component for fetching and processing data to supply[m
[31m- * to its children[m
[32m+[m[32m * Top level component for retrieving and processing data[m[41m [m
 **/[m
 function TopSegment() {[m
[31m-  const { user: { id: userId } } = useContext(AuthenticationContext);[m
[32m+[m[32m  const { user } = useContext(AuthenticationContext);[m
   const { parseError } = useContext(MessageContext);[m
 [m
   const { setTasks, activeTaskId, setActiveTaskId, activeSubtaskId, setActiveSubtaskId } = useContext(TaskContext);[m
[32m+[m[32m  const ownerId = user.id;[m
 [m
   const [activeClientId, setActiveClientId] = useState(null);[m
[32m+[m[32m  const [activeTask, setActiveTask] = useState(null);[m
[32m+[m
[32m+[m[32m  const [getTask] = useLazyQuery(Queries.GET_TASK, {[m
[32m+[m[32m      variables: {[m
[32m+[m[32m          'ownerId': ownerId,[m
[32m+[m[32m          'taskId': activeTaskId[m
[32m+[m[32m      },[m
[32m+[m[32m      fetchPolicy: 'cache-and-network',[m
[32m+[m[32m      onCompleted: data => {[m
[32m+[m[32m          setActiveTask(data.getTask)[m
[32m+[m[32m      }[m
[32m+[m[32m  });[m
 [m
   const [deleteClient] = useMutation(Mutations.DELETE_CLIENT,[m
     {[m
[36m@@ -30,17 +42,12 @@[m [mfunction TopSegment() {[m
         parseError(e);[m
       }[m
     });[m
[31m-[m
   const [deleteTask] = useMutation(Mutations.DELETE_TASK,[m
     {[m
[31m-      onCompleted: () => {[m
[31m-        setActiveTask(null)[m
[31m-      },[m
       onError: (e) => {[m
         parseError(e);[m
       }[m
     });[m
[31m-[m
   // Define mutation, which will refetch results on completion[m
   const [deleteSubtask] = useMutation(Mutations.DELETE_SUBTASK,[m
     {[m
[36m@@ -60,11 +67,12 @@[m [mfunction TopSegment() {[m
 [m
   // Retrieve data for all clients and tasks[m
   const { loading: clientsLoading, error: clientsError, data: clientsData, refetch: clientsRefetch } = useQuery(Queries.ALL_CLIENTS, {[m
[31m-    variables: { ownerId: userId },[m
[32m+[m[32m    variables: { ownerId },[m
   });[m
   const { loading: tasksLoading, error: tasksError, data: tasksData, refetch: tasksRefetch } = useQuery(Queries.ALL_TASKS, {[m
[31m-    variables: { ownerId: userId },[m
[32m+[m[32m    variables: { ownerId },[m
   });[m
[32m+[m
   if (clientsLoading || tasksLoading) return null;[m
   if (clientsError || tasksError) clientsError ? console.error(clientsError) : console.error(tasksError);[m
 [m
[36m@@ -76,14 +84,14 @@[m [mfunction TopSegment() {[m
   // subtasks associated with the currently selected task[m
   const subtasks = getMappedSubtasks(tasksData.getAllTasks, activeClientId, activeTaskId)[m
 [m
[31m-  const handleSetClientId = (id) => {[m
[32m+[m[32m  const callSetClientId = (id) => {[m
     setActiveClientId(id);[m
     setActiveTaskId(null);[m
     setTasks(null);[m
     setActiveSubtaskId(null);;[m
   }[m
 [m
[31m-  const handleSetTaskId = (id) => {[m
[32m+[m[32m  const callSetTaskId = (id) => {[m
     setActiveTaskId(id);[m
     setActiveSubtaskId(null);;[m
   }[m
[36m@@ -100,24 +108,24 @@[m [mfunction TopSegment() {[m
         <DropdownSegment[m
           refetch={clientsRefetch}[m
           items={clients}[m
[31m-          deleteItem={curriedDeleteClient(setActiveClientId, deleteClient, userId)}[m
[32m+[m[32m          deleteItem={curriedDeleteClient(setActiveClientId, deleteClient, ownerId)}[m
           itemName={'client'}[m
[31m-          setActiveItem={handleSetClientId}[m
[32m+[m[32m          setActiveItem={callSetClientId}[m
           deleteDisabled={!Boolean(activeClientId)}[m
           addDisabled={false} />[m
         <DropdownSegment[m
           refetch={handleTaskRefetch}[m
           items={tasks}[m
[31m-          deleteItem={curriedDeleteTask(setActiveTaskId, deleteTask, userId)}[m
[32m+[m[32m          deleteItem={curriedDeleteTask(setActiveTaskId, deleteTask, ownerId)}[m
           itemName={'task'}[m
[31m-          setActiveItem={handleSetTaskId}[m
[32m+[m[32m          setActiveItem={callSetTaskId}[m
           activeClientId={activeClientId}[m
           addDisabled={!Boolean(activeClientId)}[m
           deleteDisabled={!Boolean(activeTaskId)} />[m
         <DropdownSegment[m
           refetch={handleTaskRefetch}[m
           items={subtasks}[m
[31m-          deleteItem={curriedDeleteSubtask(setActiveSubtaskId, deleteSubtask, userId)}[m
[32m+[m[32m          deleteItem={curriedDeleteSubtask(setActiveSubtaskId, deleteSubtask, ownerId)}[m
           itemName={'subtask'}[m
           setActiveItem={setActiveSubtaskId}[m
           activeTaskId={activeTaskId}[m
[36m@@ -125,10 +133,10 @@[m [mfunction TopSegment() {[m
           deleteDisabled={!Boolean(activeSubtaskId)} />[m
       </Segment>[m
       <Segment>[m
[31m-        <TimerBox[m
[31m-          getTask={getTask}[m
[31m-          activeTask={activeTask}[m
[31m-        />[m
[32m+[m[32m      <TimerBox[m[41m [m
[32m+[m[32m        getTask={getTask}[m
[32m+[m[32m        activeTask={activeTask}[m
[32m+[m[32m      />[m
       </Segment>[m
     </Segment.Group>[m
   );[m
