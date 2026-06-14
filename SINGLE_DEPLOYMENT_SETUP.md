# SINGLE_DEPLOYMENT_SETUP.md - One Link, Everything Works!

## 🎯 What is This?

This setup allows you to deploy **both frontend and backend from a single URL**!

Instead of:
- Frontend: https://your-app.vercel.app
- Backend: https://your-api.onrender.com

You get:
- **Everything**: https://your-app.onrender.com ✅

---

## 📋 How It Works

1. **Frontend is built** to static HTML/JS/CSS files
2. **Backend serves these files** as static content
3. **API routes** are still available at `/api/*`
4. React Router handles all frontend routing
5. **One URL does everything!**

---

## 🚀 Setup Steps

### Step 1: Build Frontend

```bash
cd client
npm run build
```

This creates `client/dist` folder with all production files.

### Step 2: Verify Folder Structure

```
nayapankh-vms/
├── client/
│   ├── dist/              ← Frontend build (created in step 1)
│   ├── src/
│   ├── .env               ← VITE_API_BASE_URL=/api
│   └── package.json
│
├── server/
│   ├── server.js          ← Updated to serve frontend
│   ├── package.json
│   ├── .env               ← Your environment variables
│   └── ... (other files)
```

### Step 3: Update Backend Package.json

Make sure `server/package.json` has this in scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "npm install"
  }
}
```

### Step 4: Test Locally

```bash
# Terminal 1: Start backend
cd server
npm start

# Open browser
# Frontend: http://localhost:5000
# API: http://localhost:5000/api/health
# Everything works from same port!
```

### Step 5: Deploy to Render (Recommended)

1. Go to [render.com](https://render.com)
2. Create New Web Service
3. Connect GitHub repository
4. Build Command: `cd client && npm run build && cd ../server && npm install`
5. Start Command: `npm start`
6. Set Environment Variables
7. Deploy!

---

## ⚙️ Environment Configuration

### For Single Deployment

**client/.env**:
```env
# Frontend uses relative path to backend
VITE_API_BASE_URL=/api
```

**server/.env**:
```env
PORT=5000
NODE_ENV=production
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
# ... other variables
```

---

## 🔄 Development vs Production

### Development (Separate)

```bash
# Terminal 1: Backend
cd server
npm run dev              # Runs on :5000

# Terminal 2: Frontend  
cd client
npm run dev             # Runs on :5173

# client/.env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Production (Single Deployment)

```bash
# Build frontend
cd client
npm run build

# Start backend (serves everything)
cd server
npm start               # Runs on :5000

# Open: http://localhost:5000
# Everything works!

# client/.env
VITE_API_BASE_URL=/api
```

---

## 📁 File Structure After Build

```
server/
├── server.js
├── package.json
├── .env
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
└── seed/

client/dist/          ← This is served as static files
├── index.html        ← Served by server.js on all routes
├── assets/
│   ├── index-abc.js
│   ├── index-xyz.css
│   └── images/
└── ... (other files)
```

---

## 🎯 How Requests Work

### Frontend Load
```
User visits: https://your-app.onrender.com
↓
Express serves: client/dist/index.html
↓
React Router loads
↓
Frontend interactive
```

### API Call
```
Frontend calls: fetch('/api/volunteers')
↓
Express matches: /api/volunteers route
↓
Backend controller responds
↓
Frontend receives data
```

### Navigation
```
User clicks: "Volunteers"
↓
React Router changes URL
↓
NOT a server request (SPA)
↓
Frontend loads Volunteers component
```

---

## 🚀 Deployment Checklist

- [ ] Frontend built: `npm run build`
- [ ] client/.env has `VITE_API_BASE_URL=/api`
- [ ] server/server.js updated (should be done already)
- [ ] MongoDB Atlas configured
- [ ] Cloudinary configured
- [ ] Email service configured
- [ ] server/.env file created
- [ ] Node v18+ installed
- [ ] Render account created
- [ ] Build command set: `cd client && npm run build && cd ../server && npm install`
- [ ] Start command set: `npm start`
- [ ] Environment variables set in Render
- [ ] Deploy!

---

## 🐛 Troubleshooting

### Frontend not loading
- Check: `client/dist` folder exists
- Check: `npm run build` completed successfully
- Check: `server.js` has frontend serving code

### API not working
- Check: `client/.env` has `VITE_API_BASE_URL=/api`
- Check: Backend API routes defined in `server/`
- Check: MongoDB connected

### Build fails on Render
- Check: Node version compatible
- Check: Build command correct
- Check: All environment variables set
- Check: package.json has correct scripts

### CORS errors
- Single deployment shouldn't have CORS issues
- If it does: Check `server.js` CORS configuration
- Try removing `?v=` from index.html cache in React

---

## 💡 Advantages

✅ **Single URL** - Easy to share and remember  
✅ **No CORS issues** - Same origin  
✅ **Cheaper** - One deployment instead of two  
✅ **Faster** - No cross-domain requests  
✅ **Simpler** - One server to manage  

---

## 📞 Quick Links

- Local Setup: Run `npm start` in server
- Render Deployment: Follow Step 5 above
- Environment Config: See .env.example files
- API Reference: See README.md

---

## ✨ Example Deployment URLs

After deployment, everything works from one link:

```
🌐 Frontend:     https://your-app.onrender.com
🌐 Admin:        https://your-app.onrender.com/login
🌐 API:          https://your-app.onrender.com/api/health
🌐 Register:     https://your-app.onrender.com/register
🌐 Dashboard:    https://your-app.onrender.com/admin

All from ONE URL! 🎉
```

---

**Ready to deploy? Follow the steps above!** 🚀
