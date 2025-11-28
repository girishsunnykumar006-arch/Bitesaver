import { Search, ShoppingBag, Clock, Heart } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find Nearby",
    description: "Browse surprise bags from bakeries, restaurants, and supermarkets near you.",
    color: "bg-success-light text-primary",
  },
  {
    icon: ShoppingBag,
    title: "Reserve & Pay",
    description: "Choose your bag, pay through the app, and get a confirmation instantly.",
    color: "bg-coral-light text-accent",
  },
  {
    icon: Clock,
    title: "Pick Up",
    description: "Collect your surprise bag during the pickup window at the store.",
    color: "bg-secondary text-foreground",
  },
  {
    icon: Heart,
    title: "Enjoy & Save",
    description: "Discover delicious food at great prices while reducing food waste.",
    color: "bg-mint text-primary",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            How it Works
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Save food in 4 simple steps
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of food heroes who are making a difference every day.
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
              
              <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 h-full">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-soft">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-5`}>
                  <step.icon className="w-8 h-8" />
                </div>
                
                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
