import { motion } from "framer-motion";

export const HowWeTest = () => {
  return (
    <section className="py-20 bg-background-off-white text-foreground">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Around-The-Clock Testing, <span className="text-primary">Real-World Conditions</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {/* Monday-Friday Card */}
          <motion.div
            className="flex-1 neumo-elevated p-8 text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4">Monday–Friday: Distributed Async Testing</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Your AI evaluated in real-world conditions across multiple environments</li>
              <li>Students test during classes, lunch breaks, late nights</li>
              <li>Continuous feedback flowing in from 200+ active testers</li>
            </ul>
          </motion.div>

          {/* Saturday Card */}
          <motion.div
            className="flex-1 neumo-elevated p-8 text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Saturday: Vibe Coding Wars 🔥</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Live competitions with cash prizes</li>
              <li>Students build prototypes, find bugs, generate viral content</li>
              <li>Highest engagement day of the week</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <p className="text-lg">
            <strong>Pricing:</strong> Custom - <a href="mailto:admin@ratethatai.dev" className="text-primary underline">Contact us</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
