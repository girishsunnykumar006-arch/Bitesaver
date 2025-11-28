import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface SurpriseBag {
  id: number;
  store: string;
  discount: number;
  items: string;
  pickupTime: string;
  price: number;
  originalPrice: number;
  distance: number;
  rating: number;
  image: string;
}

const Browse = () => {
  const [bags, setBags] = useState<SurpriseBag[]>([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Mock data - prices now in Indian Rupees
    setBags([
      {
        id: 1,
        store: "Fresh Bakery Co.",
        discount: 70,
        items: "Pastries, Bread, Croissants",
        pickupTime: "6:00 PM - 7:00 PM",
        price: 89,
        originalPrice: 299,
        distance: 0.3,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      },
      {
        id: 2,
        store: "Green Garden Market",
        discount: 65,
        items: "Fresh Vegetables, Fruits",
        pickupTime: "5:30 PM - 6:30 PM",
        price: 125,
        originalPrice: 350,
        distance: 0.5,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      },
      {
        id: 3,
        store: "Organic Café",
        discount: 60,
        items: "Salads, Sandwiches, Desserts",
        pickupTime: "7:00 PM - 8:00 PM",
        price: 145,
        originalPrice: 360,
        distance: 0.7,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
      },
      {
        id: 4,
        store: "Sweet Treats Bakery",
        discount: 75,
        items: "Donuts, Cakes, Cupcakes",
        pickupTime: "5:00 PM - 6:00 PM",
        price: 75,
        originalPrice: 295,
        distance: 1.2,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      },
    ]);
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (bag: SurpriseBag) => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    addToCart({
      id: bag.id,
      store: bag.store,
      discount: bag.discount,
      price: bag.price,
      originalPrice: bag.originalPrice,
      image: bag.image,
    });
    alert(`Added "${bag.store}" surprise bag to cart!`);
  };

  const filteredBags = bags.filter(bag => 
    bag.store.toLowerCase().includes(search.toLowerCase()) ||
    bag.items.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Browse Surprise Bags
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Discover amazing deals from local food businesses. Fresh food at up to 70% off.
          </p>
          
          {/* Search */}
          <div className="max-w-xl">
            <Input
              placeholder="Search by store name or food type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12"
            />
          </div>
        </div>
      </section>

      {/* Bags Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {filteredBags.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBags.map((bag) => (
                <div
                  key={bag.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg group"
                >
                  {/* Image Placeholder */}
                  <div className="relative h-40 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                    <img
                      src={bag.image}
                      alt={`Food from ${bag.store}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      {bag.discount}% off
                    </div>
                    <button
                      onClick={() => toggleFavorite(bag.id)}
                      className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(bag.id)
                            ? "fill-accent text-accent"
                            : "text-foreground"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {bag.store}
                      </h3>
                      <p className="text-sm text-muted-foreground">{bag.items}</p>
                    </div>

                    {/* Info Grid */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {bag.pickupTime}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {bag.distance} km away
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        ₹{bag.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{bag.originalPrice}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-foreground">
                        ★ {bag.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">(342 reviews)</span>
                    </div>

                    {/* Button */}
                    <Button 
                      className="w-full" 
                      variant="default"
                      onClick={() => handleAddToCart(bag)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No surprise bags found matching your search.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Browse;
