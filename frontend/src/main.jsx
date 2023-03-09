import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import './index.css';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Levels from './pages/Levels';
import LoginUsername from './pages/LoginUsername';
import LoginPassword from './pages/LoginPassword';
import Signup from './pages/Signup';
import MyRecords from './pages/MyRecords';

import Protected from './components/Protected';
import NavbarAndLayout from './components/NavbarAndLayout';
import Play from './components/GameComponents/playComponents/Play';
import Settings from './components/Settings';
import Username from './components/Username';
import Logout from './components/Logout';
import Password from './components/password';
import Email from './components/Email';
import VerifyEmail from './components/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';
import RecoverPassword from './components/RecoverPassword';
import ForgotUsername from './components/ForgotUsername';
import DeleteAccount from './components/DeleteAccount';
import Oops from './components/Oops';


import {
  deleteAccountAction,
  EmailAction,
  forgotPasswordAction,
  forgotUsernameAction,
  loginUsernameAction,
  loginPasswordAction,
  logoutAction,
  passwordAction,
  recoverPasswordAction,
  signupAction,
  usernameAction,
  verifyEmailAction
} from './actions';

import { checkLoginStateLoader } from './loaders';




const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<NavbarAndLayout />} loader={checkLoginStateLoader} errorElement={<Oops />}>
        <Route index element={<Home />} />
        <Route path='levels' element={<Levels />} />
        <Route path='my-records' element={<MyRecords />} />
        <Route path='login/username' element={<LoginUsername />} action={loginUsernameAction} />
        <Route path='login/password' element={<LoginPassword />} action={loginPasswordAction} />
        <Route path='signup' element={<Signup />} action={signupAction} />
        <Route path='play/:level' element={<Protected children={<Play />} />} />
        <Route path='forgot-username' element={<ForgotUsername />} action={forgotUsernameAction} />
        <Route path='settings' element={<Settings />} errorElement={<Oops />}>
          <Route path='username' element={<Username />} action={usernameAction} />
          <Route path='logout' element={<Logout />} action={logoutAction} />
          <Route path='password' element={<Password />} action={passwordAction} />
          <Route path='verify-email' element={<VerifyEmail />} action={verifyEmailAction} />
          <Route path='change-email' element={<Email />} action={EmailAction} />
          <Route path='forgot-password' element={<ForgotPassword />} action={forgotPasswordAction} />
          <Route path='recover-password' element={<RecoverPassword />} action={recoverPasswordAction} />
          <Route path='delete-account' element={<DeleteAccount />} action={deleteAccountAction} />
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