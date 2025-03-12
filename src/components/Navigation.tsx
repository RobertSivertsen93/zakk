
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Edit3, Download, LogOut } from "lucide-react";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
  activeWhen: string[];
};

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
  
  const navItems: NavItem[] = [
    {
      label: 'Upload',
      icon: <Upload className="w-5 h-5" />,
      path: '/upload',
      activeWhen: ['/upload'],
    },
    {
      label: 'Extract',
      icon: <Edit3 className="w-5 h-5" />,
      path: '/extract',
      activeWhen: ['/extract'],
    },
    {
      label: 'Export',
      icon: <Download className="w-5 h-5" />,
      path: '/export',
      activeWhen: ['/export'],
    },
  ];
  
  const handleLogout = () => {
    localStorage.removeItem('pdf-extractor-auth');
    navigate('/login');
  };
  
  const getActiveStyles = (item: NavItem) => {
    return item.activeWhen.includes(location.pathname) 
      ? 'bg-primary text-primary-foreground' 
      : 'bg-transparent hover:bg-secondary transition-colors';
  };
  
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-medium text-lg">PDF Extractor</span>
        </div>
        
        <nav className="mx-auto hidden md:flex">
          <ul className="flex items-center gap-1 rounded-full bg-secondary/50 backdrop-blur-sm p-1 border border-border">
            {navItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className={cn(
                    "rounded-full gap-2 text-sm font-medium", 
                    getActiveStyles(item)
                  )}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        
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
      
      {/* Mobile navigation */}
      <div className="md:hidden border-t border-border">
        <nav className="flex justify-around py-2">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "flex flex-col items-center gap-1 rounded-md h-auto py-2", 
                getActiveStyles(item)
              )}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
