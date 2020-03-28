import React, { useContext, useState } from 'react';

import { AuthenticationContext } from './providers/AuthenticationProvider';

import LoginForm from './LoginForm';
import TopSegment from './topsegment/TopSegment';
import BottomSegment from './bottomsegment/BottomSegment';

function App() {
  const { authenticated, user: { id: userId } } = useContext(AuthenticationContext);

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
          userId={userId}
        />
        <BottomSegment
        />
      </div>
    );
  }
}

export default App;
