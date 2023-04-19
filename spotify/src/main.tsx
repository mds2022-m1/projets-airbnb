import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Search from './routes/Search';
import Playlist from './routes/Playlist';
import Album from './component/Album';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/search",
    element: <Search/>,
  },
  {
    path: "/search/:id",
    element: <Album/>,
  },
  {
    path: "/playlist",
    element: <Playlist/>,
    children: [
      {
        path: "playlist/:id",
        element: <Playlist/>,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
