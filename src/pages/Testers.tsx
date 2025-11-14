import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Testers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [testers, setTesters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTesters();
  }, [searchQuery]);

  const loadTesters = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('profiles')
        .select(`
          *,
          projects (count),
          reviews (count)
        `)
        .eq('user_type', 'tester')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`username.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%,university.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setTesters(data || []);
    } catch (error) {
      console.error('Error loading testers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-off-white">
      <div className="relative z-10">
        <Navigation />
        
        <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 inline-block bg-card/95 backdrop-blur-sm border-4 border-accent shadow-thick p-8">
            <h1 className="mb-2">Tester Community</h1>
            <p className="text-muted-foreground text-lg">
              Meet the testers pushing AI tools to their limits
            </p>
          </div>

          {/* Search */}
          <div className="mb-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, university, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Testers Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">Loading testers...</p>
            </div>
          ) : testers.length === 0 ? (
            <Card className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <p className="text-xl text-muted-foreground mb-4">No testers found</p>
                <p className="text-muted-foreground">Be the first to join our community!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testers.map((tester) => {
                const projectsCount = Array.isArray(tester.projects) ? tester.projects.length : (tester.projects?.[0]?.count || 0);
                const reviewsCount = Array.isArray(tester.reviews) ? tester.reviews.length : (tester.reviews?.[0]?.count || 0);

                return (
                  <Link key={tester.id} to={`/profile/${tester.username}`}>
                    <Card className="hover:shadow-thick-hover transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full border-4 border-accent shadow-thick">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="w-16 h-16 border-2 border-accent">
                            <AvatarImage src={tester.avatar_url} alt={tester.full_name} />
                            <AvatarFallback>
                              {tester.full_name?.split(' ').map((n: string) => n[0]).join('') || tester.username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold truncate">{tester.full_name || tester.username}</h3>
                            <p className="text-sm text-muted-foreground truncate">@{tester.username}</p>
                          </div>
                        </div>

                        {tester.university && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="truncate">{tester.university}</span>
                          </div>
                        )}

                        {tester.bio && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {tester.bio}
                          </p>
                        )}

                        {tester.skills && tester.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tester.skills.slice(0, 3).map((skill: string) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                            {tester.skills.length > 3 && (
                              <Badge variant="outline">+{tester.skills.length - 3}</Badge>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm pt-4 border-t border-border">
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-primary" />
                            <span className="font-semibold">{projectsCount}</span>
                            <span className="text-muted-foreground">projects</span>
                          </div>
                          <div className="text-muted-foreground">
                            {reviewsCount} reviews
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Testers;
