import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const Index = () => {
  const partnersRef = useRef(null);
  const projectsRef = useRef(null);
  const ctaRef = useRef(null);
  
  const partnersInView = useInView(partnersRef, { once: true, amount: 0.3 });
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

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

  // AI tool partners
  const partners = [
    { name: "Base44" },
    { name: "Blink" },
    { name: "Bolt.new" },
    { name: "Cursor" },
    { name: "HeyBoss" },
    { name: "Lovable" },
    { name: "Mocha" },
    { name: "Orchids" },
    { name: "Rork" },
    { name: "v0" },
    { name: "Windsurf" },
    { name: "Wix" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div>
        <Hero />
        <HowItWorks />

        {/* Partners Section */}
        <section ref={partnersRef} className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-4"
            >
              Our AI Builder <span className="text-primary">Partners</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={partnersInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center text-muted-foreground mb-8"
            >
              Leading AI tools trusted by African innovators
            </motion.p>
            <div className="flex flex-wrap justify-center items-center gap-6 max-w-5xl mx-auto">
              {partners.map((partner, index) => (
                <motion.div 
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={partnersInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.3 + (index * 0.05),
                    type: "spring",
                    stiffness: 200
                  }}
                  className="text-center"
                >
                  <div className="px-4 py-3 neumo-elevated flex items-center justify-center">
                    <span className="font-semibold text-foreground text-sm">{partner.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section ref={projectsRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={projectsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mb-2">Featured <span className="text-primary">Projects</span></h2>
                <p className="text-muted-foreground">
                  Top-rated applications built by our community
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={projectsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Link to="/explore">
                  <Button className="neumo-cta-secondary">
                    View All
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={projectsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.2 + index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <Link to={`/project/${project.id}`}>
                    <Card className="neumo-elevated overflow-hidden group">
                      <div className="overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold">{project.title}</h3>
                          <Badge variant="secondary" className="neumo-elevated">{project.tool}</Badge>
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
              className="mb-4"
            >
              Ready to Test Your <span className="text-primary">AI?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto"
            >
              Join hundreds of students testing, building, and learning with AI tools
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/submit">
                <Button size="lg" className="neumo-cta-primary text-lg px-8">
                  Submit Your Tool
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" className="neumo-cta-secondary text-lg px-8">
                  Start Testing
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
