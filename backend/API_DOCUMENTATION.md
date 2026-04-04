# API Documentation

Complete REST API reference for the Tapai Ko Sathi e-commerce backend.

## Base URL

```
http://127.0.0.1:8000/api
```

---

## Authentication

### Get Access Token

**POST** `/auth/token/`

Obtain JWT access and refresh tokens.

```bash
curl -X POST http://127.0.0.1:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Refresh Access Token

**POST** `/auth/token/refresh/`

Get a new access token using refresh token.

```bash
curl -X POST http://127.0.0.1:8000/api/auth/token/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh":"your-refresh-token"}'
```

**Request Body:**
```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Register New User

**POST** `/auth/register/`

Create a new user account.

```bash
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username":"john_doe",
    "email":"john@example.com",
    "password":"SecurePass123",
    "first_name":"John",
    "last_name":"Doe"
  }'
```

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response (201):**
```json
{
  "id": 2,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe"
}
```

### Get Current User

**GET** `/auth/me/`

Get authenticated user's profile.

**Headers:**
```
Authorization: Bearer {access_token}
```

```bash
curl -X GET http://127.0.0.1:8000/api/auth/me/ \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "first_name": "Admin",
  "last_name": "User"
}
```

---

## Products

### List All Products

**GET** `/store/products/`

Retrieve all active products with optional filtering.

**Query Parameters:**
- `q` - Search by product name or description
- `featured` - Filter featured products (true/false)

```bash
# Get all products
curl -X GET http://127.0.0.1:8000/api/store/products/

# Search products
curl -X GET "http://127.0.0.1:8000/api/store/products/?q=ashwagandha"

# Get featured products only
curl -X GET "http://127.0.0.1:8000/api/store/products/?featured=true"
```

**Response (200):**
```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Ashwagandha Powder",
      "slug": "ashwagandha-powder",
      "description": "Pure Ashwagandha powder for stress relief",
      "price": "399.99",
      "stock": 50,
      "image_url": "",
      "featured": true,
      "is_active": true,
      "category": {
        "id": 1,
        "name": "Herbal Medicines",
        "slug": "herbal-medicines"
      }
    }
  ]
}
```

### Get Product Details

**GET** `/store/products/{id}/`

Retrieve detailed information about a specific product.

```bash
curl -X GET http://127.0.0.1:8000/api/store/products/1/
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Ashwagandha Powder",
  "slug": "ashwagandha-powder",
  "description": "Pure Ashwagandha powder for stress relief and immunity",
  "price": "399.99",
  "stock": 50,
  "image_url": "",
  "featured": true,
  "is_active": true,
  "category": {
    "id": 1,
    "name": "Herbal Medicines",
    "slug": "herbal-medicines"
  }
}
```

---

## Categories

### List All Categories

**GET** `/store/categories/`

Retrieve all product categories.

```bash
curl -X GET http://127.0.0.1:8000/api/store/categories/
```

**Response (200):**
```json
{
  "count": 6,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Herbal Medicines",
      "slug": "herbal-medicines"
    },
    {
      "id": 2,
      "name": "Raw Herbs",
      "slug": "raw-herbs"
    }
  ]
}
```

---

## Cart

### Get User Cart

**GET** `/store/cart/`

Retrieve the current user's shopping cart.

**Headers:**
```
Authorization: Bearer {access_token}
```

```bash
curl -X GET http://127.0.0.1:8000/api/store/cart/ \
  -H "Authorization: Bearer {access_token}"
```

**Response (200):**
```json
{
  "id": 1,
  "items": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "Ashwagandha Powder",
        "price": "399.99",
        "stock": 50
      },
      "quantity": 2
    }
  ],
  "total": "799.98",
  "updated_at": "2026-04-04T10:30:00Z"
}
```

### Add Item to Cart

**POST** `/store/cart/items/`

Add a product to the shopping cart.

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

```bash
curl -X POST http://127.0.0.1:8000/api/store/cart/items/ \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{"product_id":1,"quantity":2}'
```

**Request Body:**
```json
{
  "product_id": 1,
  "quantity": 2
}
```

**Response (201):**
```json
{
  "id": 1,
  "items": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "name": "Ashwagandha Powder",
        "price": "399.99"
      },
      "quantity": 2
    }
  ],
  "total": "799.98"
}
```

### Update Cart Item

**PATCH** `/store/cart/items/{item_id}/`

Update quantity of a cart item.

```bash
curl -X PATCH http://127.0.0.1:8000/api/store/cart/items/1/ \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{"quantity":5}'
```

**Request Body:**
```json
{
  "quantity": 5
}
```

**Response (200):**
```json
{
  "id": 1,
  "items": [
    {
      "id": 1,
      "product": {...},
      "quantity": 5
    }
  ],
  "total": "1999.95"
}
```

### Remove Cart Item

**DELETE** `/store/cart/items/{item_id}/`

Remove a product from the shopping cart.

```bash
curl -X DELETE http://127.0.0.1:8000/api/store/cart/items/1/ \
  -H "Authorization: Bearer {access_token}"
```

**Response (200):**
```json
{
  "id": 1,
  "items": [],
  "total": "0.00"
}
```

---

## Orders

### List User Orders

**GET** `/orders/`

Retrieve all orders placed by the authenticated user.

**Headers:**
```
Authorization: Bearer {access_token}
```

```bash
curl -X GET http://127.0.0.1:8000/api/orders/ \
  -H "Authorization: Bearer {access_token}"
```

**Response (200):**
```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "full_name": "John Doe",
      "email": "john@example.com",
      "address": "123 Main St, Kathmandu",
      "phone": "+977-9841234567",
      "total": "799.98",
      "status": "pending",
      "created_at": "2026-04-04T10:30:00Z",
      "items": [
        {
          "id": 1,
          "product": 1,
          "product_name": "Ashwagandha Powder",
          "quantity": 2,
          "unit_price": "399.99"
        }
      ]
    }
  ]
}
```

### Get Order Details

**GET** `/orders/{id}/`

Retrieve detailed information about a specific order.

```bash
curl -X GET http://127.0.0.1:8000/api/orders/1/ \
  -H "Authorization: Bearer {access_token}"
```

**Response (200):**
```json
{
  "id": 1,
  "full_name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main St, Kathmandu",
  "phone": "+977-9841234567",
  "total": "799.98",
  "status": "pending",
  "created_at": "2026-04-04T10:30:00Z",
  "items": [
    {
      "id": 1,
      "product": 1,
      "product_name": "Ashwagandha Powder",
      "quantity": 2,
      "unit_price": "399.99"
    }
  ]
}
```

### Checkout (Create Order)

**POST** `/orders/checkout/`

Create a new order from the current user's shopping cart.

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

```bash
curl -X POST http://127.0.0.1:8000/api/orders/checkout/ \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name":"John Doe",
    "email":"john@example.com",
    "address":"123 Main St, Kathmandu",
    "phone":"+977-9841234567"
  }'
```

**Request Body:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main St, Kathmandu",
  "phone": "+977-9841234567"
}
```

**Response (201):**
```json
{
  "id": 1,
  "full_name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main St, Kathmandu",
  "phone": "+977-9841234567",
  "total": "799.98",
  "status": "pending",
  "created_at": "2026-04-04T10:30:00Z",
  "items": [
    {
      "id": 1,
      "product": 1,
      "product_name": "Ashwagandha Powder",
      "quantity": 2,
      "unit_price": "399.99"
    }
  ]
}
```

**Error (Cart Empty, 400):**
```json
{
  "non_field_errors": ["Cart is empty."]
}
```

---

## Error Responses

### 400 - Bad Request
Invalid request data or parameters.

```json
{
  "field_name": ["Error message"],
  "non_field_errors": ["General error message"]
}
```

### 401 - Unauthorized
Missing or invalid authentication token.

```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 404 - Not Found
Resource not found.

```json
{
  "detail": "Not found."
}
```

### 500 - Server Error
Unexpected server error.

```json
{
  "detail": "Internal server error"
}
```

---

## Integration Testing Flow

1. **Register User** (POST /auth/register/)
2. **Login User** (POST /auth/token/) → Get access token
3. **List Products** (GET /store/products/) → Browse available products
4. **Get Product Details** (GET /store/products/{id}/)
5. **Add to Cart** (POST /store/cart/items/) → Add 2-3 products
6. **View Cart** (GET /store/cart/) → Verify cart total
7. **Checkout** (POST /orders/checkout/) → Create order
8. **List Orders** (GET /orders/) → Verify order created
9. **Get Order Details** (GET /orders/{id}/) → Review order items

---

## Database Models

### User (Django Auth)
- id (Primary Key)
- username (unique)
- email (unique)
- first_name
- last_name
- password (hashed)

### Category
- id
- name (unique)
- slug (unique)

### Product
- id
- category (FK to Category)
- name
- slug (unique)
- description
- price (Decimal)
- stock (Integer)
- image_url (URL)
- featured (Boolean)
- is_active (Boolean)
- created_at (DateTime)

### Cart
- id
- user (OneToOne to User)
- updated_at

### CartItem
- id
- cart (FK to Cart)
- product (FK to Product)
- quantity
- unique_together: (cart, product)

### Order
- id
- user (FK to User)
- full_name
- email
- address
- phone
- total (Decimal)
- status (pending/paid/shipped/delivered/cancelled)
- created_at

### OrderItem
- id
- order (FK to Order)
- product (FK to Product)
- quantity
- unit_price (captured at purchase)

---

## Admin Interface

Access Django admin at: `http://127.0.0.1:8000/admin/`

**Superuser credentials:** (created via `python manage.py createsuperuser`)
- Username: admin
- Password: (set during setup)

Manage:
- Users and groups
- Products and categories
- Shopping carts
- Orders and order items
