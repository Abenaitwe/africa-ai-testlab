import { Send, TestTube, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      icon: Send,
      title: "Submit your AI tool",
      description: "Share your AI builder platform with our testing community",
      color: "from-primary to-secondary",
      shadow: "shadow-[8px_8px_0px_0px_rgba(251,191,36,0.5)]",
    },
    {
      icon: TestTube,
      title: "Let users test it and build with it",
      description: "Students across Africa test your tool under real-world conditions",
      color: "from-secondary to-accent",
      shadow: "shadow-[8px_8px_0px_0px_rgba(239,68,68,0.5)]",
    },
    {
      icon: BarChart3,
      title: "See honest results and feedback",
      description: "Get transparent reviews, ratings, and performance insights",
      color: "from-accent to-primary",
      shadow: "shadow-[8px_8px_0px_0px_rgba(26,26,26,0.5)]",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 relative inline-block">
            <span className="retro-text-shadow">How It Works</span>
            {/* Retro underline decoration */}
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary via-secondary to-primary transform -rotate-1"></div>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-muted-foreground text-lg mb-4 max-w-2xl mx-auto"
          >
            A simple, transparent process that connects AI builders with real testers
          </motion.p>
          
          {/* Groovy wave decoration */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"
          ></motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                rotate: index % 2 === 0 ? 2 : -2,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="text-center group relative"
            >
              {/* Retro Card Background */}
              <div className={`absolute inset-0 bg-card/80 backdrop-blur-sm border-4 border-accent rounded-none transform rotate-1 group-hover:rotate-0 transition-transform duration-300 ${step.shadow}`}></div>
              
              {/* Content */}
              <div className="relative p-8">
                {/* Groovy Number Badge */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-4 border-accent shadow-thick"
                >
                  <span className="text-3xl font-black text-white">{index + 1}</span>
                </motion.div>

                {/* Icon */}
                <div className="relative mb-6 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 15 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`relative inline-flex items-center justify-center w-24 h-24 border-4 border-accent bg-gradient-to-br ${step.color} ${step.shadow} transform -rotate-6 group-hover:rotate-0 transition-all duration-300`}
                  >
                    <step.icon className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="mb-4 text-xl uppercase tracking-wider">{step.title}</h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
