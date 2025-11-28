import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Save up to 70% on fresh food",
  "Reduce food waste in your community",
  "Discover new local favorites",
  "Get notifications for nearby deals",
];

const CTASection = () => {
  return (
    <section id="partners" className="py-20 md:py-28 bg-secondary/50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-success-light rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral-light rounded-full blur-3xl opacity-40 -translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* For Consumers */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-medium">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              For Food Lovers
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Start saving food today
            </h2>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Download App
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Browse Online
              </Button>
            </div>
          </div>
          
          {/* For Businesses */}
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground shadow-elevated">
            <span className="inline-block text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider mb-4">
              For Businesses
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Turn waste into revenue
            </h2>
            <p className="text-primary-foreground/80 mb-6 text-lg">
              Join 5,000+ businesses already reducing waste and attracting new customers. 
              List your surplus food and let us handle the rest.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Recover costs on unsold inventory</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Attract new eco-conscious customers</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Boost your sustainability credentials</span>
              </li>
            </ul>
            <Button 
              variant="accent" 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group"
            >
              <Link to="/seller" className="flex items-center gap-2">
                Sell Your Food
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
