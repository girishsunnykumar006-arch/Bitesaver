# 🏪 Nearby Stores Feature - Complete Implementation Guide

## ✅ What's New

### 1. **Nearby Stores Page** (`/stores`)
A new browsable stores interface with category-based filtering and individual store views.

### 2. **Store Items Page** (`/store-items/:storeId`)
View all available food items from a specific store with add-to-cart functionality.

### 3. **Navigation Updates**
- Added "Nearby Stores" link to navbar
- Store Categories section on home page now links to `/stores`

---

## 📍 User Flow

```
Home Page
    ↓
Click "Nearby Stores" (Navbar) OR Category Card
    ↓
Stores Page - Select Category
    ↓
Shows list of stores in that category
    ↓
Click "View Items" on any store
    ↓
Store Items Page - Browse & Add to Cart
    ↓
All items in rupees (₹)
```

---

## 🏪 Stores & Items

### **Bakeries** (3 stores)
1. **Sunrise Bakery** - 12 items (0.8 km)
2. **Fresh Bakery Co.** - 15 items (0.3 km)
3. **Sweet Treats Bakery** - 10 items (1.2 km)

Items include: Croissants, Bread, Pastries, Donuts, Cakes

### **Supermarkets** (2 stores)
1. **Green Grocer Market** - 20 items (1.2 km)
2. **Green Garden Market** - 18 items (0.5 km)

Items include: Vegetables, Fruits, Dairy, Pantry Essentials, Frozen Foods

### **Restaurants** (2 stores)
1. **Pasta Paradise** - 25 items (0.5 km)
2. **Spice Route** - 22 items (1.5 km)

Items include: Pasta, Pizza, Risotto, Salads, Desserts

### **Cafés** (2 stores)
1. **Sweet Delights Café** - 14 items (1.5 km)
2. **Coffee Corner** - 11 items (0.7 km)

Items include: Coffee, Tea, Brownies, Breakfast, Sandwiches

### **Pastry Shops** (1 store)
1. **Pastry Haven** - 13 items (0.9 km)

### **Grocery Stores** (1 store)
1. **Organic Café** - 16 items (0.7 km)

**Total: 11 Stores, 100+ Food Items**

---

## 💰 All Prices in Indian Rupees (₹)

Every item displays in rupees with:
- **Original Price** (crossed out, gray text)
- **Discounted Price** (large, bold, highlighted)
- **Discount Percentage** - Shows savings %

Example:
```
₹750 (Original)
₹240 (Price)
-68% (Savings)
```

---

## 🎯 Features on Each Page

### **Stores Page** (`/stores`)

**Category View (Initial):**
- 6 category cards with icons
- Shows number of stores per category
- Click any category to see stores
- Smooth hover animations
- Border highlight on hover

**Store List View:**
- Back button to return to categories
- Each store card shows:
  - High-quality product image
  - Store name
  - Star rating (top right)
  - Number of available items
  - Pickup time with clock icon
  - Distance from you (in km) with location icon
  - "View Items" button
- Click to navigate to store items page
- Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)

### **Store Items Page** (`/store-items/:storeId`)

**Store Header Section:**
- Store image
- Store name & category
- Rating with star icon
- Pickup time info
- Distance info
- Total items available
- Back button to return to stores

**Items Grid:**
- Each item shows:
  - Product image with hover zoom
  - Discount badge (top left, red)
  - Star rating (top right)
  - Item name
  - Detailed description
  - Original price (strikethrough)
  - Discounted price (large, bold)
  - Customer review count
  - "Add to Cart" button

**Store Cart Summary (Sidebar):**
- Real-time item count
- Shows each item with:
  - Item name
  - Price per item × quantity
  - Total price
  - Remove button (trash icon)
- Subtotal calculation
- Total amount
- Sticky positioning (follows scroll)
- Shows "No items in cart yet" when empty

---

## 🛒 Add to Cart Flow

1. **Click "Add to Cart"** on any item
2. **Check Authentication:**
   - If not logged in → Redirect to `/signin`
   - If logged in → Continue
3. **Item Added:**
   - Appears in store cart sidebar
   - Quantity increments if adding same item twice
   - Also added to global cart
4. **View Cart:**
   - See items in sidebar
   - Update quantity with +/- buttons
   - Remove items with trash icon
   - See live total

---

## 🎨 Design Elements

### Colors (Rupees Display)
- **Price Text:** Foreground color (dark/light based on theme)
- **Strike-through:** Muted foreground (gray/dim)
- **Discount Badge:** Accent color (orange/warm)

### Layout
- **Desktop:** 3-column grid for stores, 2-column for items
- **Tablet:** 2-column grid
- **Mobile:** 1-column full width

### Interactions
- Hover scale-up on images (1.05x)
- Hover scale-up on category icons (1.1x)
- Smooth borders on hover (primary color)
- Sticky sidebar on desktop
- Scroll-able cart items (max 4 visible)

---

## 📱 Responsive Behavior

### Mobile (sm)
- Single column layouts
- Full-width images
- Larger touch targets
- Bottom-aligned cart (or scrollable)
- Stack store info vertically

### Tablet (md)
- 2-column grid
- Medium spacing
- Sidebar below main content or beside

### Desktop (lg)
- 3-column grid
- Sidebar fixed (sticky top)
- Full hover interactions
- Multi-line descriptions visible

---

## 🔗 New Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/stores` | Stores | Browse stores by category |
| `/store-items/:storeId` | StoreItems | View items from specific store |

---

## 📝 State Management

### Stores Page
```tsx
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [stores, setStores] = useState<Store[]>([]);
```

### Store Items Page
```tsx
const [cart, setCart] = useState<(FoodItem & { quantity: number })[]>([]);
```

---

## 🔄 Cart Integration

### Local Store Cart
- Separate from global cart
- Used for viewing items in sidebar
- Updates quantity when adding duplicate items

### Global Cart (CartContext)
- Items also added to global cart
- Used for checkout process
- Maintains across page navigation
- Required for order placement

### Item Format for Global Cart
```tsx
{
  id: item.id,
  store: `${store.name} - ${item.name}`,
  discount: item.discount,
  price: item.price,
  originalPrice: item.originalPrice,
  image: item.image,
}
```

---

## 🧪 Testing Checklist

### Stores Page
- [ ] Page loads at `/stores`
- [ ] Shows 6 category cards
- [ ] Each card shows correct store count
- [ ] Clicking category shows stores list
- [ ] Back button returns to categories
- [ ] Stores show images
- [ ] Distance shows correctly (km)
- [ ] Pickup time displays
- [ ] Star rating visible
- [ ] "View Items" button works
- [ ] Responsive on mobile/tablet/desktop

### Store Items Page
- [ ] Store header displays correctly
- [ ] Store info shows name, rating, distance
- [ ] Items grid shows all products
- [ ] Images load correctly
- [ ] All prices show in rupees (₹)
- [ ] Discount percentages correct
- [ ] Star ratings visible
- [ ] "Add to Cart" adds item
- [ ] Not logged in → redirect to signin
- [ ] Cart sidebar updates
- [ ] Quantity increases when adding same item
- [ ] Remove button deletes item
- [ ] Subtotal calculates correctly
- [ ] Back button returns to stores

### Navigation
- [ ] "Nearby Stores" link in navbar works
- [ ] Category click from home page goes to stores
- [ ] Store selection page transition smooth

---

## 💡 Example Store Item Data

### Sunrise Bakery - Croissants Pack
```
Name: Croissants Pack
Description: Fresh butter croissants (6 pieces)
Original Price: ₹350
Discounted Price: ₹180
Discount: 49%
Rating: 4.8 ⭐
Reviews: 234
Image: Bakery/pastry image
```

All 100+ items follow this structure with full pricing in rupees.

---

## 🎯 Key Features Summary

✅ Multiple stores across 6 categories
✅ 100+ food items with descriptions
✅ All prices in Indian Rupees (₹)
✅ High-quality product images
✅ Real-time cart updates
✅ Quantity management
✅ Authentication checks
✅ Responsive design
✅ Sticky cart sidebar
✅ Star ratings & reviews
✅ Discount percentages
✅ Smooth transitions
✅ Back navigation
✅ Global cart integration

---

## 🚀 Next Steps (Optional Enhancements)

1. **Search & Filter** - Search stores or items by name
2. **Rating Filter** - Show only highly-rated stores
3. **Distance Sort** - Sort stores by distance
4. **Category Filter** - Filter items within store
5. **Wishlist** - Save favorite items
6. **Store Reviews** - Customer ratings & comments
7. **Delivery Tracking** - Track orders from stores
8. **Store Hours** - Show open/closed status

---

## ✅ Status

**Development:** ✅ COMPLETE
**Testing:** Ready for manual testing
**Deployment:** Ready
**Known Issues:** None

All features implemented with hot reload enabled. Ready to test!
