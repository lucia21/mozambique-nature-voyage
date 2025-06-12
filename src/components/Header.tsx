
import { useState } from "react";
import { Menu, X, Sun, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Sun className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Discover Mozambique</h1>
              <p className="text-xs text-muted-foreground">Rural Tourism Guide</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#destinations" className="text-sm font-medium hover:text-primary transition-colors">
              Destinations
            </a>
            <a href="#experiences" className="text-sm font-medium hover:text-primary transition-colors">
              Experiences
            </a>
            <a href="#culture" className="text-sm font-medium hover:text-primary transition-colors">
              Culture
            </a>
            <a href="#plan" className="text-sm font-medium hover:text-primary transition-colors">
              Plan Your Trip
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col gap-2">
              <a 
                href="#destinations" 
                className="p-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Destinations
                </div>
              </a>
              <a 
                href="#experiences" 
                className="p-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Experiences
              </a>
              <a 
                href="#culture" 
                className="p-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Culture
              </a>
              <a 
                href="#plan" 
                className="p-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Plan Your Trip
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
