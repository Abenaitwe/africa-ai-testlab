import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Users, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden py-20 md:py-32 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/retro-waves-bg.jpg)' }}>
      <div className="absolute inset-0 bg-accent/40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Where Your AI Meets Africa's Chaos.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
            From Mbarara to Kampala, students push AI tools to their limits — low-end phones, 2G networks, and real-world use.
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            If your AI survives here, it's ready for anywhere.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/submit">
              <Button variant="secondary" size="lg" className="text-lg px-8 shadow-xl">
                Submit Your AI
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-white/20 hover:bg-white/30 text-white border-2 border-white backdrop-blur-sm"
              >
                Join the Squad
              </Button>
            </Link>
          </div>

          <p className="text-white/90 text-lg mb-8 italic">
            "We test, we break, we learn. Rate That AI is Africa's open lab — where builders meet testers and projects evolve under real pressure."
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Users className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">200+</div>
              <div className="text-white/80">Active Testers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Zap className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">1,000+</div>
              <div className="text-white/80">Bugs Squashed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Sparkles className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-white/80">Student Network</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
