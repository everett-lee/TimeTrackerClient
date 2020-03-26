import React, { useContext, useState } from 'react';

import { AuthenticationContext } from './providers/AuthenticationProvider';
import { TaskContext } from './providers/TaskProvider';

import LoginForm from './LoginForm';
import TopSegment from './topsegment/TopSegment';
import BottomSegment from './bottomsegment/BottomSegment';

function App() {
  const { authenticated, user: { id: userId } } = useContext(AuthenticationContext);
  const { setTasks, activeTaskId, setActiveTaskId, activeTask,
    setActiveTask, activeSubtaskId, setActiveSubtaskId } = useContext(TaskContext);

  const loginView = () => {
    return (
      <LoginForm />
    );
  }

  if (!authenticated) {
    return loginView();
  } else {
    return (
      <div>
        <TopSegment
          activeTask={activeTask}
          setActiveTask={setActiveTask}
          activeTaskId={activeTaskId}
          setActiveTaskId={setActiveTaskId}
          setTasks={setTasks}
          activeSubtaskId={activeSubtaskId}
          setActiveSubtaskId={setActiveSubtaskId}
          userId={userId}
        />
        <BottomSegment
        />
      </div>
    );
  }
}

export default App;
