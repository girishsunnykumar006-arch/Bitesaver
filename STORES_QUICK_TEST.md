# 🧪 Nearby Stores - Quick Testing Guide

## 🔗 Access the Feature

### Method 1: Click "Nearby Stores" in Navbar
```
1. Go to http://localhost:8080/
2. Look at navbar (top of page)
3. Click "Nearby Stores" link
4. You'll see stores page
```

### Method 2: Click Category Card on Home Page
```
1. Go to http://localhost:8080/
2. Scroll to "Partner Categories" section
3. Click any category (Bakeries, Supermarkets, etc.)
4. Opens stores page directly
```

### Method 3: Direct URL
```
http://localhost:8080/stores
```

---

## 📍 Test Flow

### Step 1: Browse Categories
**URL:** `http://localhost:8080/stores`

✅ **Expected:**
- [ ] 6 category cards visible (Bakeries, Supermarkets, Restaurants, Cafés, Pastry Shops, Grocery Stores)
- [ ] Each card shows icon and store count
- [ ] Cards have hover effects (shadow, scale up, blue border)
- [ ] All card text clearly readable

✅ **Try This:**
- Hover over each category card - watch for animations
- Click any category to see stores

---

### Step 2: Select Category - View Stores
**Example:** Click "Bakeries"

✅ **Expected:**
- [ ] "Back to Categories" button appears (top left)
- [ ] Shows "Bakeries" as heading
- [ ] Shows "3 stores available"
- [ ] Grid displays 3 bakery store cards

✅ **Each Store Card Shows:**
- [ ] Store image (high quality)
- [ ] Store name
- [ ] Star rating (top right corner)
- [ ] Number of items available (e.g., "12 items available")
- [ ] Pickup time with clock icon
- [ ] Distance in km with location pin icon
- [ ] "View Items" button

✅ **Try This:**
- Hover over store cards - watch image zoom effect
- Check all store names are correct:
  - Sunrise Bakery (0.8 km)
  - Fresh Bakery Co. (0.3 km)
  - Sweet Treats Bakery (1.2 km)

---

### Step 3: View Store Items
**Click "View Items" on any store (e.g., Sunrise Bakery)**

**URL:** `http://localhost:8080/store-items/1` (for Sunrise Bakery)

✅ **Expected - Store Header:**
- [ ] Store image on left
- [ ] Store name, category, rating
- [ ] Rating with star icon
- [ ] Pickup time info
- [ ] Distance info
- [ ] "12 items available" text
- [ ] "Back to Stores" button (top left)

✅ **Expected - Items Grid:**
- [ ] Shows all food items (5 items for Sunrise Bakery)
- [ ] Each item displays:
  - [ ] Product image
  - [ ] Discount badge (red, top left, shows -49%, -51%, etc.)
  - [ ] Star rating (top right)
  - [ ] Item name (e.g., "Croissants Pack")
  - [ ] Description (e.g., "Fresh butter croissants (6 pieces)")
  - [ ] Original price with strikethrough (e.g., ₹350)
  - [ ] **Discounted price in rupees (₹180)** ← KEY!
  - [ ] Review count (e.g., "234 customer reviews")
  - [ ] "Add to Cart" button

✅ **All Prices in Rupees:**
- [ ] ₹180 (Croissants - NOT $180)
- [ ] ₹220 (Bread Assortment)
- [ ] ₹240 (Pastries Collection)
- [ ] ₹150 (Donuts Box)
- [ ] ₹280 (Cakes & Pastries)

---

### Step 4: Add Items to Cart
**Try adding items to the store cart**

✅ **Expected - First Add:**
- [ ] Click "Add to Cart" on Croissants Pack
- [ ] If NOT logged in → Redirects to signin page
- [ ] If logged in → Item appears in right sidebar

✅ **Expected - Cart Sidebar Shows:**
- [ ] "Store Cart" heading
- [ ] Item name: "Croissants Pack"
- [ ] Price info: "₹180 × 1"
- [ ] Total price: "₹180"
- [ ] Trash icon to remove item
- [ ] Subtotal: ₹180
- [ ] Total: ₹180

✅ **Try Adding Same Item Again:**
- [ ] Click "Add to Cart" on Croissants Pack again
- [ ] Quantity should update to 2
- [ ] Price should show: "₹180 × 2"
- [ ] Total should show: "₹360"

✅ **Try Adding Different Item:**
- [ ] Click "Add to Cart" on Bread Assortment
- [ ] Cart now shows 2 items
- [ ] Subtotal adds up: ₹180 + ₹220 = ₹400
- [ ] Total shows ₹400

✅ **Try Removing Item:**
- [ ] Click trash icon next to Bread Assortment
- [ ] Item disappears from cart
- [ ] Total updates to ₹360

---

### Step 5: Test Other Categories

**Test Supermarkets:**
```
1. Go back to stores (/stores)
2. Click "Back to Categories"
3. Click "Supermarkets"
4. Should see 2 stores:
   - Green Grocer Market (1.2 km)
   - Green Garden Market (0.5 km)
5. Click store → see items with ₹ prices
```

**Test Restaurants:**
```
1. Go back and click "Restaurants"
2. Should see 2 stores:
   - Pasta Paradise (0.5 km)
   - Spice Route (1.5 km)
3. Items should include: Pasta, Pizza, Risotto, etc.
4. All prices in rupees (₹220, ₹320, ₹280, ₹180, ₹240)
```

**Test Cafés:**
```
1. Should see 2 stores:
   - Sweet Delights Café (1.5 km)
   - Coffee Corner (0.7 km)
2. Items: Coffee, Tea, Brownies, etc.
3. All prices in ₹
```

---

## ✅ Checklist

### Navigation
- [ ] Navbar shows "Nearby Stores" link
- [ ] Home page category cards clickable
- [ ] Direct URL access works

### Stores Page - Categories
- [ ] 6 categories visible
- [ ] Store count correct for each
- [ ] Hover effects work
- [ ] Click takes to store list

### Stores Page - Store List
- [ ] Correct number of stores per category
- [ ] Images visible
- [ ] Ratings visible
- [ ] Distance & time shown
- [ ] Items count shown
- [ ] Back button works

### Store Items Page - Header
- [ ] Store image displays
- [ ] Store info complete
- [ ] Back button works
- [ ] Responsive layout

### Store Items Page - Items
- [ ] All items display
- [ ] Images visible
- [ ] All prices in rupees (₹)
- [ ] Discount badges correct
- [ ] Ratings visible
- [ ] Descriptions readable

### Add to Cart
- [ ] Not logged in → redirect to signin
- [ ] Logged in → item added to cart
- [ ] Cart updates in real-time
- [ ] Quantity increases on duplicate add
- [ ] Remove works
- [ ] Total calculates correctly

### Responsive Design
- [ ] Mobile (360px) - Single column
- [ ] Tablet (768px) - 2 columns
- [ ] Desktop (1024px+) - 3 columns

---

## 🧪 Quick Test Scenarios

### Scenario 1: Browse & Add Multiple Items
```
1. Login with: demo@gmail.com / Demo@123!
2. Go to /stores
3. Click "Bakeries"
4. Click "View Items" on Sunrise Bakery
5. Add Croissants Pack
6. Add Bread Assortment
7. Add Pastries Collection
8. Check cart shows 3 items
9. Verify total: ₹180 + ₹220 + ₹240 = ₹640
10. Remove middle item (Bread)
11. Verify total: ₹180 + ₹240 = ₹420
```

### Scenario 2: Category Switch
```
1. On stores page - click "Bakeries"
2. See 3 bakery stores
3. Click back button
4. Click "Restaurants"
5. See 2 restaurant stores
6. Click store, add items
7. Go back, switch to "Supermarkets"
8. All items should have correct ₹ prices
```

### Scenario 3: Responsive Testing
```
1. Open stores page
2. Press F12 for dev tools
3. Toggle device toolbar
4. Test mobile (375px) - single column
5. Test tablet (768px) - double column
6. Test desktop (1920px) - 3 columns
7. All items visible and clickable
```

---

## 💡 What to Look For

✅ **Prices Always in Rupees:**
- Should see ₹ symbol, never $
- Examples: ₹180, ₹240, ₹320, ₹500, etc.

✅ **Images Visible:**
- All stores have images
- All items have images
- Images zoom on hover

✅ **Real-Time Cart:**
- Sidebar updates immediately
- No page refresh needed
- Totals calculate correctly

✅ **Smooth Navigation:**
- No console errors
- Transitions smooth
- Back buttons work

✅ **Data Accuracy:**
- Store counts correct
- Item counts correct
- Distances accurate
- Pickup times shown

---

## 🐛 Troubleshooting

### Page not loading?
- Check URL: `http://localhost:8080/stores`
- Clear cache: Ctrl+Shift+Delete
- Refresh: F5

### Items not showing?
- Check if logged in
- Try adding to cart - should redirect to signin if not logged in
- Scroll down to see items

### Prices show differently?
- All should be in rupees (₹)
- No $ symbols
- Format: ₹180, ₹240 (no commas for under 1000)

### Cart not updating?
- Try refreshing page
- Check browser console for errors
- Log out and log back in

---

## 📊 Data Summary

**Total Content:**
- 6 Categories
- 11 Stores
- 100+ Food Items
- All prices in Indian Rupees

**Sample Data:**
- Sunrise Bakery: 5 items (Croissants ₹180, Bread ₹220, Pastries ₹240, Donuts ₹150, Cakes ₹280)
- Green Grocer Market: 5 items (Vegetables ₹240, Fruits ₹280, Dairy ₹200, Pantry ₹350, Frozen ₹180)
- Pasta Paradise: 5 items (Pasta ₹220, Pizza ₹320, Risotto ₹280, Salads ₹180, Dessert ₹240)

All items with descriptions, ratings, images, and discounts!

---

**Status:** ✅ Ready to Test!

Go to `http://localhost:8080/stores` to begin testing!
