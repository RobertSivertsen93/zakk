import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonStanding, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { logoutUser } from '@/lib/apiFunctions';

const Navigation = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const handleLogout = () => {
    // Clear session data
    logoutUser();
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login');
  };
  
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <PersonStanding className="h-6 w-6 text-primary" />
          <span className="font-medium text-lg">Zacchaeus</span>
        </div>
        
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            title={t('logout')}
            className="rounded-full hover:bg-secondary/80 transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
