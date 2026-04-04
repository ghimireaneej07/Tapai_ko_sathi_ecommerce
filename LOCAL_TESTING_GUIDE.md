# Local Testing & Validation Guide

Complete step-by-step guide to test the Tapai Ko Sathi e-commerce platform locally.

## Pre-Testing Checklist

- [ ] Backend server running on `http://127.0.0.1:8000`
- [ ] Frontend server running on `http://localhost:5173`
- [ ] MySQL database created: `tapai_ko_sathi`
- [ ] Products seeded: `python manage.py seed_products`
- [ ] Superuser created: `python manage.py createsuperuser`
- [ ] No errors in terminal/console

**Verify Backend:**
```bash
curl http://127.0.0.1:8000/api/store/products/
# Should return JSON with 10 products
```

**Verify Frontend:**
```
Open http://localhost:5173 in browser
# Should load without errors
```

---

## Phase 1: Authentication Testing

### Test 1.1: User Registration

**Steps:**
1. Go to `http://localhost:5173/auth`
2. Click "Register" tab
3. Fill in:
   - Username: `testuser1`
   - Email: `testuser1@example.com`
   - Password: `TestPass123!`
   - Confirm Password: `TestPass123!`
4. Click "Register"

**Expected Result:**
- ✅ Account created successfully
- ✅ Redirected to home page
- ✅ Logged in automatically (navbar shows username)

**Backend Verification:**
```bash
# Check user was created
python manage.py shell
>> from django.contrib.auth.models import User
>> User.objects.filter(username='testuser1').exists()
# Should return: True
>> exit()
```

### Test 1.2: User Login

**Steps:**
1. Go to `http://localhost:5173/auth`
2. Click "Login" tab
3. Fill in:
   - Username: `testuser1`
   - Password: `TestPass123!`
4. Click "Login"

**Expected Result:**
- ✅ Login successful
- ✅ Redirected to home page
- ✅ Navbar shows username
- ✅ JWT tokens stored in localStorage

**Verification (Developer Console):**
```javascript
// Open browser DevTools (F12) → Console
localStorage.getItem('accessToken')
// Should return a long JWT token string
```

### Test 1.3: User Profile

**Steps:**
1. Click on username in navbar (top right)
2. Click "Profile"
3. View profile page

**Expected Result:**
- ✅ Profile page loads
- ✅ Shows username, email
- ✅ Shows order history (if any orders exist)

### Test 1.4: Logout

**Steps:**
1. On profile page, click "Logout"

**Expected Result:**
- ✅ Logged out successfully
- ✅ Redirected to home
- ✅ Navbar no longer shows username
- ✅ localStorage token cleared

**Verification:**
```javascript
localStorage.getItem('accessToken')
// Should return: null
```

**✅ Authentication Phase Complete**

---

## Phase 2: Product Catalog Testing

### Test 2.1: Load Products List

**Steps:**
1. Navigate to Home (`http://localhost:5173/`)
2. Click "Shop Now" or go to Products page

**Expected Result:**
- ✅ Products page loads
- ✅ Shows all 10 products in grid
- ✅ Each product shows: name, price, "Add to Cart" button
- ✅ No error messages

**Verify Product Count:**
```bash
curl http://127.0.0.1:8000/api/store/products/ | jq '.count'
# Should return: 10
```

### Test 2.2: Search Products

**Steps:**
1. On Products page, find search box
2. Search for "ashwagandha"
3. Press Enter

**Expected Result:**
- ✅ Results filtered to matching products
- ✅ Shows only products with "ashwagandha" in name/description
- ✅ Search is case-insensitive

**API Test:**
```bash
curl "http://127.0.0.1:8000/api/store/products/?q=ashwagandha"
# Should return products matching search
```

### Test 2.3: Featured Products (Home Page)

**Steps:**
1. Go to Home page
2. Scroll down to "Featured Products" section

**Expected Result:**
- ✅ Shows 4 featured products (marked as featured=true)
- ✅ All are real products from database
- ✅ Can click to view details or add to cart

**API Test:**
```bash
curl "http://127.0.0.1:8000/api/store/products/?featured=true" | jq '.count'
# Should return: 4
```

### Test 2.4: Product Detail Page

**Steps:**
1. Click on any product card
2. View product detail page

**Expected Result:**
- ✅ Product detail loads
- ✅ Shows: name, description, price, stock
- ✅ Can add to cart from this page
- ✅ Can adjust quantity before adding
- ✅ Can go back to products list

### Test 2.5: Categories

**Steps:**
1. Go to Products page
2. Look for category filter section
3. Click on a category (e.g., "Herbal Medicines")

**Expected Result:**
- ✅ Products filtered by category
- ✅ Shows only products from selected category
- ✅ Can see category name in filter

**API Test:**
```bash
curl http://127.0.0.1:8000/api/store/categories/
# Should return: 6 categories
```

**✅ Product Catalog Phase Complete**

---

## Phase 3: Shopping Cart Testing

### Test 3.1: Add Item to Cart

**Prerequisite:** Must be logged in

**Steps:**
1. Click on any product "Add to Cart" button
2. Observe cart updates
3. Click on cart icon in navbar

**Expected Result:**
- ✅ Item added to cart
- ✅ Cart icon shows item count badge
- ✅ Clicking cart icon shows cart page

### Test 3.2: Update Cart Quantity

**Steps:**
1. Go to cart page
2. Find an item in cart
3. Update quantity (e.g., change 1 to 3)

**Expected Result:**
- ✅ Quantity updated
- ✅ Item price × quantity calculated correctly
- ✅ Cart total recalculates

**Example:**
```
Ashwagandha Powder: ₹399.99 × 3 = ₹1,199.97
```

### Test 3.3: Remove Item from Cart

**Steps:**
1. On cart page, click "Remove" on any item

**Expected Result:**
- ✅ Item removed from cart
- ✅ Cart total recalculates
- ✅ If last item removed, cart shows empty

**Backend Verification:**
```bash
# Check cart items count
curl -X GET "http://127.0.0.1:8000/api/store/cart/" \
  -H "Authorization: Bearer YOUR_TOKEN" | jq '.items | length'
```

### Test 3.4: Clear Cart

**Steps:**
1. Add 3-4 different products to cart
2. Remove each one

**Expected Result:**
- ✅ All items removed one by one
- ✅ Cart eventually shows empty state

**✅ Shopping Cart Phase Complete**

---

## Phase 4: Checkout & Order Testing

### Test 4.1: Checkout with Valid Data

**Prerequisites:**
- Must be logged in
- Cart must have items

**Steps:**
1. Go to cart page
2. Click "Proceed to Checkout"
3. Fill in delivery form:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+977-9841234567`
   - Address: `123 Main St, Kathmandu`
4. Click "Place Order"

**Expected Result:**
- ✅ Order created successfully
- ✅ Redirected to order confirmation page
- ✅ Shows order ID and items
- ✅ Cart cleared after order

**Backend Verification:**
```bash
# Check order was created
curl -X GET "http://127.0.0.1:8000/api/orders/" \
  -H "Authorization: Bearer YOUR_TOKEN" | jq '.count'
# Should return: 1 or more
```

### Test 4.2: Order History

**Steps:**
1. Go to Profile page
2. View "Order History" section

**Expected Result:**
- ✅ Shows previously placed order
- ✅ Displays order ID, total, status (pending)
- ✅ Can click to view order details

### Test 4.3: Order Details

**Steps:**
1. From order history, click on an order
2. View order detail page

**Expected Result:**
- ✅ Shows order information: ID, customer details, items
- ✅ Shows delivery address
- ✅ Shows order total and item breakdown
- ✅ Shows order date

**✅ Checkout & Order Phase Complete**

---

## Phase 5: API Integration Testing

### Test 5.1: Test All GET Endpoints

**Products Endpoint:**
```bash
curl http://127.0.0.1:8000/api/store/products/
# Response: 200 with JSON array of 10 products
```

**Categories Endpoint:**
```bash
curl http://127.0.0.1:8000/api/store/categories/
# Response: 200 with JSON array of 6 categories
```

**Featured Products:**
```bash
curl "http://127.0.0.1:8000/api/store/products/?featured=true"
# Response: 200 with 4 featured products
```

### Test 5.2: Test Authentication Endpoints

**Login (Get Token):**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
# Response: 200 with access and refresh tokens
```

**Get Current User:**
```bash
curl http://127.0.0.1:8000/api/auth/me/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
# Response: 200 with user details
```

### Test 5.3: Test Protected Endpoints

**Get Cart (requires auth):**
```bash
curl http://127.0.0.1:8000/api/store/cart/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
# Response: 200 with user's cart
```

**Add to Cart:**
```bash
curl -X POST http://127.0.0.1:8000/api/store/cart/items/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"product_id":1,"quantity":2}'
# Response: 201 with updated cart
```

### Test 5.4: Test Error Responses

**Unauthorized (no token):**
```bash
curl http://127.0.0.1:8000/api/store/cart/
# Response: 401 Unauthorized
```

**Not Found (invalid product ID):**
```bash
curl http://127.0.0.1:8000/api/store/products/99999/
# Response: 404 Not Found
```

**Invalid Request:**
```bash
curl -X POST http://127.0.0.1:8000/api/store/cart/items/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"product_id":"invalid"}'
# Response: 400 Bad Request
```

**✅ API Integration Phase Complete**

---

## Phase 6: Admin Interface Testing

### Test 6.1: Access Admin Panel

**Steps:**
1. Go to `http://127.0.0.1:8000/admin/`
2. Login with superuser (admin) credentials

**Expected Result:**
- ✅ Admin panel loads
- ✅ Shows dashboard with apps

### Test 6.2: Manage Products

**Steps:**
1. In admin, click "Products"
2. Verify 10 products listed
3. Click on one product to edit
4. View/edit fields: name, price, stock, featured

**Expected Result:**
- ✅ All 10 products visible
- ✅ Can search products by name
- ✅ Can filter by featured/active status
- ✅ Can edit product details

### Test 6.3: Manage Categories

**Steps:**
1. Click "Categories"
2. Verify 6 categories listed

**Expected Result:**
- ✅ All 6 categories visible
- ✅ Can view/edit category details

### Test 6.4: View Orders

**Steps:**
1. Click "Orders"
2. Verify orders from testing appear

**Expected Result:**
- ✅ Orders created during testing visible
- ✅ Can click order to view details
- ✅ Can see order items inline
- ✅ Can change order status (pending/paid/shipped/etc)

### Test 6.5: Manage Users

**Steps:**
1. Click "Users"
2. Verify test users created during project appear

**Expected Result:**
- ✅ Admin user visible
- ✅ Test users visible
- ✅ Can edit user details
- ✅ Can see user permissions

**✅ Admin Interface Phase Complete**

---

## Phase 7: Cross-Browser & Mobile Testing

### Test 7.1: Desktop Browser (Chrome/Firefox/Edge)

Test each page in multiple browsers:
- [ ] Home page loads and renders correctly
- [ ] Products page responsive and functional
- [ ] Cart works smoothly
- [ ] Checkout form fills correctly
- [ ] Images load without errors

### Test 7.2: Mobile Browser (Chrome DevTools)

**Steps:**
1. Open DevTools (F12)
2. Click device toolbar (mobile view)
3. Test all pages

**Verify on Mobile:**
- [ ] Pages responsive (no horizontal scroll)
- [ ] Touch interactions work
- [ ] Text readable at mobile size
- [ ] Buttons clickable with thumb
- [ ] Images scale appropriately

### Test 7.3: Actual Mobile Device

Test on physical smartphone:
- [ ] Load page: `http://your-computer-ip:5173` (replace with actual IP)
- [ ] Navigate all pages
- [ ] Add to cart
- [ ] Complete checkout

**Find Your Computer IP (Windows):**
```powershell
ipconfig
# Look for IPv4 Address: 192.168.x.x
# Use: http://192.168.x.x:5173
```

**✅ Cross-Browser Phase Complete**

---

## Phase 8: Performance & Load Testing

### Test 8.1: Page Load Time

**Chrome DevTools:**
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check timing:
   - Products page should load in < 2 seconds
   - Home page should load in < 1.5 seconds

### Test 8.2: API Response Time

```bash
# Measure API response
time curl http://127.0.0.1:8000/api/store/products/

# Should return in < 500ms
```

### Test 8.3: Bundle Size

```bash
cd frontend
npm run build
# Check output size (should be ~240-250KB gzipped)
```

**✅ Performance Phase Complete**

---

## Test Results Summary

### Criteria for Success

**All tests pass if:**
- ✅ User can register and login
- ✅ Products load and display correctly
- ✅ Can add/remove items from cart
- ✅ Can search and filter products
- ✅ Can checkout and create orders
- ✅ Admin panel shows all data
- ✅ All API endpoints return 200/201 on success
- ✅ Pages responsive on mobile
- ✅ No console errors

### Test Coverage

| Area | Tests | Pass/Fail |
|------|-------|-----------|
| Authentication | 4 | __ / 4 |
| Products | 5 | __ / 5 |
| Cart | 4 | __ / 4 |
| Orders | 3 | __ / 3 |
| API | 4 | __ / 4 |
| Admin | 5 | __ / 5 |
| Browser | 3 | __ / 3 |
| Performance | 3 | __ / 3 |
| **TOTAL** | **31** | **__ / 31** |

---

## Known Issues & Workarounds

### Issue: Products not loading
**Cause:** Backend not running
**Fix:** `python manage.py runserver`

### Issue: CORS error in console
**Cause:** Frontend and backend URLs mismatch
**Fix:** Check CORS_ALLOWED_ORIGINS in `.env`

### Issue: Login fails
**Cause:** User doesn't exist or wrong password
**Fix:** Create user first or reset password

### Issue: Cart syncs slowly
**Cause:** Browser caching
**Fix:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Images not showing
**Cause:** Media URLs not configured
**Fix:** Use local media files (already done in frontend)

---

## Debugging Commands

```bash
# Backend database state
python manage.py shell
>>> from apps.store.models import Product, Order, Cart
>>> Product.objects.count()
>>> Order.objects.count()
>>> Cart.objects.count()
>>> exit()

# Check running servers
# Windows:
netstat -ano | findstr :8000
netstat -ano | findstr :5173

# Check logs
# Backend: View terminal (auto-scrolls)
# Frontend: View terminal (auto-scrolls)

# Reset database (WARNING: Deletes all data)
python manage.py flush --no-input
python manage.py migrate
python manage.py seed_products
```

---

## Verification Checklist (Before Marking Complete)

- [ ] All 31 test cases passed
- [ ] No console errors in browser (F12)
- [ ] No exceptions in backend terminal
- [ ] Database has 10 products, 6 categories
- [ ] At least one order created and visible
- [ ] Can login with test user
- [ ] Can create and complete checkout
- [ ] Admin panel accessible with superuser
- [ ] API tests pass with curl
- [ ] Mobile view responsive

**Project is ready for deployment when all items are checked! ✅**

---

## Next Steps After Testing

1. ✅ Local testing complete
2. 📦 [Optional] Run `npm run build` for production bundle
3. 🚀 Ready for deployment (see README.md deployment section)
4. 📊 Monitor in production for errors
5. 🔄 Iterate based on user feedback
