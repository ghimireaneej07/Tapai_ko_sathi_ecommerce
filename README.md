# Tapai Ko Sathi - Full Stack Website

This project turns your Stitch project `10286869643235150374` into a real implementation with:

- Frontend: React + Tailwind + Vite
- Backend: Django + Django REST Framework
- Auth: JWT (Simple JWT)
- Database: MySQL

## Project Structure

- `backend/` Django API
- `frontend/` React app

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

- `POST /api/auth/token/`
- `POST /api/auth/token/refresh/`
- `POST /api/auth/register/`
- `GET /api/auth/me/`

## 2) Frontend Setup (React + Tailwind)

1. Configure frontend env:
   - copy `frontend/.env.example` to `frontend/.env`
2. Install and run:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

Frontend URL: `http://localhost:5173`

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
