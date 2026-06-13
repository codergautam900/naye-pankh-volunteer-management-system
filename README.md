# NayePankh Volunteer Management System

MERN stack project structure for a volunteer registration and admin management system.

## Tech Stack

- React
- Tailwind CSS
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

## Main Modules

- Volunteer registration
- Admin login
- Protected admin dashboard
- Volunteer search, filter, update, delete, and pagination
- Charts and analytics
- CSV and PDF export
- Email notifications
- Profile image upload
- Activity logs
- AI volunteer recommendation
- Dark mode and toast notifications

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
  utils/
```

## Run Locally

Install dependencies separately in both apps.

Create `server/.env` from `server/.env.example` and fill in MongoDB, JWT, Cloudinary, and admin credentials before starting the backend.

```bash
cd server
npm install
npm run seed:admin
npm run dev
```

```bash
cd client
npm install
npm run dev
```

Admin access is created from the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values in `server/.env`. Demo credentials should be shared privately for evaluation and should not be committed to the repository.
