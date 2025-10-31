import { Send, TestTube, BarChart3 } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Send,
      title: "Submit your AI tool",
      description: "Share your AI builder platform with our testing community",
    },
    {
      icon: TestTube,
      title: "Let users test it and build with it",
      description: "Students across Africa test your tool under real-world conditions",
    },
    {
      icon: BarChart3,
      title: "See honest results and feedback",
      description: "Get transparent reviews, ratings, and performance insights",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-4">How It Works</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A simple, transparent process that connects AI builders with real testers
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-hero mb-6 group-hover:shadow-xl transition-shadow">
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-primary mb-4">{index + 1}</div>
              <h3 className="mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
