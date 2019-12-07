import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AuthenticationProvider } from './components/providers/AuthenticationProvider';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { gql } from "apollo-boost";
import 'semantic-ui-css/semantic.min.css';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:8080/'
});

const client = new ApolloClient({
  cache,
  link
});

// placeholder query
client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result))
  .catch(err => console.log("didn't work"));

ReactDOM.render(
    <AuthenticationProvider>
        <App />
    </AuthenticationProvider>
    ,
    document.getElementById('root')
);

