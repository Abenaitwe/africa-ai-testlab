import { Zap, MessageSquareQuote, TestTube2, Video } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowWeBreakThings = () => {
  const features = [
    {
      icon: Zap,
      title: "Chaos-Driven Usability Testing",
      description: "Students interact like normal humans, not QA robots. They ignore your docs, try weird workflows, and find the bugs you'd never imagine. Expect the unexpected.",
    },
    {
      icon: MessageSquareQuote,
      title: "Edge-Case Prompt Stress",
      description: "Multilingual slang, meme references, broken English, and absurd queries—all the weird stuff your AI will face in the wild. We don't sanitize input. We amplify chaos.",
    },
    {
      icon: TestTube2,
      title: "Raw Human Feedback Dataset",
      description: "Structured, labeled insights from real humans experimenting without bias. Every frustration, every workaround, every 'wait, what?' moment—documented and delivered.",
    },
    {
      icon: Video,
      title: "Viral Student Reactions",
      description: "Authentic videos showing exactly how your AI performs in real conditions. Watch real users struggle, succeed, and break things. Bonus: Use them as marketing content.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Four Ways We Stress-Test Your <span className="text-primary">AI</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="neumo-elevated p-6 text-center"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
            >
              <div className="inline-block p-4 bg-canvas rounded-full shadow-neumo-inset mb-4">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
