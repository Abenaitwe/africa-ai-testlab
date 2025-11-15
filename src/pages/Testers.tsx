
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, HandCoins, Laptop, TestTube, Users } from "lucide-react";

// Hero Section for Testers Page
const TestersHero = () => (
  <div className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-background-off-white text-foreground">
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-primary font-semibold tracking-widest uppercase mb-4"
        >
          💰 THE SIDE HUSTLE FOR AI BUILDERS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Get Paid to Test AI Tools <span className="text-primary">You Already Use</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          You're experimenting with ChatGPT, Claude, and Midjourney anyway. Turn that into income. Companies pay us to stress-test their AI. We pay you to break it. Flexible hours. Real money. Actual skills.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <div className="inline-block bg-background rounded-full px-6 py-3 text-muted-foreground">
            ⏰ Flexible hours  |  🏆 Saturday competitions with cash prizes
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/login">
            <Button size="lg" className="neumo-cta-primary text-lg px-8">
              Join The Squad →
            </Button>
          </Link>
          <a href="#how-it-works-testers">
            <Button size="lg" className="neumo-cta-secondary text-lg px-8 text-white">
              See How It Works ↓
            </Button>
          </a>
        </motion.div>

        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-muted-foreground text-sm mt-8"
          >
            • From MUST, UCU, Makerere, Mbarara
        </motion.p>
      </div>
    </div>
  </div>
);

// How It Works Section for Testers Page
const HowItWorksTesters = () => {
    const steps = [
        {
            icon: Laptop,
            title: "Sign Up",
            description: "Join our testing community in 2 minutes. No experience required—just curiosity and a phone or laptop.",
        },
        {
            icon: TestTube,
            title: "Get Matched with Tests",
            description: "We send you AI tools to test based on your interests. Use them like you normally would. Find bugs. Give honest feedback.",
        },
        {
            icon: HandCoins,
            title: "Get Paid",
            description: "Complete the test, submit your feedback, get paid. Most tests pay out within 48 hours. The more you test, the more you earn.",
        },
    ];

    return (
        <section id="how-it-works-testers" className="py-20 bg-background-off-white text-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">
                    Three Steps to <span className="text-primary">Start Earning</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="neumo-elevated p-8"
                             initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <div className="inline-block p-4 bg-canvas rounded-full shadow-neumo-inset mb-4">
                                <step.icon className="w-10 h-10 text-accent" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
                 <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <Link to="/login">
                      <Button size="lg" className="neumo-cta-primary text-lg px-8">
                        Start Testing Today →
                      </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

const WhatYouDo = () => {
    const activities = [
        { title: "🎲 Break Things Creatively", description: "Try weird prompts, test on slow networks, use broken English, see what breaks. Companies WANT you to find the edge cases." },
        { title: "💬 Share Honest Reactions", description: "Document what frustrates you, confuses you, or impresses you. Your real human perspective is valuable." },
        { title: "🏆 Compete for Bonuses", description: "Join our Saturday Vibe Coding Wars. Build prototypes, race to find bugs, win cash prizes. Top testers earn extra." },
        { title: "📚 Level Up Your Skills", description: "Learn prompt engineering, understand AI limitations, build a portfolio of tools you've tested. Skills that actually matter." },
    ];

    return (
        <section className="py-20 bg-canvas text-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">
                    What Does AI Testing <span className="text-primary">Actually Look Like?</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={index}
                            className="neumo-elevated p-6 text-left"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                            <p className="text-muted-foreground">{activity.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhyUs = () => {
    const features = [
        "Flexible Schedule",
        "Real Money, Fast Payouts",
        "Learn Actual Skills",
        "Community & Competition",
        "No Experience Required",
        "Build Your Portfolio",
    ];
    return (
        <section className="py-20 bg-background-off-white text-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-12">
                    What Makes <span className="text-primary">This Different?</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                         <motion.div
                            key={index}
                            className="flex items-center gap-4 p-4 neumo-elevated"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Check className="w-6 h-6 text-primary flex-shrink-0" />
                            <span className="font-semibold text-left">{feature}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Faq = () => {
    const faqs = [
        {
            q: "Do I need experience in QA or testing?",
            a: "Nope! We specifically want people who use AI tools naturally, not professional testers. If you've used ChatGPT or Claude, you're qualified.",
        },
        {
            q: "How much time do I need to commit?",
            a: "Totally flexible. Some people test for 30 minutes a day, others go deep on weekends. You choose what fits your schedule.",
        },
        {
            q: "When do I get paid?",
            a: "Most tests pay out within 48 hours of completion. We use mobile money or bank transfer.",
        },
        {
            q: "What tools do I need?",
            a: "Just a phone or laptop and internet connection. Most tests work fine on budget devices—that's actually part of what we're testing!",
        },
        {
            q: "What if I find a bug that seems serious?",
            a: "Perfect! That's exactly what companies are paying for. We have a system to flag critical bugs immediately.",
        },
        {
            q: "Can I do this from anywhere in Uganda?",
            a: "Yes! We have testers from Kampala, Mbarara, Gulu, Mbale, and everywhere in between. Slow networks are actually valuable for testing.",
        },
        {
            q: "How do the Saturday competitions work?",
            a: "Every Saturday, we host live coding/testing competitions with cash prizes. Optional but fun and lucrative."
        },
        {
            q: "Is this legitimate? How do I know I'll get paid?",
            a: "We've paid out over $36,000 to 200+ testers. Join our WhatsApp group and ask current testers yourself."
        }
    ];

    return (
        <section className="py-20 bg-canvas text-foreground">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Got <span className="text-primary">Questions?</span>
                </h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index} className="neumo-elevated mb-4 px-6 rounded-lg">
                            <AccordionTrigger className="text-lg font-semibold text-left">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pt-2">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="text-center mt-12">
                     <Button size="lg" className="neumo-cta-secondary text-lg px-8">
                        More Questions? Ask The Community →
                      </Button>
                </div>
            </div>
        </section>
    )
}

const TestersCTA = () => (
    <section className="py-20 bg-background-off-white text-foreground">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Ready to Turn Your AI Curiosity <span className="text-primary">Into Cash?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto"
        >
          Join 200+ developers who are earning money testing tools they'd use anyway. Sign up takes 2 minutes. First test comes within 48 hours.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/login">
            <Button size="lg" className="neumo-cta-primary text-lg px-8">
              Join The Squad - Start Earning →
            </Button>
          </Link>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="#" className="text-primary hover:underline">Join WhatsApp Community First</Link>
            <Link to="/explore" className="text-primary hover:underline">See Current Test Opportunities</Link>
          </div>
        </motion.div>
      </div>
    </section>
);


const TestersPage = () => {
  return (
    <>
      <Navigation />
      <TestersHero />
      <HowItWorksTesters />
      <WhatYouDo />
      <WhyUs />
      <Faq />
      <TestersCTA />
      <Footer />
    </>
  );
};

export default TestersPage;
