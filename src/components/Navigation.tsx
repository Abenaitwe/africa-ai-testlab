import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full bg-canvas z-50 shadow-neumo-elevated">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-foreground">
          Rate<span className="text-primary">That</span><span className="text-accent">AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/explore" className="text-foreground hover:text-primary transition-colors">
            Explore
          </Link>
          <Link to="/testers" className="text-foreground hover:text-primary transition-colors">
            Testers
          </Link>
          <Link to="/leaderboard" className="text-foreground hover:text-primary transition-colors">
            Leaderboard
          </Link>
          <Link to="/submit">
            <Button className="neumo-cta-secondary" size="sm">Submit Project</Button>
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                <Avatar className="h-8 w-8 border-2 border-accent">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.username} />
                  <AvatarFallback>{profile?.username?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 neumo-elevated">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.username} />
                    <AvatarFallback>{profile?.username?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{profile?.full_name || profile?.username}</p>
                    <p className="text-xs text-muted-foreground">@{profile?.username}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/profile/${profile?.username}`)}>
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button className="neumo-cta-secondary" size="sm">Login</Button>
            </Link>
          )}
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
        <div className="md:hidden border-t border-border bg-canvas">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/explore" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/testers" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testers
            </Link>
            <Link 
              to="/leaderboard" 
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link to="/submit" onClick={() => setMobileMenuOpen(false)}>
              <Button className="neumo-cta-secondary w-full" size="sm">Submit Project</Button>
            </Link>
            {user ? (
              <>
                <Link to={`/profile/${profile?.username}`} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="neumo-cta-secondary w-full" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Button>
                </Link>
                <Button className="neumo-cta-secondary w-full" size="sm" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="neumo-cta-secondary w-full" size="sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
