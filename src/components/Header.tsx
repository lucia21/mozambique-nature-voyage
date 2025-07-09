
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

const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Sessão terminada",
        description: "A sua sessão foi terminada com sucesso."
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao terminar sessão.",
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
        <nav className="hidden md:flex items-center space-x-8">
          {user ? (
            <>
              <Link 
                to="/feed" 
                className="text-lg font-semibold hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-primary/10"
              >
                Histórias
              </Link>
              <Link 
                to="/share" 
                className="text-lg font-semibold hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-primary/10"
              >
                Partilhar
              </Link>
              <Link 
                to="/communities" 
                className="text-lg font-semibold hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-primary/10"
              >
                Comunidades
              </Link>
              <Link 
                to="/map" 
                className="text-lg font-semibold hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-primary/10"
              >
                Mapa
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
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <div className="flex items-center justify-start gap-3 p-3">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-semibold text-lg">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-3 text-lg">
                    <User className="mr-3 h-5 w-5" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-3 text-lg">
                    <Settings className="mr-3 h-5 w-5" />
                    Definições
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="py-3 text-lg">
                    <LogOut className="mr-3 h-5 w-5" />
                    Terminar Sessão
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="text-lg py-3 px-6">
                <Link to="/auth/login">Entrar</Link>
              </Button>
              <Button asChild className="text-lg py-3 px-6">
                <Link to="/auth/register">Começar</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
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
                <Link to="/auth/login">Entrar</Link>
              </Button>
              <Button asChild className="text-base py-2 px-4">
                <Link to="/auth/register">Começar</Link>
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
              📚 Histórias
            </Link>
            <Link 
              to="/share" 
              className="block text-lg font-semibold hover:text-primary transition-colors py-3 px-4 rounded-xl hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✍️ Partilhar
            </Link>
            <Link 
              to="/communities" 
              className="block text-lg font-semibold hover:text-primary transition-colors py-3 px-4 rounded-xl hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏘️ Comunidades
            </Link>
            <Link 
              to="/map" 
              className="block text-lg font-semibold hover:text-primary transition-colors py-3 px-4 rounded-xl hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              🗺️ Mapa
            </Link>
            <div className="border-t-2 pt-2 mt-2">
              <button
                onClick={handleSignOut}
                className="block w-full text-left text-lg font-semibold hover:text-destructive transition-colors py-3 px-4 rounded-xl hover:bg-destructive/10"
              >
                🚪 Terminar Sessão
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
