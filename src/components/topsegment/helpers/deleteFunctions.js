/**
 *  Helper function to export graphql delete wrapper functions
 */

const curry = (f) => {
  return (a, b) => {
    return (c) => {
      return (a, b, c);
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

const callDeleteSubtask = (id) => {
  // if (id) {
  //   deleteSubtask({
  //     variables:
  //     {
  //       "ownerId": ownerId,
  //       "subtaskId": id
  //     }
  //   });
  //   setActiveSubtaskId(null);
  //   tasksRefetch();
  // }
}



export { curry, callDeleteClient, callDeleteTask, callDeleteSubtask };