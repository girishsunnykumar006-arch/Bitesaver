import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Croissant, ShoppingCart, UtensilsCrossed, Coffee, Cake, Apple, 
  MapPin, Star, Clock, ChevronLeft 
} from "lucide-react";

interface Store {
  id: number;
  name: string;
  category: string;
  distance: number;
  rating: number;
  image: string;
  pickupTime: string;
  itemsCount: number;
}

const storesData: Record<string, Store[]> = {
  Bakeries: [
    {
      id: 1,
      name: "Sunrise Bakery",
      category: "Bakeries",
      distance: 0.8,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      pickupTime: "6:00 PM - 7:00 PM",
      itemsCount: 12,
    },
    {
      id: 2,
      name: "Fresh Bakery Co.",
      category: "Bakeries",
      distance: 0.3,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
      pickupTime: "6:00 PM - 7:00 PM",
      itemsCount: 15,
    },
    {
      id: 3,
      name: "Sweet Treats Bakery",
      category: "Bakeries",
      distance: 1.2,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      pickupTime: "5:00 PM - 6:00 PM",
      itemsCount: 10,
    },
  ],
  Supermarkets: [
    {
      id: 4,
      name: "Green Grocer Market",
      category: "Supermarkets",
      distance: 1.2,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      pickupTime: "7:30 PM - 8:30 PM",
      itemsCount: 20,
    },
    {
      id: 5,
      name: "Green Garden Market",
      category: "Supermarkets",
      distance: 0.5,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      pickupTime: "5:30 PM - 6:30 PM",
      itemsCount: 18,
    },
  ],
  Restaurants: [
    {
      id: 6,
      name: "Pasta Paradise",
      category: "Restaurants",
      distance: 0.5,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
      pickupTime: "9:00 PM - 9:30 PM",
      itemsCount: 25,
    },
    {
      id: 7,
      name: "Spice Route",
      category: "Restaurants",
      distance: 1.5,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      pickupTime: "8:00 PM - 8:30 PM",
      itemsCount: 22,
    },
  ],
  Cafés: [
    {
      id: 8,
      name: "Sweet Delights Café",
      category: "Cafés",
      distance: 1.5,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      pickupTime: "5:00 PM - 6:00 PM",
      itemsCount: 14,
    },
    {
      id: 9,
      name: "Coffee Corner",
      category: "Cafés",
      distance: 0.7,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1442512595331-e89e90ea1e6f?w=400&h=300&fit=crop",
      pickupTime: "6:00 PM - 7:00 PM",
      itemsCount: 11,
    },
  ],
  "Pastry Shops": [
    {
      id: 10,
      name: "Pastry Haven",
      category: "Pastry Shops",
      distance: 0.9,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1508737143336-c788af0014c2?w=400&h=300&fit=crop",
      pickupTime: "5:30 PM - 6:30 PM",
      itemsCount: 13,
    },
  ],
  "Grocery Stores": [
    {
      id: 11,
      name: "Organic Café",
      category: "Grocery Stores",
      distance: 0.7,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
      pickupTime: "7:00 PM - 8:00 PM",
      itemsCount: 16,
    },
  ],
};

const categoryIcons: Record<string, any> = {
  Bakeries: Croissant,
  Supermarkets: ShoppingCart,
  Restaurants: UtensilsCrossed,
  Cafés: Coffee,
  "Pastry Shops": Cake,
  "Grocery Stores": Apple,
};

const Stores = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = Object.keys(storesData);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setStores(storesData[category]);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setStores([]);
  };

  const handleStoreClick = (storeId: number) => {
    navigate(`/store-items/${storeId}`);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 md:pb-24">
        <div className="container mx-auto px-4">
          {!selectedCategory ? (
            <>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
                Browse Nearby Stores
              </h1>
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                Select a category to see all available stores in your area with amazing deals.
              </p>

              {/* Categories Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {categories.map((category) => {
                  const IconComponent = categoryIcons[category];
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="group p-6 rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center border border-border hover:border-primary"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{category}</h3>
                      <p className="text-sm text-muted-foreground">
                        {storesData[category].length} stores
                      </p>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {/* Back Button */}
              <button
                onClick={handleBackClick}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Back to Categories</span>
              </button>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
                {selectedCategory}
              </h1>
              <p className="text-lg text-muted-foreground mb-12">
                {stores.length} stores available in your area
              </p>

              {/* Stores Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => handleStoreClick(store.id)}
                    className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer"
                  >
                    {/* Store Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        {store.rating}
                      </div>
                    </div>

                    {/* Store Info */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                          {store.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {store.itemsCount} items available
                        </p>
                      </div>

                      {/* Info Grid */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {store.pickupTime}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {store.distance} km away
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button className="w-full" variant="default">
                        View Items
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Stores;
