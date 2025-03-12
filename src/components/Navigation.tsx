
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, LogOut } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Check login status on mount and path change
  React.useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('pdf-extractor-auth');
      setIsLoggedIn(!!token);
      
      // Redirect to login if not logged in and not on login page
      if (!token && location.pathname !== '/login' && location.pathname !== '/') {
        navigate('/login');
      }
    };
    
    checkLoginStatus();
  }, [location.pathname, navigate]);
  
  // If user is on login page, don't show navigation
  if (location.pathname === '/login' || location.pathname === '/') {
    return null;
  }
  
  const handleLogout = () => {
    localStorage.removeItem('pdf-extractor-auth');
    navigate('/login');
  };
  
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-medium text-lg">PDF Extractor</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
