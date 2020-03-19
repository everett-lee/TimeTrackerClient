/**
 *  Helper function to export graphql delete wrapper functions
 */
const curryDeleteClient = (f) => {
  return (setActive, deleteItem, ownerId) => {
    return (id) => {
      return f(setActive, deleteItem, ownerId, id);
    }
  }
}

const callDeleteClient = (setActive, deleteItem, ownerId, id) => {
  if (id) {
    deleteItem({
      variables: {
        'ownerId': ownerId,
        'clientId': id
      }
    });
    setActive(null);
  } 
}

const callDeleteTask = (setActive, deleteItem, ownerId, id) => {
  if (id) {
    deleteItem({
      variables:
      {
        'ownerId': ownerId,
        'taskId': id
      }
    });
    setActive(null);
  }
}

const callDeleteSubtask = (setActive, deleteItem, ownerId, id) => {
  if (id) {
    deleteItem({
      variables:
      {
        'ownerId': ownerId,
        'subtaskId': id
      }
    });
    setActive(null);
  }
}

export { curryDeleteClient, callDeleteClient, callDeleteTask, callDeleteSubtask };