import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Star } from "lucide-react";

const Index = () => {
  // Mock featured projects
  const featuredProjects = [
    {
      id: "1",
      title: "EduTrack Mobile",
      description: "Student management app for rural schools",
      tool: "Lovable",
      rating: 4.5,
      upvotes: 45,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      title: "AgriConnect",
      description: "Connecting farmers to markets",
      tool: "Mocha Orchids",
      rating: 4.8,
      upvotes: 72,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    },
    {
      id: "3",
      title: "HealthHub",
      description: "Telemedicine platform for remote areas",
      tool: "Builder.ai",
      rating: 4.3,
      upvotes: 38,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    },
  ];

  // Mock AI tool partners
  const partners = [
    { name: "Lovable", logo: "https://lovable.dev/logo.png" },
    { name: "Mocha Orchids", logo: "" },
    { name: "Builder.ai", logo: "" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-16">
        <Hero />
        <HowItWorks />

        {/* Partners Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-4">Our AI Builder Partners</h2>
            <p className="text-center text-muted-foreground mb-8">
              Leading AI tools trusted by African innovators
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {partners.map((partner) => (
                <div key={partner.name} className="text-center">
                  <div className="w-32 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm border border-border">
                    <span className="font-semibold text-foreground">{partner.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="mb-2">Featured Projects</h2>
                <p className="text-muted-foreground">
                  Top-rated applications built by our community
                </p>
              </div>
              <Link to="/explore">
                <Button variant="outline">
                  View All
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Link key={project.id} to={`/project/${project.id}`}>
                  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <Badge variant="secondary" className="ml-2">{project.tool}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <span className="font-semibold">{project.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ▲ {project.upvotes} upvotes
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-white mb-4">Ready to Test Your AI?</h2>
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of students testing, building, and learning with AI tools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/submit">
                <Button variant="secondary" size="lg" className="text-lg px-8">
                  Submit Your Tool
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="text-lg px-8 bg-white/20 hover:bg-white/30 text-white border-2 border-white"
                >
                  Start Testing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
