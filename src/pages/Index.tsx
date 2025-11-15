import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HowWeBreakThings } from "@/components/HowWeBreakThings";
import { RealityCheck } from "@/components/RealityCheck";
import { HowWeTest } from "@/components/HowWeTest";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const Index = () => {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div>
        <Hero />
        <RealityCheck />
        <HowWeBreakThings />
        <HowWeTest />

        {/* CTA Section */}
        <section ref={ctaRef} className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
              className="text-3xl md:text-4xl lg:text-5xl mb-4"
            >
              Give Your AI the Human Stress Test It <span className="text-primary">Deserves</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            >
              Professional QA misses what humans do naturally. Our students don't follow rules—they break them. Your AI survives here, it survives anywhere.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/submit">
                <Button size="lg" className="neumo-cta-primary text-lg px-8 w-full sm:w-auto">
                  Submit Your AI for Testing →
                </Button>
              </Link>
              <a href="mailto:admin@ratethatai.dev">
                <Button size="lg" className="neumo-cta-secondary text-lg px-8 w-full sm:w-auto">
                  Questions? Book a 15-min call →
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
