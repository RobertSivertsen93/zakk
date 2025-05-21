
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";
import Extract from "./pages/extract/index";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  const { toast } = useToast()

  React.useEffect(() => {
    // Persist toast messages to localStorage
    const storedToasts = localStorage.getItem('toasts');
    if (storedToasts) {
      const parsedToasts = JSON.parse(storedToasts);
      parsedToasts.forEach((toastData: any) => {
        toast({
          title: toastData.title,
          description: toastData.description,
          duration: toastData.duration,
        });
      });
    }
  }, [toast]);

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
      element: <Upload />
    },
    {
      path: "/extract",
      element: <Extract />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ];

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Toaster />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
