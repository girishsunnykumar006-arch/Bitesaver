# 🎯 Quick Testing Guide - Home & Sign In Updates

## 📍 Where to Find the Changes

### 1. Home Page Changes
**URL:** http://localhost:8080/

**Location:** Scroll down to "Today's Deals" section

**What to Look For:**
- ✅ Prices show with ₹ symbol (not $)
- ✅ Buttons say "Add to Cart" (not "Reserve")
- ✅ Example: ₹750 crossed out, ₹240 highlighted

**Visual Example:**
```
FEATURED DEALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sunrise Bakery
Rating: ★ 4.8
Distance: 0.8 km away
Time: 6:00 PM - 7:00 PM

₹750    ← Original price (crossed)
₹240    ← Discounted price (main)
-68%    ← Discount percentage

[Add to Cart]  ← Button (was "Reserve")
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 2. Sign In Page Changes
**URL:** http://localhost:8080/signin

**What to Look For:**

#### Email Field:
```
📧 Email Address (Gmail only)
┌─────────────────────────────┐
│ user@gmail.com              │  ← Placeholder
└─────────────────────────────┘

VALID:      ✅ "Valid Gmail address"
INVALID:    ❌ "Email must end with @gmail.com"
```

#### Password Field with Real-Time Checklist:
```
🔒 Password
┌─────────────────────────────┐
│ ••••••••                    │
└─────────────────────────────┘

Password Requirements:
┌─────────────────────────────┐
│ ✗ Uppercase letter (A-Z)    │  ← Red when missing
│ ✗ Lowercase letter (a-z)    │
│ ✗ Special character (!...)  │
│ ✗ Number (0-9)              │
│ ✗ At least 8 characters     │
└─────────────────────────────┘
```

---

## 🧪 Test Case 1: Add to Cart (Not Logged In)

**Steps:**
1. Go to home page: http://localhost:8080/
2. Scroll to "Today's Deals"
3. Click "Add to Cart" button on any deal
4. Observe behavior

**Expected Result:**
- ✅ Redirected to Sign In page
- ✅ URL changes to http://localhost:8080/signin

---

## 🧪 Test Case 2: Add to Cart (Logged In)

**Steps:**
1. Sign in with: `demo@gmail.com` / `Demo@123!`
2. Go back to home page
3. Click "Add to Cart" on any deal
4. Observe behavior

**Expected Result:**
- ✅ See success alert: "Added '[Store Name]' surprise bag to cart!"
- ✅ Cart icon badge updates in navbar (shows count)
- ✅ Item appears in cart

---

## 🧪 Test Case 3: Email Validation - Invalid

**Steps:**
1. Go to Sign In page: http://localhost:8080/signin
2. Click email field
3. Type: `user@yahoo.com`
4. Tab out or press Enter
5. Observe error message

**Expected Result:**
- ✅ Red border around email field
- ✅ Error icon (⚠️)
- ✅ Message: "Email must end with @gmail.com"
- ✅ Sign In button remains **disabled**

**Try These (All Invalid):**
- `john@outlook.com` ❌
- `user@hotmail.com` ❌
- `admin@company.com` ❌
- `test@gmail` ❌ (missing .com)
- `@gmail.com` ❌ (no username)

---

## 🧪 Test Case 4: Email Validation - Valid

**Steps:**
1. Go to Sign In page
2. Clear email field
3. Type: `demo@gmail.com`
4. Tab out or press Enter
5. Observe success feedback

**Expected Result:**
- ✅ Green check icon (✓)
- ✅ Message: "Valid Gmail address"
- ✅ No red border
- ✅ Field looks correct

---

## 🧪 Test Case 5: Password Validation - Weak

**Steps:**
1. Go to Sign In page
2. Click password field
3. Type: `password` (simple, lowercase only)
4. Observe real-time checklist

**Expected Result:**
- ✅ Password box appears with blue background
- ✅ Shows requirements checklist:
  - ❌ Uppercase letter (A-Z)
  - ✓ Lowercase letter (a-z)
  - ❌ Special character
  - ❌ Number (0-9)
  - ❌ At least 8 characters (8/8 ✓ but missing others)
- ✅ Sign In button is **DISABLED**

**Try Adding Requirements One by One:**

1. Type `Password` (add uppercase):
   - ✓ Uppercase letter
   - ✓ Lowercase letter
   - ❌ Special character
   - ❌ Number
   - Button still DISABLED

2. Type `Password1` (add number):
   - ✓ Uppercase letter
   - ✓ Lowercase letter
   - ❌ Special character
   - ✓ Number (9/9 ✓)
   - Button still DISABLED

3. Type `Password1!` (add special char):
   - ✓ Uppercase letter (P)
   - ✓ Lowercase letter (assword)
   - ✓ Special character (!)
   - ✓ Number (1)
   - ✓ At least 8 characters (10/8 ✓)
   - Button becomes **ENABLED** ✅

---

## 🧪 Test Case 6: Password Validation - Valid

**Steps:**
1. Go to Sign In page
2. Clear password field
3. Type: `Demo@123!`
4. Observe checklist updates

**Expected Result:**
- ✅ All requirements turn GREEN:
  - ✓ Uppercase letter (D)
  - ✓ Lowercase letter (emo)
  - ✓ Special character (@)
  - ✓ Number (123)
  - ✓ At least 8 characters (9/8 ✓)
- ✅ Sign In button is **ENABLED**

**Valid Examples:**
- `Secure@Pwd123` ✅
- `Pass#word2024` ✅
- `My!Secret99` ✅

**Invalid Examples:**
- `password123` ❌ (no uppercase, no special char)
- `PASSWORD123!` ❌ (no lowercase)
- `Pass@word` ❌ (no number)
- `Pass@1` ❌ (less than 8 characters)

---

## 🧪 Test Case 7: Full Sign In Flow

**Steps:**
1. Go to Sign In page: http://localhost:8080/signin
2. Enter email: `demo@gmail.com`
3. See green checkmark on email ✅
4. Enter password: `Demo@123!`
5. See all requirements green ✅
6. Click "Sign In" button
7. Observe redirect

**Expected Result:**
- ✅ Email field shows green "Valid Gmail address"
- ✅ Password all requirements green
- ✅ Sign In button is **ENABLED** (not grayed out)
- ✅ Click Sign In
- ✅ Shows "Signing in..." for 1.5 seconds
- ✅ Redirects to home page
- ✅ Navbar shows:
  - "Hi, demo" greeting (instead of Sign In button)
  - Cart icon
  - "Logout" button

---

## 🧪 Test Case 8: Logout Flow

**Steps:**
1. After successful sign in (from Test Case 7)
2. Look at navbar
3. Click "Logout" button
4. Observe changes

**Expected Result:**
- ✅ Logout button disappears
- ✅ "Hi, demo" greeting disappears
- ✅ "Sign In" button returns
- ✅ "Get Started" button returns
- ✅ Cart badge disappears (or resets)

---

## 🧪 Test Case 9: Session Persistence

**Steps:**
1. Sign in with `demo@gmail.com` / `Demo@123!`
2. Close the browser tab (completely)
3. Open a new tab
4. Go to http://localhost:8080/
5. Observe

**Expected Result:**
- ✅ Still logged in!
- ✅ Navbar shows "Hi, demo"
- ✅ "Sign In" button is NOT visible
- ✅ Can click "Add to Cart" without redirecting to login
- ✅ Session persisted across browser refresh

---

## ✨ Price Verification Checklist

**Home Page - Today's Deals Section:**

- [ ] **Sunrise Bakery**
  - [ ] Original: ₹750
  - [ ] Discounted: ₹240
  - [ ] Discount: -68%

- [ ] **Green Grocer Market**
  - [ ] Original: ₹1,050
  - [ ] Discounted: ₹360
  - [ ] Discount: -66%

- [ ] **Pasta Paradise**
  - [ ] Original: ₹900
  - [ ] Discounted: ₹300
  - [ ] Discount: -67%

- [ ] **Sweet Delights Café**
  - [ ] Original: ₹600
  - [ ] Discounted: ₹210
  - [ ] Discount: -65%

---

## 🔍 Visual Verification

### Home Page - Featured Deals
```
✅ All prices show ₹ symbol
✅ Button text is "Add to Cart"
✅ Prices are crossed out (original)
✅ Highlighted price (discounted)
✅ Discount percentage visible
```

### Sign In Page - Email
```
✅ Placeholder shows: user@gmail.com
✅ Label says: Email Address (Gmail only)
✅ Valid emails show green checkmark
✅ Invalid emails show red error
```

### Sign In Page - Password
```
✅ Password requirements visible when typing
✅ Requirements turn green when met
✅ Requirements show red when not met
✅ Character count shows (e.g., 5/8)
✅ All 5 requirements must be green to enable Sign In
```

---

## 📞 Quick Reference

**Demo Credentials:**
- Email: `demo@gmail.com`
- Password: `Demo@123!`

**Test Links:**
- Home: http://localhost:8080/
- Browse: http://localhost:8080/browse
- Sign In: http://localhost:8080/signin
- Cart: http://localhost:8080/cart

**Invalid Emails (for testing):**
- user@yahoo.com
- admin@outlook.com
- test@company.com
- john@hotmail.com

**Weak Passwords (for testing):**
- password
- 12345678
- Password
- Password1
- Pass@word

**Strong Passwords (for testing):**
- Demo@123!
- Secure#Pwd123
- MyPass@2024
- Secure!Pass99

---

## ✅ All Tests Passed?

If all test cases pass, the implementation is complete and ready!

**Status: ✅ READY FOR PRODUCTION**
