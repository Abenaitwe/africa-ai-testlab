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
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">How It <span className="text-primary">Works</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A simple, transparent process that connects AI builders with real testers
          </p>
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
              className="text-center neumo-elevated p-8"
            >
              <div className="relative mb-6 inline-block">
                <div className="neumo-inset rounded-full p-4">
                  <step.icon className="w-12 h-12 text-accent" strokeWidth={2} />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl neumo-elevated">
                  {index + 1}
                </div>
              </div>

              <h3 className="mb-4 text-xl">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
