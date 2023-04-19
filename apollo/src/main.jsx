import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import './index.css'

const client = new ApolloClient({
  uri: 'https://proud-peacock-42.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret' : 'cGEuWcyv4ebEVZzfKdXmW0f0hxq8D7tqA8htsf5asZS6SuL82pu7PIsbqjYe6Asm'
  },
  cache: new InMemoryCache(),
});

client.query({
  query: gql`
      query MyQuery {
          users {
              id
              name
          }
      }
  `
}).then(result => console.log(result));

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
