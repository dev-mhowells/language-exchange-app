import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorPage from './error-page';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthContextProvider } from './context/AuthContext';
import "./App.css"
import Profile from './routes/profile';
import Register from './routes/Register';
import Login from './routes/Login';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <ErrorPage />
},
{
  path:'profile',
  element: <Profile />,
},
{
  path:'register',
  element: <Register />
},
{
  path: 'login',
  element: <Login />
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
