import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (items.length === 0) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-12 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 py-12">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Your cart is empty
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Discover amazing deals from local food businesses and add surprise bags to your cart.
              </p>
              <Link to="/browse">
                <Button variant="default" size="lg" className="group">
                  Browse Deals
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-12 md:pb-24">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-12">
            Shopping Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-2xl border border-border p-6 flex items-center gap-6"
                >
                  {/* Item Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.store}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {item.store}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.discount}% off
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 border border-border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 hover:bg-muted transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-muted transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground line-through">
                          ₹{item.originalPrice}
                        </p>
                        <p className="font-semibold text-lg text-primary">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6 sticky top-24">
                <h2 className="font-semibold text-xl text-foreground">
                  Order Summary
                </h2>

                <div className="space-y-3 border-b border-border pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium text-foreground">₹29</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium text-foreground">
                      ₹{Math.round(totalPrice * 0.1)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">
                    ₹{Math.round(totalPrice + 29 + totalPrice * 0.1)}
                  </span>
                </div>

                <Link to="/checkout">
                  <Button className="w-full" variant="default" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <button
                  onClick={() => clearCart()}
                  className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear Cart
                </button>

                <Link to="/browse" className="w-full">
                  <Button variant="outline" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Cart;
