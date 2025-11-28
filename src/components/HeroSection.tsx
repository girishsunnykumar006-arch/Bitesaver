import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden gradient-hero">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-success-light text-primary px-4 py-2 rounded-full text-sm font-medium animate-slide-up">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
              Saving 10,000+ meals daily
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-slide-up stagger-1 text-balance">
              Rescue Delicious Food,{" "}
              <span className="text-primary">Save the Planet</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-slide-up stagger-2">
              Get amazing surprise bags from local bakeries and stores at up to 70% off. 
              Fresh food that would otherwise go to waste.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up stagger-3">
              <Link to="/browse">
                <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                  Find Food Near Me
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/seller">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Sell Your Food
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4 animate-slide-up stagger-4">
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl font-bold text-foreground">2.5M+</p>
                <p className="text-sm text-muted-foreground">Meals Saved</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl font-bold text-foreground">5,000+</p>
                <p className="text-sm text-muted-foreground">Partner Stores</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl font-bold text-foreground">500K+</p>
                <p className="text-sm text-muted-foreground">Happy Users</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-scale-in stagger-2">
            <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Fresh food including bread, vegetables, and fruits"
                className="w-full h-full object-cover"
              />
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-medium animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-coral-light flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">3 stores nearby</p>
                    <p className="text-sm text-muted-foreground">With surprise bags available now</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-success-light rounded-full blur-2xl opacity-60" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-coral-light rounded-full blur-3xl opacity-50" />
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 50L48 45.7C96 41.3 192 32.7 288 32.3C384 32 480 40 576 48.3C672 56.7 768 65.3 864 65.7C960 66 1056 58 1152 50C1248 42 1344 34 1392 30L1440 26V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
