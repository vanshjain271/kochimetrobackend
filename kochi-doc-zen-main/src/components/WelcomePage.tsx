import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Train, 
  FileText, 
  Brain, 
  Zap, 
  Shield, 
  TrendingUp,
  Sparkles,
  ChevronDown
} from "lucide-react";

interface WelcomePageProps {
  onEnter: () => void;
}

const WelcomePage = ({ onEnter }: WelcomePageProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(1);
      setTimeout(() => setCurrentStep(2), 800);
      setTimeout(() => setCurrentStep(3), 1600);
      setTimeout(() => setShowFeatures(true), 2400);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced document analysis with 97.8% accuracy",
      color: "text-vibrant-purple",
      gradient: "from-vibrant-purple to-vibrant-blue"
    },
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Process thousands of documents in seconds",
      color: "text-vibrant-orange",
      gradient: "from-vibrant-orange to-red-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption",
      color: "text-vibrant-green",
      gradient: "from-vibrant-green to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Live insights and performance monitoring",
      color: "text-vibrant-blue",
      gradient: "from-vibrant-blue to-primary"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-elevated to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary/20 to-vibrant-purple/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-r from-vibrant-orange/15 to-vibrant-pink/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-vibrant-blue/20 to-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Logo and Title Section */}
        <div className="text-center space-y-6 mb-12">
          {/* Animated Logo */}
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-primary to-vibrant-blue shadow-2xl transition-all duration-1000 ${currentStep >= 1 ? 'animate-glow scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <Train className="w-12 h-12 text-white animate-bounce-in" />
          </div>

          {/* Main Title */}
          <div className={`transition-all duration-800 ${currentStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-vibrant-purple to-vibrant-blue bg-clip-text text-transparent animate-rainbow bg-size-200">
                Kochi Metro
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
              Document Intelligence System
            </h2>
            <div className="flex justify-center">
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-lg bg-gradient-to-r from-primary/10 to-vibrant-purple/10 border-primary/30 animate-pulse"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered • Real-time • Secure
              </Badge>
            </div>
          </div>

          {/* Subtitle */}
          <div className={`transition-all duration-800 delay-300 ${currentStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your document workflow with cutting-edge AI technology. 
              Process, analyze, and manage thousands of documents with unprecedented speed and accuracy.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-7xl transition-all duration-1000 ${showFeatures ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 bg-card/50 backdrop-blur-lg rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 group-hover:animate-bounce-in`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center space-y-6 transition-all duration-1000 delay-500 ${showFeatures ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <Button
            onClick={onEnter}
            size="lg"
            className="group relative px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-vibrant-blue hover:from-primary-light hover:to-vibrant-purple shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 animate-glow"
          >
            <span className="relative z-10 flex items-center gap-3">
              Enter Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-vibrant-purple/50 to-vibrant-pink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
          </Button>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span>Managing 12,847+ documents with 97.8% AI accuracy</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>

      {/* Enhanced Particle Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary to-vibrant-blue rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;