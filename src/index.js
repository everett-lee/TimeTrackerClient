import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AuthenticationProvider } from './components/providers/AuthenticationProvider';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import 'semantic-ui-css/semantic.min.css';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:8080/'
});

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
    <AuthenticationProvider>
        <App />
    </AuthenticationProvider>
    ,
    document.getElementById('root')
);

