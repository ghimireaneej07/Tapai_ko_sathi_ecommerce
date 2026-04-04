# Environment Variables Documentation

This document explains all environment variables needed for local development and production.

## Backend (.env in `backend/` folder)

### Django Configuration

| Variable | Value | Description |
|----------|-------|-------------|
| `DEBUG` | `True` (local) / `False` (prod) | Django debug mode - NEVER True in production |
| `SECRET_KEY` | Random string | Django secret key - generate with `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'` |
| `ALLOWED_HOSTS` | `127.0.0.1,localhost` (local) / domain (prod) | Comma-separated list of allowed hostnames |

### Database Configuration

| Variable | Value | Description |
|----------|-------|-------------|
| `DB_ENGINE` | `django.db.backends.mysql` | Database backend (MySQL) |
| `DB_NAME` | `tapai_ko_sathi` | MySQL database name |
| `DB_USER` | `root` (local) / `dbuser` (prod) | MySQL username |
| `DB_PASSWORD` | Your password | MySQL password - NEVER commit to git |
| `DB_HOST` | `127.0.0.1` (local) / RDS endpoint (prod) | MySQL server hostname/IP |
| `DB_PORT` | `3306` | MySQL port (default: 3306) |

### CORS Configuration

| Variable | Value | Description |
|----------|-------|-------------|
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173` (local) / `https://domain.com` (prod) | Comma-separated frontend URLs allowed to call API |

### Example .env File (Local Development)

```bash
# Django
DEBUG=True
SECRET_KEY=django-insecure-your-secret-key-here
ALLOWED_HOSTS=127.0.0.1,localhost

# Database
DB_ENGINE=django.db.backends.mysql
DB_NAME=tapai_ko_sathi
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=127.0.0.1
DB_PORT=3306

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### Example .env File (Production - Railway)

```bash
# Django
DEBUG=False
SECRET_KEY=your-production-secret-key
ALLOWED_HOSTS=your-app.railway.app,www.your-app.railway.app

# Database (Railway PostgreSQL addon)
DB_ENGINE=django.db.backends.postgresql
DB_NAME=railway_database
DB_USER=postgres
DB_PASSWORD=your_railway_password
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=https://your-domain.vercel.app
```

---

## Frontend (.env in `frontend/` folder)

### API Configuration

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `http://127.0.0.1:8000/api` (local) / `https://api.domain.com/api` (prod) | Backend API base URL |

### Example .env File (Local Development)

```bash
# API
VITE_API_URL=http://127.0.0.1:8000/api
```

### Example .env File (Production - Vercel)

```bash
# API
VITE_API_URL=https://your-backend.railway.app/api
```

---

## Environment Hierarchy

### Local Development
1. Create `backend/.env` and `frontend/.env` from `.env.example` files
2. Set local/test values (localhost URLs, test database)
3. **Never commit** actual .env files to git

### Staging
1. Copy local .env templates
2. Use staging database credentials
3. Point to staging API endpoints

### Production
1. Create production .env files on deployment platform
2. Use strong, unique SECRET_KEY
3. Set DEBUG=False
4. Use production database credentials (managed by hosting platform)
5. Set CORS to production frontend domain only

---

## Security Considerations

### Backend
- ❌ **Never** hardcode secrets in code
- ❌ **Never** commit .env files to git
- ✅ Use strong SECRET_KEY (generate new for production)
- ✅ Set DEBUG=False in production
- ✅ Use environment variables for all sensitive data
- ✅ Add .env to .gitignore

### Frontend
- ❌ **Never** expose API keys or secrets in frontend code
- ✅ Keep VITE_API_URL in .env (won't be exposed in build)
- ✅ Build files don't contain secrets

---

## Local Setup (Step-by-Step)

### 1. Backend Setup

```bash
cd backend

# Copy template
cp .env.example .env

# Edit .env with your local MySQL password
# DB_PASSWORD=your_password

# Install dependencies
pip install -r requirements.txt

# Create database
mysql -u root -p
> CREATE DATABASE tapai_ko_sathi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
> exit

# Run migrations
python manage.py migrate

# Seed data
python manage.py seed_products

# Create admin user
python manage.py createsuperuser

# Start server
python manage.py runserver
# Now on: http://127.0.0.1:8000
```

### 2. Frontend Setup

```bash
cd frontend

# Copy template (optional, defaults work)
cp .env.example .env

# Install dependencies
npm install

# Start dev server
npm run dev
# Now on: http://localhost:5173
```

---

## Environment Variables in Code

### Reading from .env (Python)

```python
import os
from dotenv import load_dotenv

load_dotenv()

# Read variables
debug = os.getenv("DEBUG", "False").lower() == "true"
db_name = os.getenv("DB_NAME", "tapai_ko_sathi")
secret_key = os.getenv("SECRET_KEY", "change-me")
```

### Reading from .env (JavaScript)

```javascript
// Vite automatically loads from .env
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl); // http://127.0.0.1:8000/api
```

---

## Production Deployment (Railway + Vercel)

### Railway Backend Setup

1. Connect GitHub repository
2. Create New Service → Select repository
3. Add MySQL addon
4. Go to Variables tab:
   - Set `DEBUG=False`
   - Set `SECRET_KEY=your_production_key`
   - Set `ALLOWED_HOSTS=your-app.railway.app`
   - Set `CORS_ALLOWED_ORIGINS=https://frontend.vercel.app`
5. Database variables auto-filled by MySQL addon
6. Deploy

### Vercel Frontend Setup

1. Connect GitHub repository
2. Framework: Vite
3. Build command: `npm run build`
4. Environment Variables:
   - `VITE_API_URL=https://your-backend.railway.app/api`
5. Deploy

### Verify Deployment

```bash
# Test backend
curl https://your-backend.railway.app/api/store/products/

# Test frontend
# Visit https://your-frontend.vercel.app in browser
```

---

## Troubleshooting

### Error: ModuleNotFoundError: No module named 'dotenv'

**Solution:** Install python-dotenv
```bash
pip install python-dotenv
```

### Error: "Debug is set to False but SECRET_KEY is not set"

**Solution:** Set SECRET_KEY in environment
```bash
export SECRET_KEY="your-secret-key-here"
# or in .env
SECRET_KEY=your-secret-key-here
```

### Error: "Cannot find module 'dotenv'"

**Solution:** Install dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Error: "CORS error: Backend URL not in allowed origins"

**Solution:** Update CORS_ALLOWED_ORIGINS in .env
```
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### Error: "ValidationError: SECRET_KEY not loaded"

**Solution:** Ensure .env file exists and is readable
```bash
# Check file exists
cat backend/.env

# Restart server if .env was just created
python manage.py runserver
```

---

## Environment Variables Checklist

### Before Running Locally
- [ ] Create `backend/.env` from `.env.example`
- [ ] Set `DB_PASSWORD` in backend/.env
- [ ] Create `frontend/.env` (optional, defaults work)
- [ ] MySQL database created
- [ ] Migrations run: `python manage.py migrate`
- [ ] Backend starts: `python manage.py runserver`
- [ ] Frontend starts: `npm run dev`

### Before Deploying to Production
- [ ] `DEBUG=False` set
- [ ] `SECRET_KEY` is strong and unique
- [ ] `ALLOWED_HOSTS` includes production domain
- [ ] `CORS_ALLOWED_ORIGINS` includes frontend URL only
- [ ] Database credentials are strong
- [ ] No secrets hardcoded in source code
- [ ] .env file is NOT in git (check .gitignore)

---

## Reference

- Django .env documentation: https://django-environ.readthedocs.io/
- Vite .env documentation: https://vitejs.dev/guide/env-and-modes.html
- Python-dotenv: https://github.com/theskumar/python-dotenv
