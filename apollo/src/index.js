import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://proud-peacock-42.hasura.app/v1/graphql',
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