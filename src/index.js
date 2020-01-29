import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { AuthenticationProvider } from './components/providers/AuthenticationProvider';
import { TaskProvider } from './components/providers/TaskProvider';

import { ApolloProvider } from '@apollo/react-hooks';
import client from './Apollo';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <TaskProvider>
    <AuthenticationProvider>
        <App />
    </AuthenticationProvider>
    </TaskProvider>
  </ApolloProvider>
    ,
    document.getElementById('root')
);

