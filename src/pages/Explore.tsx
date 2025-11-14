import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UpvoteButton } from "@/components/UpvoteButton";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, [selectedTool, selectedCategory, searchQuery]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('projects')
        .select(`
          *,
          profiles (username, full_name, avatar_url),
          project_images (image_url, display_order)
        `)
        .order('created_at', { ascending: false });

      if (selectedTool !== 'all') {
        query = query.eq('ai_tool', selectedTool);
      }

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
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
            <h1 className="mb-2">Explore Projects</h1>
            <p className="text-muted-foreground text-lg">
              Discover AI-built applications tested by our community
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8 border-4 border-accent shadow-thick bg-card p-6">
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Filter Projects</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg border-3 border-accent"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-bold uppercase tracking-wide mb-2 block">AI Tool</label>
                <Select value={selectedTool} onValueChange={setSelectedTool}>
                  <SelectTrigger className="h-12 border-3 border-accent">
                    <SelectValue placeholder="Filter by tool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tools</SelectItem>
                    <SelectItem value="lovable">Lovable</SelectItem>
                    <SelectItem value="mocha">Mocha Orchids</SelectItem>
                    <SelectItem value="builder">Builder.ai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-bold uppercase tracking-wide mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-12 border-3 border-accent">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="transport">Transportation</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="secondary" className="w-full h-12" onClick={loadProjects}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </Card>

          {/* Projects Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <Card className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <p className="text-xl text-muted-foreground mb-4">No projects found</p>
                <Link to="/submit">
                  <Button>Submit the first project!</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const firstImage = project.project_images?.find((img: any) => img.display_order === 0) 
                  || project.project_images?.[0];
                
                return (
                  <Link key={project.id} to={`/project/${project.id}`}>
                    <Card className="hover:shadow-thick-hover transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full border-4 border-accent shadow-thick overflow-hidden">
                      {firstImage && (
                        <img
                          src={firstImage.image_url}
                          alt={project.title}
                          className="w-full h-48 object-cover border-b-4 border-accent"
                        />
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold flex-1">{project.title}</h3>
                          <Badge variant="secondary" className="ml-2 shrink-0 capitalize">
                            {project.ai_tool}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                        <Badge variant="outline" className="mb-4 capitalize">{project.category}</Badge>
                        
                        <div className="flex items-center justify-between text-sm mb-3">
                          <UpvoteButton 
                            projectId={project.id} 
                            initialUpvotes={project.upvotes || 0}
                            size="sm"
                          />
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Eye className="w-4 h-4" />
                            <span>{project.views || 0}</span>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t border-border">
                          <p className="text-sm text-muted-foreground">
                            by {project.profiles?.full_name || project.profiles?.username}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Explore;
