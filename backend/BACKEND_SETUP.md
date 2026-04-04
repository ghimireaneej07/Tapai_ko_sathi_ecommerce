# Backend Setup & Database Configuration Guide

This guide covers setting up the Django backend and MySQL database for local development and testing.

## Prerequisites

- **Python 3.10+** (check: `python --version`)
- **MySQL 8.0+** (check: `mysql --version`)
- **Virtual Environment** already activated (`.venv/Scripts/Activate.ps1`)

---

## Phase 1: Database Setup

### Step 1.1: Create MySQL Database

Open MySQL and create the database:

```sql
-- Open MySQL
mysql -u root -p

-- Inside MySQL prompt, run:
CREATE DATABASE tapai_ko_sathi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
-- Verify "tapai_ko_sathi" appears in the list
```

**Expected Output:**
```
Query OK, 1 row affected (0.02 sec)
| Database              |
|----------------------|
| ...                  |
| tapai_ko_sathi       |
```

### Step 1.2: Verify MySQL Connection

From terminal (with .venv activated):

```powershell
cd backend
python manage.py shell
```

Then inside Python shell:

```python
from django.db import connection
connection.ensure_connection()
print("Database connected successfully!")
exit()
```

**Expected Output:**
```
Database connected successfully!
>>>
```

---

## Phase 2: Django Setup & Migrations

### Step 2.1: Install Python Dependencies

```powershell
cd backend
pip install -r requirements.txt
```

**Expected Output:**
```
Successfully installed Django-5.x.x djangorestframework-3.15.x ... python-dotenv-1.0.x
```

### Step 2.2: Run Migrations

```powershell
python manage.py migrate
```

**Expected Output (in order):**
```
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions, store, orders, accounts
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying auth.0002_alter_permission_options... OK
  ...
  Applying store.0001_initial... OK
  Applying orders.0001_initial... OK
>>> Successfully applied all migrations
```

### Step 2.3: Create Superuser

```powershell
python manage.py createsuperuser
```

**Interactive Prompts:**
```
Username: admin
Email address: admin@example.com
Password: 
Password (again): 
Superuser created successfully.
```

---

## Phase 3: Seed Sample Data

### Step 3.1: Run Seed Command

```powershell
python manage.py seed_products
```

**Expected Output:**
```
🌱 Starting database seeding...
  ✓ Created: Herbal Medicines
  ✓ Created: Raw Herbs
  ✓ Created: Grains & Legumes
  ✓ Created: Honey & Bee Products
  ✓ Created: Spices
  ✓ Created: Powders
✓ Categories complete

  ✓ Created: Ashwagandha Powder (₹399.99)
  ✓ Created: Dried Tulsi Leaves (₹299.99)
  ✓ Created: Organic Moong Dal (₹189.99)
  ... (10 total products)
✓ Products complete (10 new products created)

🎉 Database seeding successful!
```

### Step 3.2: Verify Data in Django Admin

```powershell
python manage.py shell
```

Inside Python shell:

```python
from apps.store.models import Category, Product

# Check categories
print(f"Categories: {Category.objects.count()}")
# Expected: 6

# Check products
print(f"Total Products: {Product.objects.count()}")
# Expected: 10

# Check featured products
featured = Product.objects.filter(featured=True)
print(f"Featured Products: {featured.count()}")
# Expected: 4

# Sample product
prod = Product.objects.first()
print(f"Sample: {prod.name} - ₹{prod.price}")

exit()
```

**Expected Output:**
```
Categories: 6
Total Products: 10
Featured Products: 4
Sample: Ashwagandha Powder - ₹399.99
```

---

## Phase 4: Start Backend Dev Server

```powershell
cd backend
python manage.py runserver
```

**Expected Output:**
```
Watching for file changes with StatReloader
Quit the server with CTRL-BREAK.
Starting development server at http://127.0.0.1:8000/
Django version 5.x.x, using settings 'config.settings'
```

### Verify Backend is Running

In another terminal:

```powershell
curl http://127.0.0.1:8000/api/store/products/
```

**Expected Response (JSON with products):**
```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Ashwagandha Powder",
      "price": "399.99",
      "featured": true,
      "category": {...}
    },
    ...
  ]
}
```

---

## Phase 5: Testing API Endpoints

### 5.1: Get All Products
```powershell
curl -X GET "http://127.0.0.1:8000/api/store/products/"
```

### 5.2: Get Featured Products
```powershell
curl -X GET "http://127.0.0.1:8000/api/store/products/?featured=true"
```

### 5.3: Get Product by ID
```powershell
curl -X GET "http://127.0.0.1:8000/api/store/products/1/"
```

### 5.4: Login (Register first, then login)
```powershell
# Get Token
curl -X POST "http://127.0.0.1:8000/api/auth/token/" `
  -H "Content-Type: application/json" `
  -d '{"username":"admin","password":"your_password"}'
```

Expected Response:
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 5.5: Access Protected Endpoints with Token
```powershell
$token = "your-access-token-here"

curl -X GET "http://127.0.0.1:8000/api/auth/me/" `
  -H "Authorization: Bearer $token"
```

---

## Phase 6: Full Integration Testing Checklist

- [ ] ✓ MySQL database created and connection verified
- [ ] ✓ All migrations applied successfully
- [ ] ✓ Superuser created (admin credentials saved)
- [ ] ✓ 10 products seeded into database
- [ ] ✓ Backend dev server running on port 8000
- [ ] ✓ GET /api/store/products/ returns 10 items
- [ ] ✓ GET /api/store/products/?featured=true returns 4 items
- [ ] ✓ Admin can login with superuser credentials
- [ ] ✓ JWT tokens generated successfully
- [ ] ✓ Protected endpoints require Bearer token
- [ ] ✓ Cart CRUD operations work (add/remove items)
- [ ] ✓ Order checkout creates order in database

---

## Troubleshooting

### MySQL Connection Error: "Access Denied for user 'root'@'127.0.0.1'"
**Solution:** Update `.env` with correct MySQL password
```
DB_PASSWORD=your_actual_mysql_password
```

### Error: "No such table: store_category"
**Solution:** Run migrations that haven't been applied yet
```powershell
python manage.py migrate
python manage.py migrate store
python manage.py migrate orders
```

### Error: "ModuleNotFoundError: No module named 'mysqlclient'"
**Solution:** Install MySQL client for Python
```powershell
pip install mysqlclient
# or if on Windows, try:
pip install mysqlclient==2.2.0
```

### Seed Command Not Found: "No such option: --seed"
**Solution:** Ensure management/commands/__init__.py exists and seed_products.py is in the right place
```
backend/
  apps/
    store/
      management/
        __init__.py
        commands/
          __init__.py
          seed_products.py  ← Must be here
```

### CORS Error: "Cross-Origin Request Blocked"
**Solution:** Update `.env` with frontend URL
```
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### Port 8000 Already in Use
**Solution:** Run on different port
```powershell
python manage.py runserver 8001
```

---

## Next Steps

1. ✅ Backend running locally
2. Start frontend: `npm run dev` (in frontend/ folder)
3. Frontend automatically connects to `http://127.0.0.1:8000/api`
4. Test full application: products, cart, checkout, orders
5. Ready for deployment (see DEPLOYMENT.md)

---

## Quick Reference Commands

| Task | Command |
|------|---------|
| Start backend | `python manage.py runserver` |
| Run migrations | `python manage.py migrate` |
| Seed products | `python manage.py seed_products` |
| Create superuser | `python manage.py createsuperuser` |
| Django shell | `python manage.py shell` |
| View running processes | `netstat -ano \| findstr :8000` |
| Stop server | `Ctrl+C` |

