import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, AlertCircle, Banknote, CreditCard, Building2, Smartphone, Wallet } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn, navigate]);

  if (items.length === 0) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-12 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 py-12">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Your cart is empty
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Add items to your cart before proceeding to checkout.
              </p>
              <Button variant="default" size="lg" onClick={() => navigate("/browse")}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
      setIsSubmitting(false);

      // Show success message for 2 seconds then redirect
      setTimeout(() => {
        clearCart();
        navigate("/");
      }, 2000);
    }, 1500);
  };

  const deliveryCharge = 29;
  const tax = Math.round(totalPrice * 0.1);
  const finalTotal = totalPrice + deliveryCharge + tax;

  if (orderPlaced) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-12 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 py-12 max-w-md mx-auto">
              <div className="flex justify-center">
                <div className="relative w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-primary" />
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Order Placed Successfully!
              </h1>
              <p className="text-lg text-muted-foreground">
                Your order has been confirmed. You will receive your items at the scheduled pickup time.
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting to home page...
              </p>
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
            Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Details */}
              <Card className="p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Delivery Details
                </h2>

                <form className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit phone number"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address *
                    </label>
                    <Textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete address"
                      className={`resize-none ${errors.address ? "border-red-500" : ""}`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City and Postal Code */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        City *
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Postal Code *
                      </label>
                      <Input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Enter postal code"
                        className={errors.postalCode ? "border-red-500" : ""}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </Card>

              {/* Payment Method */}
              <Card className="p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4">
                  {/* Cash on Delivery */}
                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    style={{
                      borderColor: paymentMethod === "cod" ? "var(--color-primary)" : "var(--color-border)",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <Banknote className="w-5 h-5 ml-3 text-green-600" />
                    <span className="ml-2 flex flex-col">
                      <span className="font-semibold text-foreground">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Pay when you receive your order
                      </span>
                    </span>
                  </label>

                  {/* Online Payment */}
                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    style={{
                      borderColor: paymentMethod === "online" ? "var(--color-primary)" : "var(--color-border)",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <CreditCard className="w-5 h-5 ml-3 text-blue-600" />
                    <span className="ml-2 flex flex-col">
                      <span className="font-semibold text-foreground">
                        💳 Online Payment
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Debit/Credit card, Apple Pay, Google Pay
                      </span>
                    </span>
                  </label>

                  {/* Net Banking */}
                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    style={{
                      borderColor: paymentMethod === "netbanking" ? "var(--color-primary)" : "var(--color-border)",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={paymentMethod === "netbanking"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <Building2 className="w-5 h-5 ml-3 text-orange-600" />
                    <span className="ml-2 flex flex-col">
                      <span className="font-semibold text-foreground">
                        🏦 Net Banking
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Bank account transfer and online banking
                      </span>
                    </span>
                  </label>

                  {/* UPI Payment */}
                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    style={{
                      borderColor: paymentMethod === "upi" ? "var(--color-primary)" : "var(--color-border)",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <Smartphone className="w-5 h-5 ml-3 text-purple-600" />
                    <span className="ml-2 flex flex-col">
                      <span className="font-semibold text-foreground">
                        📱 UPI Payment
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Google Pay, PhonePe, PayTM, BHIM
                      </span>
                    </span>
                  </label>

                  {/* Razorpay */}
                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                    style={{
                      borderColor: paymentMethod === "razorpay" ? "var(--color-primary)" : "var(--color-border)",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <Wallet className="w-5 h-5 ml-3 text-indigo-600" />
                    <span className="ml-2 flex flex-col">
                      <span className="font-semibold text-foreground">
                        💰 Razorpay
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Secure payment with multiple options
                      </span>
                    </span>
                  </label>
                </div>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6 sticky top-24">
                <h2 className="font-semibold text-xl text-foreground">
                  Order Summary
                </h2>

                {/* Items List */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex items-start gap-2 flex-grow">
                        <img
                          src={item.image}
                          alt={item.store}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium text-foreground">{item.store}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium text-foreground">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium text-foreground">₹{deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium text-foreground">₹{tax}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex justify-between items-center text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{finalTotal}</span>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full"
                  variant="default"
                  size="lg"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Checkout;
