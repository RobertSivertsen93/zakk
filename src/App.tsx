import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Login from "./pages/Login";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";
import Extract from "./pages/extract/index";
import { LanguageProvider } from "./contexts/LanguageContext";
import Loader from "./components/common/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {

  const routes = [
    {
      path: "/",
      element: <Navigate to="/login" replace />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/upload",
      element: <ProtectedRoute><Upload /></ProtectedRoute> 
    },
    {
      path: "/extract",
      element: <ProtectedRoute><Extract /></ProtectedRoute>
    },
    {
      path: "*",
      element: <NotFound />
    }
  ];

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
          <Loader />
          <Toaster richColors position="top-center" />
        </BrowserRouter>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
