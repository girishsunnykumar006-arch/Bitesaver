import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star, MapPin, Clock, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  discount: number;
  rating: number;
  reviews: number;
}

interface Store {
  id: number;
  name: string;
  category: string;
  distance: number;
  rating: number;
  pickupTime: string;
  image: string;
}

const storesData: Record<number, { store: Store; items: FoodItem[] }> = {
  1: {
    store: {
      id: 1,
      name: "Sunrise Bakery",
      category: "Bakeries",
      distance: 0.8,
      rating: 4.8,
      pickupTime: "6:00 PM - 7:00 PM",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    },
    items: [
      {
        id: 101,
        name: "Croissants Pack",
        description: "Fresh butter croissants (6 pieces)",
        price: 95,
        originalPrice: 180,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
        discount: 47,
        rating: 4.8,
        reviews: 234,
      },
      {
        id: 102,
        name: "Bread Assortment",
        description: "Mix of whole wheat, sourdough & white bread",
        price: 115,
        originalPrice: 220,
        image: "https://images.unsplash.com/photo-1585521537281-ba55c36c8a0b?w=400&h=300&fit=crop",
        discount: 48,
        rating: 4.7,
        reviews: 189,
      },
      {
        id: 103,
        name: "Pastries Collection",
        description: "Danish, pain au chocolate & more (8 pieces)",
        price: 125,
        originalPrice: 240,
        image: "https://images.unsplash.com/photo-1488477181946-85a2a7e3b59f?w=400&h=300&fit=crop",
        discount: 48,
        rating: 4.9,
        reviews: 412,
      },
      {
        id: 104,
        name: "Donuts Box",
        description: "Glazed, chocolate & fruit donuts (12 pieces)",
        price: 75,
        originalPrice: 150,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        discount: 50,
        rating: 4.6,
        reviews: 156,
      },
      {
        id: 105,
        name: "Cakes & Pastries",
        description: "Assorted cakes, eclairs & cream puffs",
        price: 145,
        originalPrice: 280,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        discount: 48,
        rating: 4.7,
        reviews: 198,
      },
    ],
  },
  4: {
    store: {
      id: 4,
      name: "Green Grocer Market",
      category: "Supermarkets",
      distance: 1.2,
      rating: 4.6,
      pickupTime: "7:30 PM - 8:30 PM",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
    },
    items: [
      {
        id: 201,
        name: "Fresh Vegetables Pack",
        description: "Seasonal vegetables (2kg assortment)",
        price: 125,
        originalPrice: 240,
        image: "https://images.unsplash.com/photo-1488459716781-6918f33fc205?w=400&h=300&fit=crop",
        discount: 48,
        rating: 4.8,
        reviews: 234,
      },
      {
        id: 202,
        name: "Organic Fruits",
        description: "Fresh organic fruits (2kg mix)",
        price: 145,
        originalPrice: 280,
        image: "https://images.unsplash.com/photo-1523677745891-6f3031224c94?w=400&h=300&fit=crop",
        discount: 48,
        rating: 4.7,
        reviews: 189,
      },
      {
        id: 203,
        name: "Dairy Products Bundle",
        description: "Milk, yogurt, cheese & butter",
        price: 105,
        originalPrice: 200,
        image: "https://images.unsplash.com/photo-1452195917944-aa37ac33c6eb?w=400&h=300&fit=crop",
        discount: 47,
        rating: 4.9,
        reviews: 312,
      },
      {
        id: 204,
        name: "Pantry Essentials",
        description: "Rice, dal, spices & oils combo",
        price: 135,
        originalPrice: 350,
        image: "https://images.unsplash.com/photo-1585518419759-10eac04f0ba9?w=400&h=300&fit=crop",
        discount: 61,
        rating: 4.6,
        reviews: 156,
      },
      {
        id: 205,
        name: "Frozen Foods",
        description: "Frozen vegetables, bread & pastries",
        price: 95,
        originalPrice: 180,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        discount: 47,
        rating: 4.5,
        reviews: 98,
      },
    ],
  },
  6: {
    store: {
      id: 6,
      name: "Pasta Paradise",
      category: "Restaurants",
      distance: 0.5,
      rating: 4.9,
      pickupTime: "9:00 PM - 9:30 PM",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
    },
    items: [
      {
        id: 301,
        name: "Pasta & Sauce Pack",
        description: "Spaghetti with marinara sauce (serves 2)",
        price: 115,
        originalPrice: 220,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
        discount: 48,
        rating: 4.8,
        reviews: 234,
      },
      {
        id: 302,
        name: "Pizza Bundle",
        description: "Cheese & vegetable pizzas (2 large)",
        price: 160,
        originalPrice: 320,
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
        discount: 50,
        rating: 4.9,
        reviews: 456,
      },
      {
        id: 303,
        name: "Risotto Special",
        description: "Mushroom risotto with garlic bread",
        price: 145,
        originalPrice: 280,
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
        discount: 48,
        rating: 4.7,
        reviews: 189,
      },
      {
        id: 304,
        name: "Salad Selection",
        description: "Fresh garden salads (3 varieties)",
        price: 95,
        originalPrice: 180,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
        discount: 47,
        rating: 4.6,
        reviews: 167,
      },
      {
        id: 305,
        name: "Dessert Combo",
        description: "Tiramisu, panna cotta & gelato",
        price: 125,
        originalPrice: 240,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        discount: 48,
        rating: 4.8,
        reviews: 298,
      },
    ],
  },
  8: {
    store: {
      id: 8,
      name: "Sweet Delights Café",
      category: "Cafés",
      distance: 1.5,
      rating: 4.7,
      pickupTime: "5:00 PM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    },
    items: [
      {
        id: 401,
        name: "Coffee & Pastry Pack",
        description: "Assorted coffees with pastries (4 combo)",
        price: 135,
        originalPrice: 260,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        discount: 48,
        rating: 4.8,
        reviews: 234,
      },
      {
        id: 402,
        name: "Tea Collection",
        description: "Premium tea selection with cookies",
        price: 105,
        originalPrice: 200,
        image: "https://images.unsplash.com/photo-1597318816424-0a47edde1d89?w=400&h=300&fit=crop",
        discount: 47,
        rating: 4.7,
        reviews: 156,
      },
      {
        id: 403,
        name: "Brownies & Cookies",
        description: "Fresh baked brownies & cookies (12 pieces)",
        price: 75,
        originalPrice: 150,
        image: "https://images.unsplash.com/photo-1590080876-849b5fbb8f43?w=400&h=300&fit=crop",
        discount: 50,
        rating: 4.9,
        reviews: 312,
      },
      {
        id: 404,
        name: "Breakfast Bundle",
        description: "Pastries, bread & jam combo",
        price: 115,
        originalPrice: 220,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=400&h=300&fit=crop",
        discount: 48,
        rating: 4.6,
        reviews: 189,
      },
      {
        id: 405,
        name: "Sandwich Pack",
        description: "Gourmet sandwiches (4 varieties)",
        price: 145,
        originalPrice: 280,
        image: "https://images.unsplash.com/photo-1528735602780-cf6f96c2c896?w=400&h=300&fit=crop",
        discount: 48,
        rating: 4.7,
        reviews: 223,
      },
    ],
  },
};

const StoreItems = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useState<(FoodItem & { quantity: number })[]>([]);

  const storeInfo = storeId ? storesData[parseInt(storeId)] : null;
  const items = storeInfo?.items || [];
  const store = storeInfo?.store;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!storeInfo) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-12 md:pb-24">
          <div className="container mx-auto px-4">
            <p className="text-lg text-muted-foreground">Store not found</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const handleAddToCart = (item: FoodItem) => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    // Also add to global cart
    addToCart({
      id: item.id,
      store: `${store?.name} - ${item.name}`,
      discount: item.discount,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
    });
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCart(cart.filter((i) => i.id !== itemId));
  };

  const handleUpdateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
    } else {
      setCart(
        cart.map((i) => (i.id === itemId ? { ...i, quantity } : i))
      );
    }
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 md:pb-24">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate("/stores")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Stores</span>
          </button>

          {/* Store Header */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Store Image */}
            <div className="md:col-span-1">
              <img
                src={store?.image}
                alt={store?.name}
                className="w-full h-48 rounded-2xl object-cover"
              />
            </div>

            {/* Store Info */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {store?.name}
                </h1>
                <p className="text-lg text-muted-foreground">{store?.category}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{store?.rating}</span>
                  </div>
                  <span className="text-muted-foreground">Highly rated store</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  {store?.pickupTime}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  {store?.distance} km away
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>{items.length} items available</p>
              </div>
            </div>
          </div>

          {/* Items and Cart Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items Grid */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Available Items
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
                  >
                    {/* Item Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                        -{item.discount}%
                      </div>
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {item.rating}
                      </div>
                    </div>

                    {/* Item Info */}
                    <div className="p-5 space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-foreground">
                          ₹{item.price}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{item.originalPrice}
                        </span>
                      </div>

                      {/* Rating */}
                      <p className="text-xs text-muted-foreground">
                        {item.reviews} customer reviews
                      </p>

                      {/* Button */}
                      <Button
                        className="w-full"
                        variant="default"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6 sticky top-24 h-fit">
                <h2 className="font-semibold text-xl text-foreground">
                  Store Cart
                </h2>

                {cart.length > 0 ? (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <div className="flex-grow">
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              ₹{item.price} × {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">
                              ₹{item.price * item.quantity}
                            </span>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="p-1 hover:bg-muted rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t border-border pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold text-foreground">₹{cartSubtotal}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-foreground">Total</span>
                        <span className="text-primary">₹{cartSubtotal}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No items in cart yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default StoreItems;
