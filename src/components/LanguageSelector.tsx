
import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'pt' as Language, name: 'Português', flag: '🇵🇹' },
  { code: 'makhuwa' as Language, name: 'Makhuwa', flag: '🇲🇿' },
  { code: 'sena' as Language, name: 'Sena', flag: '🇲🇿' },
  { code: 'changana' as Language, name: 'Changana', flag: '🇲🇿' },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  
  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="lg"
          className="flex items-center gap-3 h-12 px-4 text-lg font-semibold hover:bg-primary/10"
        >
          <Languages className="h-6 w-6" />
          <span className="hidden sm:block">
            {currentLanguage?.flag} {currentLanguage?.name}
          </span>
          <span className="sm:hidden">
            {currentLanguage?.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-background border-2 shadow-lg"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`py-4 px-6 text-lg cursor-pointer ${
              language === lang.code 
                ? 'bg-primary/20 text-primary font-bold' 
                : 'hover:bg-primary/10'
            }`}
          >
            <span className="mr-3 text-xl">{lang.flag}</span>
            <span>{lang.name}</span>
            {language === lang.code && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
