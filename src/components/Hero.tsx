import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bug, Globe, Users } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  const stats = [
    { icon: Users, value: "200+", label: "Active Testers" },
    { icon: Bug, value: "1,247+", label: "Bugs Obliterated" },
    { icon: Globe, value: "24/7", label: "Testing Network" },
  ];

  return (
    <div className="relative overflow-hidden py-20 md:py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary font-semibold tracking-widest uppercase mb-4"
          >
            🌍 AFRICA'S 24/7 HUMAN STRESS TEST FOR AI
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Your AI Works in Silicon Valley. Can It Survive <span className="text-primary">Kampala?</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            200+ engineering students across Uganda stress-test your AI on 2G networks, low-end phones, slang, and unpredictable workflows. They don't follow scripts—they experiment, improvise, and find the chaos your lab misses. If your AI survives here, it survives anywhere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8 text-sm"
          >
            <div className="inline-block bg-secondary text-secondary-foreground rounded-full px-4 py-2">
             ⚡ Next batch: 9 spots left | 🔴 Currently testing: 4 tools live
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/submit">
              <Button size="lg" className="neumo-cta-primary text-lg px-8">
                Submit Your AI →
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" className="neumo-cta-secondary text-lg px-8">
                See How It Works ↓
              </Button>
            </a>
          </motion.div>

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
