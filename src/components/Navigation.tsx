import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-foreground">
          Rate<span className="text-primary">That</span><span className="text-accent">AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/explore" className="text-foreground hover:text-primary transition-colors">
            Explore
          </Link>
          <Link to="/students" className="text-foreground hover:text-primary transition-colors">
            Students
          </Link>
          <Link to="/leaderboard" className="text-foreground hover:text-primary transition-colors">
            Leaderboard
          </Link>
          <Link to="/submit">
            <Button variant="hero" size="sm">Submit Project</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="sm">Login</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/explore" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/students" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Students
            </Link>
            <Link 
              to="/leaderboard" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link to="/submit" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="hero" size="sm" className="w-full">Submit Project</Button>
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">Login</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
