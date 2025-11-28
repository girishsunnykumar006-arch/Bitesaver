import { useEffect, useState, useRef } from "react";
import { Utensils, Leaf, Users, Store } from "lucide-react";

const stats = [
  {
    icon: Utensils,
    value: 2500000,
    suffix: "+",
    label: "Meals Saved",
    description: "Delicious food rescued from going to waste",
  },
  {
    icon: Leaf,
    value: 5000,
    suffix: " tons",
    label: "CO₂ Prevented",
    description: "Equivalent to 1,200 cars off the road for a year",
  },
  {
    icon: Users,
    value: 500000,
    suffix: "+",
    label: "Active Users",
    description: "Food heroes making a difference daily",
  },
  {
    icon: Store,
    value: 5000,
    suffix: "+",
    label: "Partner Stores",
    description: "Local businesses reducing their waste",
  },
];

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(startValue + (end - startValue) * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref, isVisible };
};

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
};

const ImpactSection = () => {
  return (
    <section id="impact" className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider mb-4">
            Our Impact
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Together, we're making a difference
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Every meal saved is a step towards a more sustainable future. 
            See how our community is fighting food waste.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const { count, ref, isVisible } = useCountUp(stat.value, 2500);
            
            return (
              <div
                key={stat.label}
                ref={ref}
                className="text-center p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/15 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
                  <stat.icon className="w-8 h-8" />
                </div>
                <p className={`font-display text-4xl md:text-5xl font-bold mb-2 ${isVisible ? 'animate-count-up' : 'opacity-0'}`}>
                  {formatNumber(count)}{stat.suffix}
                </p>
                <p className="text-xl font-semibold mb-2">{stat.label}</p>
                <p className="text-sm text-primary-foreground/70">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
