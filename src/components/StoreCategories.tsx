import { Croissant, ShoppingCart, UtensilsCrossed, Coffee, Cake, Apple } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    icon: Croissant,
    name: "Bakeries",
    count: 1250,
    color: "bg-coral-light text-accent",
  },
  {
    icon: ShoppingCart,
    name: "Supermarkets",
    count: 890,
    color: "bg-success-light text-primary",
  },
  {
    icon: UtensilsCrossed,
    name: "Restaurants",
    count: 1450,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Coffee,
    name: "Cafés",
    count: 780,
    color: "bg-mint text-primary",
  },
  {
    icon: Cake,
    name: "Pastry Shops",
    count: 420,
    color: "bg-coral-light text-accent",
  },
  {
    icon: Apple,
    name: "Grocery Stores",
    count: 560,
    color: "bg-success-light text-primary",
  },
];

const StoreCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate("/stores");
  };
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Partner Categories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Find food from every type of store
          </h2>
          <p className="text-lg text-muted-foreground">
            From fresh bakery goods to restaurant meals, discover surprise bags from diverse local businesses.
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={handleCategoryClick}
              className="group p-6 rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 text-center border border-border hover:border-primary cursor-pointer"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <category.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count.toLocaleString()} stores</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreCategories;
