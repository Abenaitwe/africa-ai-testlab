import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  const stats = [
    { icon: Users, value: "200+", label: "Active Testers" },
    { icon: Zap, value: "1,000+", label: "Bugs Squashed" },
    { icon: Sparkles, value: "24/7", label: "Student Network" },
  ];

  return (
    <div className="relative overflow-hidden py-20 md:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            <span className="heading-gradient">AI Meets Chaos.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto"
          >
            Pushing AI tools to their limits: creative tasks and real world use.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            If your AI survives here, it's ready for anywhere.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/submit">
              <Button size="lg" className="neumo-cta-primary text-lg px-8">
                Submit Your AI
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" className="neumo-cta-secondary text-lg px-8">
                Join the Squad
              </Button>
            </Link>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-muted-foreground text-lg mb-8 italic border-l-4 border-primary pl-4 max-w-3xl mx-auto"
          >
            "We test, we break, we learn. Rate That AI is Africa's open lab — where builders meet testers and projects evolve under real pressure."
          </motion.p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.1 + index * 0.15,
                  type: "spring",
                  stiffness: 200
                }}
                className="neumo-elevated p-6"
              >
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground uppercase tracking-wide text-sm font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};