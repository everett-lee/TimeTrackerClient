import React, { useContext } from 'react';
import LoginForm from './LoginForm';
import TopSegment from './topsegment/TopSegment';
import { AuthenticationContext }  from './providers/AuthenticationProvider';

function App() {
  const authentcationContext = useContext(AuthenticationContext);


  const loginView = () => {
    return (
      <LoginForm />
    );
  }

  if (!authentcationContext.authenticated && 1 === 2) {
    return loginView();
  } else {
    return <TopSegment></TopSegment>
  }
}

export default App;
