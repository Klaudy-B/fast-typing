import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import './style.sass';

import NotFound from './pages/NotFound';
const Home = lazy(()=>import('./pages/Home'));
const Levels = lazy(()=>import('./pages/Levels'));
const LoginUsername = lazy(()=>import('./pages/LoginUsername'));
const LoginPassword = lazy(()=>import('./pages/LoginPassword'));
const Signup = lazy(()=>import('./pages/Signup'));
const MyRecords = lazy(()=>import('./pages/MyRecords'));
const Settings = lazy(()=>import('./pages/Settings'));

import AbsoluteLoading from './components/AbsoluteLoading';
import Protected from './components/Protected';
import NavbarAndLayout from './components/NavbarAndLayout';
const Play = lazy(()=>import('./components/GameComponents/playComponents/Play'));
const Username = lazy(()=>import('./components/Username'));
const Logout = lazy(()=>import('./components/Logout'));
const Password = lazy(()=>import('./components/password'));
const Email = lazy(()=>import('./components/Email'));
const VerifyEmail = lazy(()=>import('./components/VerifyEmail'));
const ForgotPassword = lazy(()=>import('./components/ForgotPassword'));
const RecoverPassword = lazy(()=>import('./components/RecoverPassword'));
const ForgotUsername = lazy(()=>import('./components/ForgotUsername'));
const DeleteAccount = lazy(()=>import('./components/DeleteAccount'));
const Oops = lazy(()=>import('./components/Oops'));

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

import { checkLoginStateLoader, forgotPasswordLoader } from './loaders';
import { base } from './scripts/helpers';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={base} element={<NavbarAndLayout />} loader={checkLoginStateLoader} errorElement={<Oops />}>
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
        <Route path='verify-email' element={<VerifyEmail />} loader={forgotPasswordLoader} action={verifyEmailAction} />
        <Route path='change-email' element={<Email />} action={EmailAction} />
        <Route path='forgot-password' element={<ForgotPassword />} loader={forgotPasswordLoader} action={forgotPasswordAction} />
        <Route path='recover-password' element={<RecoverPassword />} action={recoverPasswordAction} />
        <Route path='delete-account' element={<DeleteAccount />} action={deleteAccountAction} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<AbsoluteLoading />}>
      <RouterProvider router={ router } />
    </Suspense>
  </React.StrictMode>,
)