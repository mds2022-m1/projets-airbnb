import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React from 'react';

import * as ReactDOM from 'react-dom/client';

import App from './App';

const client = new ApolloClient({
    uri: 'https://proud-peacock-42.hasura.app/v1/graphql',
    cache: new InMemoryCache(),
  });

  client

  .query({

    query: gql`

      query GetLocations {

        locations {

          id

          name

          description

          photo

        }

      }

    `,

  })

  .then((result) => console.log(result));

  // Supported in React 18+

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

  <ApolloProvider client={client}>

    <App />

  </ApolloProvider>,

);