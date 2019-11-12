import React, { useState, useContext } from 'react';
import LoginForm from './components/LoginForm'
import { AuthenticationContext }  from './components/providers/AuthenticationProvider';

function App() {
  const authentcationContext = useContext(AuthenticationContext);


  const loginView = () => {
    return (
      <LoginForm />
    );
  }

  if (!authentcationContext.authenticated) {
    return loginView();
  } else {
    return <div>hi</div>
  }
}

export default App;
