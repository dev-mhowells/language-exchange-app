import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorPage from './error-page';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthContextProvider } from './context/AuthContext';
import "./App.css"
import User from './routes/user';
import Register from './routes/Register';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <ErrorPage />
},
{
  path:'user',
  element: <User />,
},
{
  path:'register',
  element: <Register />
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
