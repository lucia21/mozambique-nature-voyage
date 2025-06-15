
import { useState } from "react";
import { Menu, X, Users, Heart } from "lucide-react";
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
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Nossa Voz Moçambique</h1>
              <p className="text-xs text-muted-foreground">Community Stories Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#stories" className="text-sm font-medium hover:text-primary transition-colors">
              Community Stories
            </a>
            <a href="#communities" className="text-sm font-medium hover:text-primary transition-colors">
              Our Communities
            </a>
            <a href="#share" className="text-sm font-medium hover:text-primary transition-colors">
              Share Your Story
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
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
                href="#stories" 
                className="p-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Community Stories
                </div>
              </a>
              <a 
                href="#communities" 
                className="p-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Communities
              </a>
              <a 
                href="#share" 
                className="p-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Share Your Story
              </a>
              <a 
                href="#about" 
                className="p-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
