# NayePankh Volunteer Management System

A full-stack MERN volunteer registration and admin operations dashboard for NayePankh Foundation. It supports public volunteer intake, protected admin access, analytics, advanced volunteer management, image uploads, activity tracking, exports, and skill-based department recommendations.

## Deployment

- Frontend: `Add deployed frontend URL here`
- Backend API: `Add deployed backend URL here`
- Health Check: `Add deployed backend URL here/api/health`

## Demo Access

Admin access is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env`.

For evaluation, share credentials privately in the submission note:

```txt
Admin URL: <deployed-frontend>/login
Email: <private-admin-email>
Password: <private-admin-password>
```

Do not commit real `.env` files or passwords.

## Features

- Public step-by-step volunteer registration with progress indicator, profile image preview, validation feedback, and success screen
- Skill-based department recommendation for Education, Technical, Marketing, Awareness, and Volunteer Support teams
- Protected admin dashboard with analytics cards for total volunteers, active volunteers, cities, skills, activation rate, top city, top skill, recent volunteers, charts, and activity logs
- Advanced volunteer table with search, city/skill/status filters, sorting, pagination, status badges, export actions, and row action menu
- Volunteer profile drawer with image, contact details, skills, recommended department, timestamps, and activity timeline
- Edit and delete flows with toast notifications and confirmation modal
- Skeleton loaders, empty states, and error states across admin pages
- Responsive admin UI optimized for mobile and desktop
- Backend Zod validation, duplicate email handling, upload validation, Cloudinary cleanup, secure headers with Helmet, rate limiting, and health check API
- Activity logs for create, update, delete, and admin login actions
- Demo seed data so the dashboard is not empty during evaluation

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Recharts, Lucide React, React Toastify, jsPDF
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Zod, Helmet, Express Rate Limit, Multer
- Services: Cloudinary image storage, Nodemailer email notifications

## Screenshots

Add or replace screenshots before final submission.

| View | Screenshot |
| --- | --- |
| Home Desktop | `client/home-desktop.png` |
| Home Mobile | `client/home-mobile.png` |
| Register Mobile | `client/register-mobile.png` |
| Admin Dashboard | `Add admin dashboard screenshot path` |
| Volunteers Table | `Add volunteers table screenshot path` |

## Folder Structure

```txt
client/
  src/
    components/
    context/
    pages/
    services/
    utils/
server/
  config/
  controllers/
  middleware/
  models/
  routes/
  seed/
  utils/
```

## Environment Variables

Create `server/.env` from `server/.env.example`.

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nayepankh-vms
JWT_SECRET=replace_with_a_strong_jwt_secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_strong_admin_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=NayePankh Foundation <your_email@gmail.com>
CLIENT_URL=http://localhost:5173
```

Create `client/.env` from `client/.env.example`.

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Email variables are optional for local testing. If they are not set, registration still works and the email send is skipped.

## Run Locally

Install backend dependencies and seed the database.

```bash
cd server
npm install
npm run seed:admin
npm run seed:demo
npm run dev
```

Install frontend dependencies and start Vite.

```bash
cd client
npm install
npm run dev
```

Open:

```txt
Frontend: http://localhost:5173
Backend:  http://localhost:5000
Health:   http://localhost:5000/api/health
```

## Production Build

```bash
cd client
npm run build
```

The latest local verification completed successfully:

```txt
client npm run lint
client npm run build
server module/route import checks
```

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
