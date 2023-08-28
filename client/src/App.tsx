import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pageComponents/login/LoginPage';
import RegistrationPage from './pageComponents/registration/RegistrationPage';
import { routes } from './configs';

function App() {
  return (
    <Routes>
      <Route path={routes.login.path} element={<LoginPage />} />
      <Route path={routes.loginGuest.path} element={<LoginPage />} />
      <Route path={routes.registration.path} element={<RegistrationPage />} />
      <Route path={routes.registrationGuest.path} element={<RegistrationPage />} />

      <Route path="**" element={<>Not found</>} />
    </Routes>
  );
}

export default App;
