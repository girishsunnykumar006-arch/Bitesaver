import { Clock, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const deals = [
  {
    id: 1,
    store: "Sunrise Bakery",
    type: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    originalPrice: 180,
    discountedPrice: 95,
    rating: 4.8,
    reviews: 234,
    distance: "0.8 km",
    pickupTime: "6:00 PM - 7:00 PM",
    itemsLeft: 3,
    discount: 47,
  },
  {
    id: 2,
    store: "Green Grocer Market",
    type: "Supermarket",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    originalPrice: 240,
    discountedPrice: 125,
    rating: 4.6,
    reviews: 189,
    distance: "1.2 km",
    pickupTime: "7:30 PM - 8:30 PM",
    itemsLeft: 5,
    discount: 48,
  },
  {
    id: 3,
    store: "Pasta Paradise",
    type: "Restaurant",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
    originalPrice: 240,
    discountedPrice: 125,
    rating: 4.9,
    reviews: 412,
    distance: "0.5 km",
    pickupTime: "9:00 PM - 9:30 PM",
    itemsLeft: 2,
    discount: 48,
  },
  {
    id: 4,
    store: "Sweet Delights Café",
    type: "Café",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    originalPrice: 160,
    discountedPrice: 85,
    rating: 4.7,
    reviews: 156,
    distance: "1.5 km",
    pickupTime: "5:00 PM - 6:00 PM",
    itemsLeft: 4,
    discount: 47,
  },
];

const FeaturedDeals = () => {
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (deal: typeof deals[0]) => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    addToCart({
      id: deal.id,
      store: deal.store,
      discount: deal.discount,
      price: deal.discountedPrice,
      originalPrice: deal.originalPrice,
      image: deal.image,
    });
    alert(`Added "${deal.store}" surprise bag to cart!`);
  };

  return (
    <section id="deals" className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Today's Deals
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Surprise bags near you
            </h2>
          </div>
          <Button variant="outline" className="self-start md:self-auto">
            View All Deals
          </Button>
        </div>
        
        {/* Deals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <article
              key={deal.id}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={deal.image}
                  alt={`Food from ${deal.store}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                  -{deal.discount}%
                </div>
                {/* Items Left */}
                <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {deal.itemsLeft} left
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary bg-success-light px-2 py-1 rounded-full">
                    {deal.type}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span>{deal.rating}</span>
                    <span>({deal.reviews})</span>
                  </div>
                </div>
                
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {deal.store}
                </h3>
                
                <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{deal.distance} away</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{deal.pickupTime}</span>
                  </div>
                </div>
                
                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold text-foreground">
                      ₹{deal.discountedPrice}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{deal.originalPrice}
                    </span>
                  </div>
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => handleAddToCart(deal)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
