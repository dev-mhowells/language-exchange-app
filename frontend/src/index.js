import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorPage from './error-page';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import User from './routes/user';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <ErrorPage />
},
{
  path:'user',
  element: <User />,
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
