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
    <div className="relative overflow-hidden py-20 md:py-32 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: 'url(/retro-waves-bg.jpg)'
    }}>
      <div className="absolute inset-0 bg-accent/40" />
      
      {/* Groovy floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border-4 border-primary/30 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/20 rotate-45 animate-float-slower"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border-4 border-white/20 rotate-12 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 rounded-full bg-primary/10 animate-float-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="typing-animation inline-block">AI Meets Chaos.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto"
          >
            Pushing AI tools to their limits: creative tasks and real world use.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
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
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="secondary" size="lg" className="text-lg px-8 shadow-thick border-4 border-accent hover:shadow-thick-hover transition-all">
                  Submit Your AI
                </Button>
              </motion.div>
            </Link>
            <Link to="/login">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="text-lg px-8 bg-white/20 hover:bg-white/30 text-white border-4 border-white backdrop-blur-sm shadow-thick hover:shadow-thick-hover transition-all">
                  Join the Squad
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-white/90 text-lg mb-8 italic border-l-4 border-primary pl-4 max-w-3xl mx-auto"
          >
            "We test, we break, we learn. Rate That AI is Africa's open lab — where builders meet testers and projects evolve under real pressure."
          </motion.p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.1 + index * 0.15,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  y: -10,
                  rotate: index % 2 === 0 ? 3 : -3,
                  transition: { duration: 0.2 }
                }}
                className="bg-white/10 backdrop-blur-md border-4 border-white/30 p-6 transform hover:bg-white/20 transition-all group shadow-thick hover:shadow-thick-hover"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-8 h-8 text-white mx-auto mb-2" />
                </motion.div>
                <div className="text-3xl font-bold text-white mb-1 retro-text-shadow">{stat.value}</div>
                <div className="text-white/80 uppercase tracking-wide text-sm font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};