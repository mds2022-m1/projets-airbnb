import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useQuery, gql } from '@apollo/client';
import './App.css'

export default function App() {

  const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      user {
        id
        name
      }
    }
  }
`;

function DisplayTodos() {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  /*return data.locations.map(({ id, name, description, photo }) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));*/

  return data.todos.map(({ id, title, user }) => (
    <div key={id}>
      <h3>{title}</h3>
      <b>Assigned to:</b>
      <p>{user.name}</p>
      <br />
    </div>
  ));
}
  return (
    <div className="App">
      <h2>My first Apollo app 🚀</h2>
      <br/>
      <DisplayTodos />
    </div>
  )
}