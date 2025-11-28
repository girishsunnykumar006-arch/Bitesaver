import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, BarChart3, Zap } from "lucide-react";

const Businesses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] pt-32 overflow-hidden gradient-hero">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Turn Food Waste Into <span className="text-primary">Revenue</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Join thousands of food businesses reducing waste while generating extra income. 
              It's easy, sustainable, and profitable.
            </p>
            <Button variant="hero" size="xl" className="group">
              <Link to="/seller" className="flex items-center gap-2">
                Start Your Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Why Partner With BiteSaver?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Increase Revenue",
                description: "Turn surplus food into additional profit with minimal effort"
              },
              {
                icon: Users,
                title: "Reach New Customers",
                description: "Connect with thousands of eco-conscious consumers in your area"
              },
              {
                icon: BarChart3,
                title: "Track Impact",
                description: "See exactly how much waste you're preventing with real metrics"
              },
              {
                icon: Zap,
                title: "Easy Integration",
                description: "Simple setup and management tools to streamline operations"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 border border-border text-center hover:border-primary/50 transition-colors">
                <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            How It Works
          </h2>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Create your business account in minutes with basic information"
              },
              {
                step: "2",
                title: "List Your Surplus",
                description: "Upload photos and details of your daily surplus food"
              },
              {
                step: "3",
                title: "Set Your Price",
                description: "We recommend 30-50% off retail price for best results"
              },
              {
                step: "4",
                title: "Get Customers",
                description: "Customers reserve and pick up their surprise bags at scheduled times"
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 mb-8 pb-8 border-b border-border last:border-b-0">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            What Our Partners Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "We've reduced our waste by 40% and made an extra $2,000 a month. It's been incredible!",
                author: "Sarah Chen",
                role: "Owner, Fresh Bakery Co.",
                image: "🥖"
              },
              {
                quote: "Our customers love the surprise bags, and we love saving the environment together.",
                author: "Marcus Johnson",
                role: "Manager, Green Garden Market",
                image: "🥕"
              },
              {
                quote: "Simple process, great support, and a real positive impact. Couldn't ask for better!",
                author: "Elena Rodriguez",
                role: "Owner, Organic Café",
                image: "☕"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 border border-border">
                <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Join the growing community of food businesses preventing waste and building a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="group">
              <Link to="/seller" className="flex items-center gap-2">
                Create Business Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Link to="/about">
              <Button variant="ghost" size="lg" className="text-primary-foreground hover:bg-primary-foreground/20">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Businesses;
