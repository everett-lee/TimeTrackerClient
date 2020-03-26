/**
 *  Helper functions to place graphql delete function 
 *  into curried form
 */


 /**
  * The generic function which partially applies first 
  * the arguments and functions required for deletion, then the id of 
  * the deleted item together with an optional callback function
  * 
  * @param {Function} f the function to curry
  */
const curryDeleteItem = (f) => {
  return (setActive, deleteItem, ownerId) => {
    return (id, callback) => {
      return f(setActive, deleteItem, ownerId, id, callback);
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
    // Set active clientId to null
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
    // Set active taskId to null
    setActive(null);
  }
}

const callDeleteSubtask = (setActive, deleteItem, ownerId, id, handleTaskRefetch) => {
  if (id) {
    deleteItem({
      variables:
      {
        'ownerId': ownerId,
        'subtaskId': id
      }
    // Refetch the task when subtask is deleted to get recalculated 
    // total time
    }).then( () =>  {
      handleTaskRefetch();
    });
    // Set active subtaskId to null
    setActive(null);
  }
}

export { curryDeleteItem, callDeleteClient, callDeleteTask, callDeleteSubtask };