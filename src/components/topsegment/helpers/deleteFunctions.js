/**
 *  Helper function to export graphql delete wrapper functions
 */

const curryDeleteClient = (f) => {
  return (setActive, refetch, deleteItem, ownerId) => {
    return (id) => {
      return f(setActive, refetch, deleteItem, ownerId, id);
    }
  } 
}

const callDeleteClient = (setActive, refetch, deleteItem, ownerId, id) => {
  if (id) {
    deleteItem({
      variables: {
        "ownerId": ownerId,
        "clientId": id
      }
    });
    setActive(null);
    refetch();
  }
}

const callDeleteTask = (setActive, refetch, deleteItem, ownerId, id) => {
  if (id) {
    deleteItem({
      variables:
      {
        "ownerId": ownerId,
        "taskId": id
      }
    });
    setActive(null);
    refetch();
  }
}

const callDeleteSubtask = (setActive, refetch, deleteItem, ownerId, id) => {
  console.log((setActive, refetch, deleteItem, ownerId, id))
  if (id) {
    deleteItem({
      variables:
      {
        "ownerId": ownerId,
        "subtaskId": id
      }
    });
    setActive(null);
    refetch();
  }
}



export { curryDeleteClient, callDeleteClient, callDeleteTask, callDeleteSubtask };