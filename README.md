# NayePankh Volunteer Management System

![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)

A full-stack MERN volunteer registration and admin operations dashboard for NayePankh Foundation. It supports public volunteer intake, protected admin access, analytics, advanced volunteer management, image uploads, activity tracking, exports, and skill-based department recommendations.

## 🚀 Quick Links

- **Live Demo**: [Coming Soon]
- **Admin Panel**: [Coming Soon]
- **Documentation**: See sections below
- **License**: MIT

## ✨ Key Features

### Public Features
- ✅ **Step-by-Step Registration** - Multi-step form with progress indicator, real-time validation, and profile image preview
- ✅ **Skill-Based Recommendations** - Automatic department suggestion based on volunteer's primary skill
- ✅ **Image Upload** - Profile picture upload with Cloudinary integration
- ✅ **Email Notifications** - Welcome emails sent upon successful registration
- ✅ **Responsive Design** - Mobile and desktop optimized interface

### Admin Features
- ✅ **Protected Dashboard** - JWT-secured admin access with login page
- ✅ **Analytics & Insights** - Real-time charts showing volunteer stats, city distribution, skill breakdown
- ✅ **Advanced Volunteer Management** - Search, filter (by city/skill/status), sort, and paginate volunteers
- ✅ **Volunteer Profiles** - Detailed drawer with contact info, skills, activities, and recommended departments
- ✅ **Edit & Delete** - Modify volunteer information with confirmation dialogs
- ✅ **Activity Logs** - Track all changes: volunteer registrations, updates, deletions, admin logins
- ✅ **Data Export** - Export volunteer data to PDF or CSV format
- ✅ **Responsive Admin UI** - Mobile and desktop optimized dashboard

### Technical Features
- ✅ **Zod Validation** - Comprehensive input validation on backend
- ✅ **Rate Limiting** - Protect endpoints with intelligent rate limiting
- ✅ **Security Headers** - Helmet.js for enhanced security
- ✅ **Error Handling** - Centralized error management and user-friendly error messages
- ✅ **Database Integrity** - Mongoose validation and duplicate email handling
- ✅ **Activity Tracking** - Complete audit trail of all operations
- ✅ **Health Checks** - Monitor API and database connectivity
- ✅ **Demo Data** - Pre-populated sample data for evaluation

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Chart components for analytics
- **Lucide React** - Icon library
- **React Toastify** - Notification system
- **jsPDF** - PDF export
- **Axios** - HTTP client
- **ESLint** - Code quality

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM library
- **JWT** - Authentication
- **Zod** - Type validation
- **Helmet** - Security headers
- **Multer** - File upload middleware
- **Nodemailer** - Email service
- **Cloudinary** - Image storage
- **json2csv** - Data export

### Infrastructure & Services
- **MongoDB Atlas** - Cloud database
- **Cloudinary** - Image hosting
- **Nodemailer + Gmail** - Email notifications
- **Render/Heroku/DigitalOcean** - Deployment options

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MongoDB Atlas account (cloud) or local MongoDB
- Cloudinary account (free tier)
- Gmail account (for email notifications, optional)

## ⚙️ Environment Setup

### Backend Configuration

1. **Create `.env` file** in `server/` directory:

```bash
cp server/.env.example server/.env
```

2. **Fill in the environment variables**:

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nayepankh-vms

# JWT
JWT_SECRET=your-generated-secret-key-here
JWT_EXPIRES_IN=7d

# Frontend
CLIENT_URL=https://your-frontend-domain.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=NayePankh Foundation <your-email@gmail.com>

# Admin Credentials
ADMIN_EMAIL=admin@nayepankh.org
ADMIN_PASSWORD=secure-password-min-8-chars
```

### Frontend Configuration

Create `.env` in `client/` directory:

```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

## 🚀 Deployment Guide

### Option 1: Deploy to Render (Recommended)

**Backend Deployment:**
1. Push code to GitHub
2. Sign up at [Render.com](https://render.com)
3. Create New → Web Service
4. Connect GitHub repository
5. Set environment variables in Render dashboard
6. Deploy

**Frontend Deployment (Vercel):**
1. Sign up at [Vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set `VITE_API_BASE_URL` to your Render backend URL
4. Deploy automatically on push

### Option 2: Deploy to DigitalOcean

**Backend:**
1. Create App Platform → Create App
2. Connect GitHub repo
3. Set environment variables
4. Deploy

**Frontend:**
1. Build: `npm run build`
2. Deploy built files to DigitalOcean App Platform

### Option 3: Manual Deployment

**Backend:**
```bash
cd server
npm install
npm run build  # if needed
npm start
```

**Frontend:**
```bash
cd client
npm install
npm run build
# Serve 'dist' folder using nginx or your web server
```

## 💻 Local Development

### Install & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/nayepankh-vms.git
cd nayepankh-vms

# Backend setup
cd server
npm install
cp .env.example .env  # Configure environment variables
npm run seed:admin    # Create admin account
npm run seed:demo     # Load demo data
npm run dev          # Start server on http://localhost:5000

# In a new terminal - Frontend setup
cd client
npm install
npm run dev          # Start frontend on http://localhost:5173
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/login
- **API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Volunteers
- `GET /api/volunteers` - List volunteers with filters
- `POST /api/volunteers` - Register new volunteer
- `PUT /api/volunteers/:id` - Update volunteer
- `DELETE /api/volunteers/:id` - Delete volunteer
- `GET /api/volunteers/:id/activity` - Get volunteer activity

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/activity-logs` - Get activity logs

### Exports
- `POST /api/exports/pdf` - Export volunteers to PDF
- `POST /api/exports/csv` - Export volunteers to CSV

## 🎨 Screenshots

### Desktop Views

<p>
  <img src="./docs/screenshots/home-desktop.png" alt="Home desktop" width="320" />
  <img src="./docs/screenshots/register-desktop.png" alt="Registration desktop" width="320" />
  <img src="./docs/screenshots/login-desktop.png" alt="Admin login desktop" width="320" />
  <img src="./docs/screenshots/dashboard-desktop.png" alt="Admin dashboard desktop" width="320" />
  <img src="./docs/screenshots/volunteers-desktop.png" alt="Volunteers table desktop" width="320" />
</p>

### Mobile Views

<p>
  <img src="./docs/screenshots/home-mobile.png" alt="Home mobile" width="140" />
  <img src="./docs/screenshots/register-mobile.png" alt="Registration mobile" width="140" />
  <img src="./docs/screenshots/login-mobile.png" alt="Admin login mobile" width="140" />
  <img src="./docs/screenshots/dashboard-mobile.png" alt="Admin dashboard mobile" width="140" />
  <img src="./docs/screenshots/volunteers-mobile.png" alt="Volunteers table mobile" width="140" />
</p>

## 📁 Folder Structure

```
nayepankh-vms/
├── client/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── pages/               # Page components
│   │   ├── context/             # React context (Auth, Theme)
│   │   ├── services/            # API service layer
│   │   ├── utils/               # Helper functions
│   │   ├── styles/              # CSS files
│   │   ├── App.jsx              # Main component
│   │   └── main.jsx             # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
│
├── server/
│   ├── config/                  # Configuration files
│   ├── controllers/             # Route logic
│   ├── middleware/              # Express middleware
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # API routes
│   ├── seed/                    # Database seeders
│   ├── utils/                   # Helper functions
│   ├── server.js                # Entry point
│   ├── package.json
│   └── .env.example
│
├── scripts/                     # Utility scripts
├── LICENSE                      # MIT License
└── README.md
```

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcryptjs for secure password storage
- ✅ **Rate Limiting** - Prevent brute force attacks
- ✅ **Security Headers** - Helmet.js protection
- ✅ **CORS** - Restricted cross-origin requests
- ✅ **Input Validation** - Zod schema validation
- ✅ **Error Masking** - Generic error messages to users
- ✅ **Activity Logging** - Complete audit trail

## 📊 Database Schema

### Admin Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String,
  createdAt: Date
}
```

### Volunteer Model
```javascript
{
  fullName: String,
  email: String (unique),
  phone: String,
  city: String,
  skills: [String],
  profileImage: { url, publicId },
  recommendedDepartment: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### ActivityLog Model
```javascript
{
  action: String,
  volunteer: ObjectId (ref: Volunteer),
  metadata: Object,
  createdAt: Date
}
```

## ✅ Verification Checklist

- [x] All dependencies installed and running
- [x] Database connected and seeded
- [x] Authentication working (admin login)
- [x] Volunteer registration functional
- [x] Image upload to Cloudinary working
- [x] Email notifications configured
- [x] Admin dashboard displaying data
- [x] Search/filter/sort working
- [x] Export (PDF/CSV) functional
- [x] Activity logs tracking changes
- [x] Responsive design verified
- [x] Error handling in place
- [x] Rate limiting active
- [x] Security headers enabled
- [x] Code documented with comments

## 🐛 Troubleshooting

### Common Issues

**Frontend won't connect to backend:**
- Check `VITE_API_BASE_URL` environment variable
- Verify backend is running on correct port
- Check CORS configuration in `server/server.js`

**Images not uploading:**
- Verify Cloudinary credentials in `.env`
- Check file size limits in Multer config
- Ensure proper image format

**Email not sending:**
- Verify Gmail App Password (not regular password)
- Check SMTP settings
- Review email configuration in `.env`

**Database connection errors:**
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Ensure correct database name

## 📝 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 👥 Contributors

- Project developed as an internship project for NayePankh Foundation
- Full-stack implementation with React and Node.js

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review error logs in browser console and server terminal
3. Check MongoDB Atlas and Cloudinary dashboards

## 🎯 Future Enhancements

- [ ] Dark mode theme
- [ ] Multi-language support (Hindi/English)
- [ ] Advanced analytics with date range filtering
- [ ] Bulk operations (import/export multiple)
- [ ] Email template customization
- [ ] SMS notifications
- [ ] Mobile app (React Native)
- [ ] Volunteer dashboard/portal
- [ ] Advanced reporting and metrics

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready ✅


Build note: Vite may warn that one JavaScript chunk is larger than 500 kB because of report/export libraries. The build still succeeds.

## API Routes

```txt
GET    /api/health

POST   /api/auth/login

POST   /api/volunteers
GET    /api/volunteers
GET    /api/volunteers/:id/activity
PUT    /api/volunteers/:id
DELETE /api/volunteers/:id

GET    /api/dashboard/stats
GET    /api/dashboard/activity-logs

GET    /api/exports/volunteers/csv
```

Protected admin routes require:

```txt
Authorization: Bearer <jwt_token>
```

## Useful Scripts

Backend:

```bash
npm run dev
npm start
npm run seed:admin
npm run seed:demo
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Submission Checklist

- Add deployed frontend and backend links
- Add final admin/dashboard screenshots
- Seed demo volunteers with `npm run seed:demo`
- Share sample admin credentials privately, not in the repository
- Commit `client/package-lock.json` and `server/package-lock.json`
- Run `npm run build` inside `client` before submission
