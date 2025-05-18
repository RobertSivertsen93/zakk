
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full transition-all duration-300 hover:bg-secondary/80" 
          title="Change language"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="shadow-lg border border-gray-100 animate-scale-in"
      >
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={`transition-colors ${language === 'en' ? 'bg-accent font-medium' : 'hover:bg-secondary/50'}`}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('fo')}
          className={`transition-colors ${language === 'fo' ? 'bg-accent font-medium' : 'hover:bg-secondary/50'}`}
        >
          Føroyskt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
