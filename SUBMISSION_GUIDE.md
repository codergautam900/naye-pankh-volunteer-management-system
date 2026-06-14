# SUBMISSION_GUIDE.md - How to Use This Project

Complete guide for evaluators and deployers to understand and use the NayePankh Volunteer Management System.

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)

### Local Setup

```bash
# 1. Clone and navigate
cd nayepankh-vms

# 2. Backend setup
cd server
npm install
# Edit .env with your credentials
npm run seed:admin    # Create admin account
npm run seed:demo     # Load demo data
npm run dev           # Start server

# 3. Frontend setup (new terminal)
cd client
npm install
npm run dev           # Start frontend

# 4. Access
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
# Admin: http://localhost:5173/login
```

---

## 📖 User Workflows

### Workflow 1: Register as Volunteer (Public)

1. Go to home page: `http://localhost:5173`
2. Click "Register" button
3. Enter details:
   - Full Name
   - Email
   - Phone
   - City
   - Select Skills (auto-recommends department)
   - Upload profile picture
4. Click "Submit"
5. See success screen with thank you message

### Workflow 2: Login as Admin

1. Go to `http://localhost:5173/login`
2. Enter credentials:
   - Email: `admin@nayepankh.org` (from seed)
   - Password: `admin12345` (from seed)
3. Click "Login"
4. Redirected to admin dashboard

### Workflow 3: Admin Dashboard (Analytics)

1. View dashboard with analytics:
   - Total Volunteers card
   - Active Volunteers count
   - Cities coverage
   - Skills breakdown
   - Charts with visualizations
   - Recent volunteers list
   - Activity logs

### Workflow 4: Manage Volunteers

1. Go to "Volunteers" tab in admin panel
2. Use search box to find volunteers
3. Apply filters:
   - By City
   - By Skill
   - By Status (Active/Inactive)
4. Sort by:
   - Latest/Oldest
   - Name
   - City
5. Click volunteer row to see details drawer
6. Edit: Click edit icon, modify, save
7. Delete: Click delete icon, confirm
8. Export: Click export, choose PDF or CSV

### Workflow 5: Activity Logs

1. Go to "Dashboard" tab
2. Scroll down to "Recent Activity"
3. View all actions:
   - Volunteer registered
   - Admin login
   - Volunteer updated
   - Volunteer deleted

---

## 📁 Project Structure Guide

```
nayepankh-vms/
│
├── 📄 README.md
│   └── Main documentation (start here!)
│
├── 📄 DEPLOYMENT.md
│   └── Deploy to production (Render, Vercel, AWS, etc.)
│
├── 📄 PRODUCTION_CHECKLIST.md
│   └── What's included and verified
│
├── 📄 LICENSE
│   └── MIT License
│
├── client/ (React Frontend)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              ← Top navigation
│   │   │   ├── DashboardLayout.jsx     ← Admin layout
│   │   │   ├── ProtectedRoute.jsx      ← Auth guard
│   │   │   ├── VolunteerTable.jsx      ← Search/filter/pagination
│   │   │   ├── EditVolunteerModal.jsx  ← Edit form
│   │   │   ├── VolunteerProfileDrawer.jsx ← Details view
│   │   │   ├── DashboardCharts.jsx     ← Analytics charts
│   │   │   └── ... (other components)
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx        ← Landing page
│   │   │   ├── Register.jsx    ← Multi-step registration
│   │   │   ├── Login.jsx       ← Admin login
│   │   │   ├── Dashboard.jsx   ← Admin dashboard
│   │   │   ├── Volunteers.jsx  ← Volunteer management
│   │   │   └── NotFound.jsx    ← 404 page
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   ← Auth state
│   │   │   └── ThemeContext.jsx  ← Theme state
│   │   │
│   │   ├── services/
│   │   │   ├── api.js               ← Axios instance
│   │   │   ├── authService.js       ← Auth API calls
│   │   │   ├── volunteerService.js  ← Volunteer CRUD
│   │   │   ├── dashboardService.js  ← Analytics data
│   │   │   └── exportService.js     ← PDF/CSV export
│   │   │
│   │   ├── utils/
│   │   │   └── constants.js  ← Shared constants
│   │   │
│   │   └── App.jsx → main.jsx
│   │
│   └── vite.config.js, tailwind.config.js
│
├── server/ (Node.js Backend)
│   ├── config/
│   │   ├── db.js          ← MongoDB connection
│   │   └── cloudinary.js  ← Image storage config
│   │
│   ├── controllers/
│   │   ├── authController.js        ← Login logic
│   │   ├── volunteerController.js   ← CRUD operations
│   │   ├── dashboardController.js   ← Analytics
│   │   └── exportController.js      ← PDF/CSV export
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js     ← JWT verification
│   │   ├── errorMiddleware.js    ← Error handling
│   │   ├── securityMiddleware.js ← Headers + rate limit
│   │   ├── uploadMiddleware.js   ← Image validation
│   │   └── validationMiddleware.js ← Input validation
│   │
│   ├── models/
│   │   ├── Admin.js       ← Admin schema
│   │   ├── Volunteer.js   ← Volunteer schema
│   │   └── ActivityLog.js ← Activity logging schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js       ← /api/auth
│   │   ├── volunteerRoutes.js  ← /api/volunteers
│   │   ├── dashboardRoutes.js  ← /api/dashboard
│   │   └── exportRoutes.js     ← /api/exports
│   │
│   ├── seed/
│   │   ├── adminSeed.js  ← Create admin account
│   │   └── demoSeed.js   ← Load demo data
│   │
│   ├── utils/
│   │   ├── generateToken.js      ← JWT generation
│   │   ├── uploadToCloudinary.js ← Image upload
│   │   ├── deleteFromCloudinary.js ← Image delete
│   │   ├── sendEmail.js          ← Email service
│   │   └── recommendDepartment.js ← Skill → Department
│   │
│   ├── server.js    ← Entry point
│   ├── .env.example ← Configuration template
│   └── package.json
│
└── scripts/
    └── capture-screenshots.mjs ← Screenshot utility
```

---

## 🔑 Key Files to Review

### Frontend Entry Points
- **[client/src/App.jsx](../client/src/App.jsx)** - Routes and layout
- **[client/src/pages/Register.jsx](../client/src/pages/Register.jsx)** - Registration form
- **[client/src/pages/Dashboard.jsx](../client/src/pages/Dashboard.jsx)** - Admin dashboard

### Backend Entry Points
- **[server/server.js](../server/server.js)** - Main server with comments
- **[server/controllers/volunteerController.js](../server/controllers/volunteerController.js)** - Business logic
- **[server/controllers/authController.js](../server/controllers/authController.js)** - Authentication

### Important Features
- **Search/Filter**: [client/src/components/VolunteerTable.jsx](../client/src/components/VolunteerTable.jsx)
- **Charts**: [client/src/components/DashboardCharts.jsx](../client/src/components/DashboardCharts.jsx)
- **Export**: [server/controllers/exportController.js](../server/controllers/exportController.js)
- **Image Upload**: [server/utils/uploadToCloudinary.js](../server/utils/uploadToCloudinary.js)

---

## 🌐 API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-api.com/api`

### Authentication Endpoints

```bash
# Admin Login
POST /auth/login
Content-Type: application/json

{
  "email": "admin@nayepankh.org",
  "password": "admin12345"
}

Response:
{
  "token": "eyJhbGc...",
  "admin": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "admin"
  }
}
```

### Volunteer Endpoints

```bash
# Register Volunteer
POST /volunteers
Content-Type: multipart/form-data

Form Data:
- fullName: "John Doe"
- email: "john@example.com"
- phone: "9876543210"
- city: "Delhi"
- skills: ["Teaching", "IT Support"]
- profileImage: <file>

---

# Get Volunteers (with filters)
GET /volunteers?search=john&city=Delhi&skill=Teaching&status=active&sort=latest&page=1&limit=8

Query Parameters:
- search: Search in name/email
- city: Filter by city
- skill: Filter by skill
- status: active/inactive
- sort: latest/oldest/name/city
- page: Page number
- limit: Results per page (max 50)

Response:
{
  "volunteers": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 7
  }
}

---

# Update Volunteer
PUT /volunteers/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Doe Updated",
  "phone": "9876543210"
}

---

# Delete Volunteer
DELETE /volunteers/:id
Authorization: Bearer <token>

---

# Get Volunteer Activity
GET /volunteers/:id/activity
Authorization: Bearer <token>
```

### Dashboard Endpoints

```bash
# Get Statistics
GET /dashboard/stats
Authorization: Bearer <token>

Response:
{
  "totalVolunteers": 50,
  "activeVolunteers": 45,
  "totalCities": 10,
  "totalSkills": 8,
  "activationRate": 90,
  "topCity": "Delhi",
  "topSkill": "Teaching",
  "recentVolunteers": [...],
  "chartData": {...}
}

---

# Get Activity Logs
GET /dashboard/activity-logs
Authorization: Bearer <token>
```

### Export Endpoints

```bash
# Export to PDF
POST /exports/pdf
Authorization: Bearer <token>
Content-Type: application/json

{
  "volunteers": [...]
}

Response: PDF file

---

# Export to CSV
POST /exports/csv
Authorization: Bearer <token>
Content-Type: application/json

{
  "volunteers": [...]
}

Response: CSV file
```

### Health Check

```bash
# Health Status
GET /health

Response:
{
  "status": "ok",
  "uptime": 3600,
  "database": "connected",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

---

## 🔐 Authentication & Authorization

### Protected Routes

**Frontend Protected Routes:**
- `/admin` - Requires login token
- `/admin/volunteers` - Requires login token

**Backend Protected Endpoints:**
- PUT `/api/volunteers/:id` - Requires JWT
- DELETE `/api/volunteers/:id` - Requires JWT
- GET `/api/volunteers/:id/activity` - Requires JWT
- GET `/api/dashboard/*` - Requires JWT
- POST `/api/exports/*` - Requires JWT

### How JWT Works

1. User logs in → Server returns JWT token
2. Token stored in localStorage as `nayepankh_token`
3. Token sent in Authorization header for protected requests
4. Server validates token
5. If valid → Request proceeds
6. If invalid → Returns 401 Unauthorized

---

## 🚀 Deployment Quick Reference

### Render (Backend)

```bash
# Variables to set:
PORT=5000
NODE_ENV=production
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<strong-random-secret>
CLIENT_URL=https://your-frontend.vercel.app
CLOUDINARY_CLOUD_NAME=<your-value>
CLOUDINARY_API_KEY=<your-value>
CLOUDINARY_API_SECRET=<your-value>
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your-email>
EMAIL_PASS=<app-password>
EMAIL_FROM=NayePankh <your-email>
ADMIN_EMAIL=admin@nayepankh.org
ADMIN_PASSWORD=<strong-password>
```

### Vercel (Frontend)

```bash
# Variables to set:
VITE_API_BASE_URL=https://nayepankh-api.onrender.com/api
```

See DEPLOYMENT.md for detailed guides!

---

## 🛠️ Environment Variables

### Backend (.env)

Required variables in `server/.env`:

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# JWT
JWT_SECRET=your-secret-min-32-chars
JWT_EXPIRES_IN=7d

# Frontend (CORS)
CLIENT_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=NayePankh <your-email@gmail.com>

# Admin
ADMIN_EMAIL=admin@nayepankh.org
ADMIN_PASSWORD=admin12345
```

### Frontend (.env)

Required variables in `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Check Node.js version
node --version  # Should be v18+

# Check port 5000 is free
lsof -i :5000

# Check dependencies
npm install
npm start
```

### Frontend won't load
```bash
# Check VITE_API_BASE_URL
echo $VITE_API_BASE_URL

# Rebuild
npm run build
npm run dev
```

### Can't login as admin
```bash
# Reset admin credentials
cd server
npm run seed:admin
# Then login with credentials from .env
```

### Images not uploading
```bash
# Check Cloudinary credentials
# Visit dashboard.cloudinary.com

# Check Multer config accepts files
# Restart server
npm run dev
```

### Database connection fails
```bash
# Check MongoDB Atlas
# 1. IP whitelist (add your IP)
# 2. Connection string format
# 3. Database name exists

# Test locally
mongo "mongodb+srv://user:pass@cluster.mongodb.net/db"
```

---

## 📊 Demo Data

The `npm run seed:demo` command creates:

- **5 Admin Users** (for testing)
- **50 Volunteer Records** with:
  - Diverse names and emails
  - Multiple cities (Delhi, Mumbai, Bangalore, etc.)
  - Different skills and departments
  - Profile images
  - Mix of active/inactive status
- **Sample Activity Logs**

This ensures the dashboard isn't empty during evaluation!

---

## ✅ Testing Checklist

Before deploying, verify:

- [ ] Home page loads
- [ ] Registration form works
- [ ] Can upload profile image
- [ ] Admin login works
- [ ] Dashboard displays analytics
- [ ] Can search volunteers
- [ ] Filters work (city, skill, status)
- [ ] Can sort and paginate
- [ ] Can edit volunteer details
- [ ] Can delete volunteer
- [ ] Can export to PDF
- [ ] Can export to CSV
- [ ] Activity logs show changes
- [ ] Error messages are helpful
- [ ] Mobile view is responsive

---

## 🎯 Submission Files

When submitting, include:

```
📦 nayepankh-vms/
 ├── 📄 README.md (complete documentation)
 ├── 📄 DEPLOYMENT.md (deployment guide)
 ├── 📄 PRODUCTION_CHECKLIST.md (what's verified)
 ├── 📄 SUBMISSION_GUIDE.md (this file)
 ├── 📄 LICENSE (MIT License)
 ├── 📁 client/ (React frontend - ready to deploy)
 ├── 📁 server/ (Node.js backend - ready to deploy)
 └── 📁 scripts/ (utility scripts)
```

---

## 👥 Support

**For Issues:**
1. Check README.md troubleshooting
2. Check browser console for frontend errors
3. Check server logs: `npm run dev` output
4. Check MongoDB Atlas dashboard
5. Check Cloudinary dashboard

**For Questions:**
- See this SUBMISSION_GUIDE.md
- See README.md
- See DEPLOYMENT.md
- See code comments in key files

---

## 📞 Quick Links

- **Main Docs**: See README.md
- **Deployment**: See DEPLOYMENT.md
- **Production Checklist**: See PRODUCTION_CHECKLIST.md
- **API Docs**: Above in this guide
- **Local Dev**: Follow "Quick Start" section above

---

**Ready to deploy!** 🚀

Choose deployment option from DEPLOYMENT.md and follow step-by-step.

Questions? Check the guides above or review the code comments!
