import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pageComponents/login/LoginPage';
import RegistrationPage from './pageComponents/registration/RegistrationPage';
import { routes } from './configs';
import { Hydrate, QueryCache, QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";

function App() {
  const router = useLocation();

  const [queryClient] = useState(() => new QueryClient({
    queryCache: new QueryCache({}),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: "always",
        retry: () => false,
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={routes.login.path} element={<LoginPage />} />
        <Route path={routes.loginGuest.path} element={<LoginPage />} />
        <Route path={routes.registration.path} element={<RegistrationPage />} />
        <Route path={routes.registrationGuest.path} element={<RegistrationPage />} />

        <Route path="**" element={<>Not found</>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
