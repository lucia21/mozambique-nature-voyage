
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: t('auth.session_ended'),
        description: t('auth.session_ended_desc')
      });
      navigate('/');
    } catch (error) {
      toast({
        title: t('auth.error'),
        description: t('auth.logout_error'),
        variant: "destructive"
      });
    }
  };

  return (
    <header className="border-b-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-primary">Nossa Voz</h1>
          <span className="text-lg text-muted-foreground hidden sm:block">Moçambique</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          
          {user ? (
            <>
              <Link 
                to="/feed" 
                className="text-lg font-semibold hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-primary/10"
              >
                📚 {t('nav.stories')}
              </Link>
              <Link 
                to="/share" 
                className="text-lg font-semibold hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-primary/10"
              >
                ✍️ {t('nav.share')}
              </Link>
              <Link 
                to="/communities" 
                className="text-lg font-semibold hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-primary/10"
              >
                🏘️ {t('nav.communities')}
              </Link>
              <Link 
                to="/map" 
                className="text-lg font-semibold hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-primary/10"
              >
                🗺️ {t('nav.map')}
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-full hover:bg-primary/10">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="" alt={user.email || ''} />
                      <AvatarFallback className="text-lg font-bold">
                        {user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-background border-2 shadow-lg" align="end" forceMount>
                  <div className="flex items-center justify-start gap-3 p-3">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-semibold text-lg">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-3 text-lg">
                    <User className="mr-3 h-5 w-5" />
                    {t('nav.profile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-3 text-lg">
                    <Settings className="mr-3 h-5 w-5" />
                    {t('nav.settings')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="py-3 text-lg">
                    <LogOut className="mr-3 h-5 w-5" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="text-lg py-3 px-6">
                <Link to="/auth/login">{t('nav.login')}</Link>
              </Button>
              <Button asChild className="text-lg py-3 px-6">
                <Link to="/auth/register">{t('nav.register')}</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSelector />
          {user ? (
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-12 w-12"
            >
              <Menu className="h-6 w-6" />
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild className="text-base py-2 px-4">
                <Link to="/auth/login">{t('nav.login')}</Link>
              </Button>
              <Button asChild className="text-base py-2 px-4">
                <Link to="/auth/register">{t('nav.register')}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && user && (
        <div className="md:hidden border-t-2 bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <Link 
              to="/feed" 
              className="block text-lg font-semibold hover:text-primary transition-colors py-3 px-4 rounded-xl hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              📚 {t('nav.stories')}
            </Link>
            <Link 
              to="/share" 
              className="block text-lg font-semibold hover:text-primary transition-colors py-3 px-4 rounded-xl hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✍️ {t('nav.share')}
            </Link>
            <Link 
              to="/communities" 
              className="block text-lg font-semibold hover:text-primary transition-colors py-3 px-4 rounded-xl hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏘️ {t('nav.communities')}
            </Link>
            <Link 
              to="/map" 
              className="block text-lg font-semibold hover:text-primary transition-colors py-3 px-4 rounded-xl hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              🗺️ {t('nav.map')}
            </Link>
            <div className="border-t-2 pt-2 mt-2">
              <button
                onClick={handleSignOut}
                className="block w-full text-left text-lg font-semibold hover:text-destructive transition-colors py-3 px-4 rounded-xl hover:bg-destructive/10"
              >
                🚪 {t('nav.logout')}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
