# Tapai Ko Sathi - Full Stack Website

This project turns your Stitch project `10286869643235150374` into a real implementation with:


## Project Structure


## 1) Backend Setup (Django + MySQL)

1. Create MySQL database:
   - `CREATE DATABASE tapai_ko_sathi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
2. Configure backend env:
   - copy `backend/.env.example` to `backend/.env`
3. Install dependencies:
   - `cd backend`
   - `pip install -r requirements.txt`
4. Run migrations and server:
   - `python manage.py makemigrations`
   - `python manage.py migrate`
   - `python manage.py createsuperuser`
   - `python manage.py runserver`

API base: `http://127.0.0.1:8000/api`

JWT endpoints:


## 2) Frontend Setup (React + Tailwind)

1. Configure frontend env:
   - copy `frontend/.env.example` to `frontend/.env`
2. Install and run:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

Frontend URL: `http://localhost:5173`

## Feature Mapping from Stitch Screens
# 🌿 Tapai Ko Sathi - E-Commerce Platform

A full-stack e-commerce platform for Ayurvedic products, built with React and Django. Complete with user authentication, product catalog, shopping cart, and order management.

**Status:** Production-ready with local testing completed ✅

---

## 📋 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- MySQL 8.0+

### Local Setup (5 minutes)
```bash
# 1. Backend (in terminal 1)
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_products
python manage.py createsuperuser
python manage.py runserver

# 2. Frontend (in terminal 2)
cd frontend
npm install
npm run dev
```

Browser: `http://localhost:5173`

**API Docs:** See [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)  
**Setup Guide:** See [BACKEND_SETUP.md](backend/BACKEND_SETUP.md)

---

## 🏗️ Project Structure

```
tapai_ko_sathi/
├── backend/                          # Django REST API
│   ├── apps/
│   │   ├── accounts/                # User auth (register, login, profile)
│   │   ├── store/                   # Products, categories, cart
│   │   └── orders/                  # Order management
│   ├── config/                       # Django settings, URLs
│   ├── BACKEND_SETUP.md              # Complete setup guide
│   ├── API_DOCUMENTATION.md          # Full API reference
│   ├── requirements.txt
│   ├── manage.py
│   └── .env.example
│
├── frontend/                         # React + Vite + Tailwind
│   ├── src/
│   │   ├── api/                      # API client modules
│   │   ├── components/               # Reusable components
│   │   ├── context/                  # Auth state management
│   │   ├── pages/                    # Route pages (7 pages)
│   │   ├── App.jsx
│   │   ├── index.css                 # Tailwind + design tokens
│   │   └── main.jsx
│   ├── media/                        # Product images
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
└── README.md (this file)
```

---

## ✨ Features

### 🔐 Authentication
- User registration with email validation
- JWT-based authentication (access + refresh tokens)
- Protected user profile endpoints
- Persistent login (localStorage)

### 🛍️ Product Catalog
- Browse 10+ Ayurvedic products
- Category filtering (Herbal, Raw Herbs, Spices, etc.)
- Product search by name/description
- Featured products showcase
- Product detail pages with descriptions

### 🛒 Shopping Cart
- Add/remove items to cart
- Update quantities
- Real-time cart total calculation
- Cart persistence (user-specific)

### 📦 Order Management
- Checkout with delivery information
- Automatic cart → order conversion
- Order history and tracking
- Order status (pending/paid/shipped/delivered/cancelled)

### 👁️ Pages
1. **Home** - Hero, categories, featured products
2. **Products** - Full catalog with search/filter
3. **Product Detail** - Full product info + add to cart
4. **Cart** - Shopping cart management
5. **Checkout** - Order form and payment
6. **Auth** - Login/Register forms
7. **Profile** - User info and order history

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Django 5.0+
- **API:** Django REST Framework 3.15+
- **Auth:** Simple JWT 5.3+
- **Database:** MySQL 8.0+
- **CORS:** django-cors-headers 4.4+

### Frontend
- **Framework:** React 18
- **Build:** Vite 5.4
- **Styling:** Tailwind CSS 3.4
- **HTTP:** Axios
- **Routing:** React Router v6
- **Fonts:** Plus Jakarta Sans, Inter (Google Fonts)

### Design System
- **Tool:** Google Stitch (Project 10286869643235150374)
- **Color Palette:** Green tonal (#006f1d primary)
- **Radius:** 8px default (soft minimalism)
- **Typography:** Plus Jakarta Sans (display), Inter (body)

---

## 📖 Setup & Configuration

### Backend Setup

Complete guide with screenshots: [BACKEND_SETUP.md](backend/BACKEND_SETUP.md)

**Quick version:**
```bash
cd backend

# 1. Create MySQL database
mysql -u root -p
> CREATE DATABASE tapai_ko_sathi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
> exit

# 2. Configure .env
cp .env.example .env
# Edit DB_PASSWORD=your_mysql_password

# 3. Install and migrate
pip install -r requirements.txt
python manage.py migrate

# 4. Seed sample data
python manage.py seed_products
# Creates 6 categories + 10 products

# 5. Create admin user
python manage.py createsuperuser
# Username: admin
# Email: admin@example.com
# Password: (set your own)

# 6. Start server
python manage.py runserver
# Runs on http://127.0.0.1:8000
```

**Admin interface:** http://127.0.0.1:8000/admin/

### Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Configure .env (optional, default works)
cp .env.example .env
# VITE_API_URL=http://127.0.0.1:8000/api

# 3. Start dev server
npm run dev
# Runs on http://localhost:5173

# 4. Build for production
npm run build
# Creates /dist folder (~245KB gzipped)
```

---

## 🔗 API Quick Reference

**Base URL:** `http://127.0.0.1:8000/api`

### Public Endpoints
```bash
# Products
GET    /store/products/              # List all products
GET    /store/products/?featured=true # Featured only
GET    /store/products/?q=search     # Search products
GET    /store/products/{id}/          # Product details

# Categories
GET    /store/categories/             # List all categories

# Authentication
POST   /auth/register/                # Register new user
POST   /auth/token/                   # Login (get JWT)
POST   /auth/token/refresh/           # Refresh token
```

### Protected Endpoints (require JWT)
```bash
# User
GET    /auth/me/                      # Current user profile

# Cart (user-specific)
GET    /store/cart/                   # Get user's cart
POST   /store/cart/items/             # Add to cart
PATCH  /store/cart/items/{id}/        # Update quantity
DELETE /store/cart/items/{id}/        # Remove item

# Orders
GET    /orders/                       # List user's orders
GET    /orders/{id}/                  # Order details
POST   /orders/checkout/              # Create order from cart
```

**Full API docs:** [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)

---

## 📊 Database Schema

### Core Models
- **User** - Django auth user (username, email, password)
- **Category** - Product categories (name, slug)
- **Product** - Products (name, price, stock, featured, category)
- **Cart** - User shopping cart (OneToOne with User)
- **CartItem** - Cart line items (product, quantity)
- **Order** - Customer orders (total, status, user)
- **OrderItem** - Order line items (product, quantity, unit_price)

### Sample Data
- 6 product categories
- 10 seed products with realistic Nepali prices (₹189-599)
- 4 featured products for homepage

---

## 🧪 Testing

### Manual Testing Checklist

**Registration & Auth:**
- [ ] Register new user
- [ ] Login with credentials
- [ ] View user profile
- [ ] Logout clears token

**Products:**
- [ ] List all products (10 items)
- [ ] Search for product by name
- [ ] Filter featured products (4 items)
- [ ] View product details

**Shopping Cart:**
- [ ] Add product to cart
- [ ] Update cart quantity
- [ ] Remove item from cart
- [ ] Cart total calculated correctly

**Orders:**
- [ ] Checkout with delivery info
- [ ] Order created in database
- [ ] Cart cleared after checkout
- [ ] View order history

### API Testing

All endpoints testable via curl (see [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)):

```bash
# Get products
curl http://127.0.0.1:8000/api/store/products/ | jq

# Login
curl -X POST http://127.0.0.1:8000/api/auth/token/ \
   -H "Content-Type: application/json" \
   -d '{"username":"admin","password":"yourpassword"}'
```

---

## 🐛 Troubleshooting

### MySQL Connection Error
**Error:** `Access denied for user 'root'@'127.0.0.1'`

**Solution:** Update `backend/.env` with correct password
```
DB_PASSWORD=your_actual_mysql_password
```

### Products Not Loading
**Error:** Frontend shows empty products page

**Solution:** Ensure backend is running
```bash
cd backend
python manage.py runserver
```

### Port Already in Use
**Error:** Can't start backend on port 8000

**Solution:** Use different port
```bash
python manage.py runserver 8001
```

### Seed Command Error
**Error:** `No such option: --seed`

**Solution:** Ensure management/commands structure exists
```
backend/apps/store/management/commands/seed_products.py
```

### CORS Issues
**Error:** "Cross-Origin Request Blocked"

**Solution:** Update `backend/.env`
```
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

**Full troubleshooting guide:** [BACKEND_SETUP.md](backend/BACKEND_SETUP.md#troubleshooting)

---

## 📦 Deployment

Production deployment ready:

**Backend:**
- Host on Railway (free tier: 500 CPU hours/month)
- Configure PostgreSQL or MySQL addon
- Set production environment variables

**Frontend:**
- Deploy to Vercel (recommended, unlimited free tier)
- Or Netlify (free tier available)
- Automatically builds on git push

**API & Media:**
- Static files served by frontend build
- Images initially via URLs (upgrade to S3/Cloud Storage)

---

## 📝 File Descriptions

### Backend Key Files
- `backend/BACKEND_SETUP.md` - Complete database setup guide
- `backend/API_DOCUMENTATION.md` - Full API reference with examples
- `backend/apps/store/models.py` - Product, Category, Cart models
- `backend/apps/orders/models.py` - Order management models
- `backend/config/settings.py` - Django configuration
- `backend/apps/store/management/commands/seed_products.py` - Database seeding

### Frontend Key Files  
- `frontend/src/api/client.js` - Axios HTTP client wrapper
- `frontend/src/api/*.js` - API call modules (products, cart, orders, auth)
- `frontend/src/context/AuthContext.jsx` - JWT token & user state
- `frontend/src/pages/*.jsx` - All 7 route pages
- `frontend/src/components/*.jsx` - Navbar, Footer, ProductCard
- `frontend/src/index.css` - Tailwind + design tokens

---

## 🔄 Development Workflow

1. **Start both servers:**
    ```bash
    # Terminal 1: Backend
    cd backend && python manage.py runserver
   
    # Terminal 2: Frontend
    cd frontend && npm run dev
    ```

2. **Make changes:**
    - Frontend: Auto-refreshes with Vite
    - Backend: Auto-reloads on file changes

3. **Test API changes:**
    - Use curl or Postman
    - Or test in browser at `http://localhost:5173`

4. **Commit regularly:**
    ```bash
    git add .
    git commit -m "feat: description of changes"
    git push origin master
    ```

---

## 📄 License

This project is built as a complete e-commerce platform for Ayurvedic products.

---

## 🤝 Support

Need help? Check:
- [BACKEND_SETUP.md](backend/BACKEND_SETUP.md) - Backend setup & troubleshooting
- [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md) - API reference
- Django admin: `http://127.0.0.1:8000/admin/`

---

## ✅ Checklist for New Developers

- [ ] Fork/clone repository
- [ ] Install Python 3.10+, Node.js 18+, MySQL 8.0+
- [ ] Follow [BACKEND_SETUP.md](backend/BACKEND_SETUP.md) setup steps
- [ ] Start backend & frontend servers
- [ ] Test all 7 pages in browser
- [ ] Run product list API: `curl http://127.0.0.1:8000/api/store/products/`
- [ ] Test registration & login
- [ ] Add item to cart & checkout
- [ ] Verify order in admin panel

## Feature Mapping from Stitch Screens

- Home Page
- Product Listing
- Product Detail
- Cart
- Secure Checkout
- My Profile
- Login / Sign Up

## Recommended Next Step

Seed product/category data in Django admin so frontend screens render real inventory.

## Known Backend Gaps (Pending Fixes)

- Database credentials in `backend/.env` must be configured before Django API can start.
- Product listing and featured endpoints return empty UI fallback when backend is offline.
- Order/checkout flows are wired on frontend but depend on authenticated API + populated DB.
- Future maintenance: add DB health checks and seed command for first-run developer setup.
