import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pageComponents/login/LoginPage';
import RegistrationPage from './pageComponents/registration/RegistrationPage';
import { routes } from './configs';
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRoute from './PrivateRoute';
import HomePage from './pageComponents/home/HomePage';

function App() {

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
        <Route
          path={routes.home.path}
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route path="**" element={<>Not found</>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
