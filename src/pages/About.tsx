import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Globe, Users } from "lucide-react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] pt-32 overflow-hidden gradient-hero">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              About <span className="text-primary">BiteSaver</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We're on a mission to rescue delicious food from going to waste while making 
              sustainable eating accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground">
                Every year, billions of pounds of perfectly good food are thrown away. 
                At BiteSaver, we believe this is a problem we can solve together.
              </p>
              <p className="text-lg text-muted-foreground">
                By connecting local food businesses with conscious consumers, we create a 
                win-win that saves money, reduces waste, and builds a more sustainable future.
              </p>
              <Button variant="default" size="lg" className="group">
                Join Our Movement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-4">
                <Heart className="w-16 h-16 text-primary mx-auto" />
                <h3 className="text-2xl font-bold text-foreground">Sustainability First</h3>
                <p className="text-muted-foreground">Reducing food waste, one meal at a time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Our Core Values
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Environmental Impact",
                description: "Every surprise bag represents food saved from landfills and a smaller carbon footprint for our planet."
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "We build real relationships between businesses and their communities through transparency and trust."
              },
              {
                icon: Heart,
                title: "Accessibility",
                description: "Great food should be affordable for everyone. We make sustainability accessible to all."
              }
            ].map((value, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-colors">
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2.5M+", label: "Meals Saved" },
              { number: "5,000+", label: "Partner Stores" },
              { number: "500K+", label: "Happy Users" },
              { number: "1000+", label: "Tons of CO2 Saved" }
            ].map((stat, index) => (
              <div key={index}>
                <p className="font-display text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Join thousands of people who are already saving food and the planet.
          </p>
          <Button variant="secondary" size="lg" className="group">
            Get Started Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
