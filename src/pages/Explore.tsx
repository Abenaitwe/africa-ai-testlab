import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock projects data
  const projects = [
    {
      id: "1",
      title: "EduTrack Mobile",
      description: "Student management app for rural schools with offline capabilities",
      tool: "Lovable",
      category: "Education",
      rating: 4.5,
      upvotes: 45,
      views: 320,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      author: "Jane Kamau",
    },
    {
      id: "2",
      title: "AgriConnect",
      description: "Connecting farmers to markets with real-time pricing",
      tool: "Mocha Orchids",
      category: "Agriculture",
      rating: 4.8,
      upvotes: 72,
      views: 510,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      author: "David Ochieng",
    },
    {
      id: "3",
      title: "HealthHub",
      description: "Telemedicine platform for remote areas",
      tool: "Builder.ai",
      category: "Healthcare",
      rating: 4.3,
      upvotes: 38,
      views: 280,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      author: "Sarah Mwangi",
    },
    {
      id: "4",
      title: "BodaBoda Tracker",
      description: "Safety and tracking app for motorcycle taxis",
      tool: "Lovable",
      category: "Transportation",
      rating: 4.6,
      upvotes: 54,
      views: 412,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      author: "John Mutua",
    },
    {
      id: "5",
      title: "Waste Management Pro",
      description: "Smart waste collection and recycling platform",
      tool: "Mocha Orchids",
      category: "Environment",
      rating: 4.4,
      upvotes: 41,
      views: 295,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      author: "Grace Wanjiru",
    },
    {
      id: "6",
      title: "LocalMarket Connect",
      description: "E-commerce platform for local artisans",
      tool: "Builder.ai",
      category: "E-commerce",
      rating: 4.7,
      upvotes: 63,
      views: 478,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      author: "Michael Otieno",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
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
                <Button variant="secondary" className="w-full h-12">Apply Filters</Button>
              </div>
            </div>
          </Card>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project.id} to={`/project/${project.id}`}>
                <Card className="hover:shadow-thick-hover transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full border-4 border-accent shadow-thick overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover border-b-4 border-accent"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold flex-1">{project.title}</h3>
                      <Badge variant="secondary" className="ml-2 shrink-0">{project.tool}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                    <Badge variant="outline" className="mb-4">{project.category}</Badge>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <span className="font-semibold">{project.rating}</span>
                        </div>
                        <span className="text-muted-foreground">
                          ▲ {project.upvotes}
                        </span>
                      </div>
                      <span className="text-muted-foreground">{project.views} views</span>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground">by {project.author}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Explore;
