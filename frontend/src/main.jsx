import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import './index.css';

import NotFound from './pages/NotFound';
import Oops from './pages/Oops';
import Home from './pages/Home';
import Levels from './pages/Levels';
import Login from './pages/Login';
import Signup from './pages/Signup';

import Protected from './components/Protected';
import NavbarAndLayout from './components/NavbarAndLayout';
import Play from './components/GameComponents/playComponents/Play';
import Settings from './components/Settings';
import Username from './components/Username';
import Logout from './components/Logout';
import Password from './components/password';

import { loginAction, logoutAction, passwordAction, signupAction, usernameAction } from './actions';

import { checkLoginStateLoader } from './loaders';




const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<NavbarAndLayout />} loader={checkLoginStateLoader} errorElement={<Oops />}>
        <Route index element={<Home />} />
        <Route path='levels' element={<Levels />} />
        <Route path='login' element={<Login />} action={loginAction} />
        <Route path='signup' element={<Signup />} action={signupAction} />
        <Route path='play/:level' element={<Protected children={<Play />} />} />
        <Route path='settings' element={<Settings />}>
          <Route path='username' element={<Username />} action={usernameAction} />
          <Route path='logout' element={<Logout />} action={logoutAction} />
          <Route path='password' element={<Password />} action={passwordAction} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)