import React, { useContext } from 'react';
import LoginForm from './LoginForm';
import TopSegment from './topsegment/TopSegment';
import { AuthenticationContext }  from './providers/AuthenticationProvider';

function App() {
  const authenticationContext = useContext(AuthenticationContext);


  const loginView = () => {
    return (
      <LoginForm />
    );
  }

  if (!authenticationContext.authenticated) {
    return loginView();
  } else {
    return <TopSegment></TopSegment>
  }
}

export default App;
