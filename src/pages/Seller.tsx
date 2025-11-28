import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Upload, X } from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

interface SellerFormData {
  businessName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  location: string;
  businessType: string;
  foodItems: FoodItem[];
}

const Seller = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"details" | "items" | "review">("details");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState<SellerFormData>({
    businessName: "",
    ownerName: "",
    email: "",
    phoneNumber: "",
    location: "",
    businessType: "",
    foodItems: [],
  });

  const [currentItem, setCurrentItem] = useState<FoodItem>({
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ""));
  };

  const validateDetailsStep = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.businessType) {
      newErrors.businessType = "Please select a business type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateItemStep = () => {
    const newErrors: Record<string, string> = {};

    if (formData.foodItems.length === 0) {
      newErrors.items = "Please add at least one food item";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentItem((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addFoodItem = () => {
    if (!currentItem.name || !currentItem.price || !currentItem.image) {
      setErrors({ item: "Please fill all item details and upload an image" });
      return;
    }

    const newItem = {
      ...currentItem,
      id: Date.now().toString(),
    };

    setFormData((prev) => ({
      ...prev,
      foodItems: [...prev.foodItems, newItem],
    }));

    setCurrentItem({
      id: "",
      name: "",
      description: "",
      price: 0,
      image: "",
    });

    setErrors({});
  };

  const removeItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      foodItems: prev.foodItems.filter((item) => item.id !== id),
    }));
  };

  const handleNextStep = () => {
    if (step === "details") {
      if (validateDetailsStep()) {
        setStep("items");
        setErrors({});
      }
    } else if (step === "items") {
      if (validateItemStep()) {
        setStep("review");
        setErrors({});
      }
    }
  };

  const handlePreviousStep = () => {
    if (step === "items") {
      setStep("details");
    } else if (step === "review") {
      setStep("items");
    }
    setErrors({});
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  if (submitSuccess) {
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
                Welcome to BiteSaver!
              </h1>
              <p className="text-lg text-muted-foreground">
                Your business profile has been created successfully. You'll be redirected to the home page shortly.
              </p>
              <p className="text-sm text-muted-foreground">
                Our team will review your listing and it will be live soon!
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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
                Sell Your Food
              </h1>
              <p className="text-lg text-muted-foreground">
                List your food items and connect with local customers
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between mb-12">
              {[
                { id: "details", label: "Business Details" },
                { id: "items", label: "Add Items" },
                { id: "review", label: "Review" },
              ].map((s, idx) => (
                <div
                  key={s.id}
                  className="flex items-center flex-1"
                  onClick={() => {
                    if (s.id === "details") setStep("details");
                    else if (s.id === "items" && step !== "details") setStep("items");
                  }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold cursor-pointer transition-colors ${
                      step === s.id
                        ? "bg-primary text-primary-foreground"
                        : step === "review"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 h-1 bg-border mx-2" />
                  <span
                    className={`hidden sm:inline text-sm font-medium ${
                      step === s.id ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Form Content */}
            <Card className="p-8 md:p-12">
              {/* Step 1: Business Details */}
              {step === "details" && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Business Details
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Business Name *
                    </label>
                    <Input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Enter your business name"
                      className={errors.businessName ? "border-red-500" : ""}
                    />
                    {errors.businessName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Owner Name *
                    </label>
                    <Input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={errors.ownerName ? "border-red-500" : ""}
                    />
                    {errors.ownerName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.ownerName}
                      </p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="10-digit phone"
                        className={errors.phoneNumber ? "border-red-500" : ""}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location *
                    </label>
                    <Input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter your business location"
                      className={errors.location ? "border-red-500" : ""}
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Business Type *
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select business type</option>
                      <option value="bakery">Bakery</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="supermarket">Supermarket</option>
                      <option value="cafe">Café</option>
                      <option value="grocery">Grocery Store</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.businessType && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.businessType}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Add Food Items */}
              {step === "items" && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Add Food Items
                  </h2>

                  {/* Add New Item Form */}
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-foreground">Add New Item</h3>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Food Item Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={currentItem.name}
                        onChange={handleItemChange}
                        placeholder="e.g., Croissants, Salad Box"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                      </label>
                      <Textarea
                        name="description"
                        value={currentItem.description}
                        onChange={handleItemChange}
                        placeholder="Describe the item (ingredients, quantity, etc.)"
                        className="resize-none"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Price (₹) *
                        </label>
                        <Input
                          type="number"
                          name="price"
                          value={currentItem.price || ""}
                          onChange={handleItemChange}
                          placeholder="0"
                          min="0"
                          step="0.01"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Food Picture *
                        </label>
                        <label className="flex items-center justify-center w-full px-3 py-2 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                          <div className="flex flex-col items-center gap-1">
                            <Upload className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {currentItem.image ? "Change" : "Upload"}
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {currentItem.image && (
                      <div className="relative w-32 h-32 mx-auto">
                        <img
                          src={currentItem.image}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {errors.item && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.item}
                      </p>
                    )}

                    <Button
                      onClick={addFoodItem}
                      variant="default"
                      className="w-full"
                    >
                      Add Item
                    </Button>
                  </div>

                  {/* Listed Items */}
                  {formData.foodItems.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">
                        Your Items ({formData.foodItems.length})
                      </h3>
                      {formData.foodItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-card rounded-lg p-4 border border-border"
                        >
                          <div className="flex gap-4 flex-1">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded object-cover"
                              />
                            )}
                            <div>
                              <p className="font-semibold text-foreground">{item.name}</p>
                              <p className="text-sm text-muted-foreground">₹{item.price}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-muted rounded transition-colors"
                          >
                            <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.items && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.items}
                    </p>
                  )}
                </div>
              )}

              {/* Step 3: Review */}
              {step === "review" && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Review Your Information
                  </h2>

                  {/* Business Info Review */}
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-foreground">Business Details</h3>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Business Name</p>
                        <p className="font-medium text-foreground">{formData.businessName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Owner Name</p>
                        <p className="font-medium text-foreground">{formData.ownerName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-medium text-foreground">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone Number</p>
                        <p className="font-medium text-foreground">{formData.phoneNumber}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">{formData.location}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Business Type</p>
                        <p className="font-medium text-foreground capitalize">
                          {formData.businessType}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items Review */}
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-foreground">
                      Food Items ({formData.foodItems.length})
                    </h3>
                    <div className="grid gap-3">
                      {formData.foodItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 bg-card rounded-lg p-4 border border-border"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{item.name}</p>
                            {item.description && (
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            )}
                            <p className="text-lg font-bold text-primary">₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4 mt-8 pt-8 border-t border-border">
                {step !== "details" && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handlePreviousStep}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                {step !== "review" ? (
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleNextStep}
                    className="flex-1"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Listing"}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Seller;
