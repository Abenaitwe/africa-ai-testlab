import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const RealityCheck = () => {
  return (
    <section className="py-20 bg-background-off-white text-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold tracking-widest uppercase mb-2">REALITY CHECK</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your AI Works in Silicon Valley.<br />Can It Survive <span className="text-primary">Kampala?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We don't test in labs. We test in chaos—low bandwidth, low-end phones, slang, and unpredictable workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Problem Box */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="neumo-elevated p-8 border-l-4 border-destructive"
          >
            <h3 className="text-2xl font-bold mb-6 text-destructive">❌ Here's why traditional testing misses the real chaos:</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><strong>Checklists can't capture curiosity:</strong> QA experts follow scripts. Real humans don't.</li>
              <li><strong>Edge cases live in the wild:</strong> Students try things no professional would think of.</li>
              <li><strong>Low-end devices, local networks, slang:</strong> Typical labs never replicate these conditions.</li>
              <li><strong>Real human reactions matter:</strong> We capture frustration, confusion, and creative workarounds.</li>
            </ul>
          </motion.div>

          {/* Solution Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="neumo-elevated p-8 border-l-4 border-primary"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">✅ We give your AI real humans, not scripts.</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><strong>Inexperienced? Yes. That's the point.</strong> They break AI the way your actual users will.</li>
              <li><strong>Curiosity-driven testing:</strong> They experiment, improvise, and find unexpected bugs.</li>
              <li><strong>Real-world conditions:</strong> 2G networks, budget phones, multilingual chaos.</li>
              <li><strong>Fix what matters before launch:</strong> Your tool survives everywhere, not just the lab.</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
        >
          <Link to="/submit">
            <Button size="lg" className="neumo-cta-primary text-lg px-8">
              Submit for Testing →
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
