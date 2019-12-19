import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { AuthenticationProvider } from './components/providers/AuthenticationProvider';

import { ApolloProvider } from '@apollo/react-hooks';

import 'semantic-ui-css/semantic.min.css';
import client from './Apollo';


ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthenticationProvider>
        <App />
    </AuthenticationProvider>
  </ApolloProvider>
    ,
    document.getElementById('root')
);

