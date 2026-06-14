# Deployment Guide - NayePankh Volunteer Management System

This guide provides step-by-step instructions for deploying the NayePankh VMS to production.

## 🎯 Deployment Options

### ⭐ **Option 1: SINGLE DEPLOYMENT (Recommended) - One URL for Everything!**

**Best for:** Easiest, cheapest, no CORS issues  
**Result:** Everything runs from `https://your-app.onrender.com`

👉 **See: [SINGLE_DEPLOYMENT_SETUP.md](./SINGLE_DEPLOYMENT_SETUP.md)** for complete guide

**Quick Process:**
1. Build frontend: `npm run build` in client
2. Setup is done (server.js already configured)
3. Deploy backend to Render (it serves frontend too!)
4. Single URL works for everything ✅

---

### Option 2: Separate Deployment - Frontend + Backend Different URLs

**Best for:** Advanced, separate scaling  
**Result:** Frontend on Vercel, Backend on Render

Use this section below if you prefer separate deployments.

---

## Prerequisites

✅ GitHub repository created and code pushed  
✅ MongoDB Atlas account and cluster created  
✅ Cloudinary account set up  
✅ Email service configured (Gmail/Nodemailer)  

---

## Option 2A: Render + Vercel (Separate Deployments)

## Option 2A: Render + Vercel (Separate Deployments)

### Backend: Deploy to Render

**Step 1: Prepare Backend**
```bash
# Ensure all tests pass and build succeeds
cd server
npm install
npm start  # Test locally
```

**Step 2: Create Render Service**
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Choose the repository with your project

**Step 3: Configure Render**
| Setting | Value |
|---------|-------|
| Name | `nayepankh-api` |
| Environment | `Node` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Branch | `main` |
| Region | `Singapore` or closest to you |

**Step 4: Add Environment Variables**
Go to Environment tab and add:
```
PORT=5000
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_random_secret
CLIENT_URL=https://your-frontend-domain.com
CLOUDINARY_CLOUD_NAME=your_value
CLOUDINARY_API_KEY=your_value
CLOUDINARY_API_SECRET=your_value
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=NayePankh Foundation <your_email@gmail.com>
ADMIN_EMAIL=admin@nayepankh.org
ADMIN_PASSWORD=your_secure_password
```

**Step 5: Deploy**
1. Click "Create Web Service"
2. Wait for build to complete
3. Your API will be available at: `https://nayepankh-api.onrender.com`

**Step 6: Seed Database**
```bash
# After deployment, run seed from your local terminal
curl -X POST https://nayepankh-api.onrender.com/api/admin/seed
```

---

### Frontend: Deploy to Vercel

**Step 1: Prepare Frontend**
```bash
cd client
npm install
npm run build  # Verify build succeeds
npm run lint   # Check for errors
```

**Step 2: Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository

**Step 3: Configure Project**
| Setting | Value |
|---------|-------|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment: VITE_API_BASE_URL | `https://nayepankh-api.onrender.com/api` |

**Step 4: Deploy**
1. Click "Deploy"
2. Wait for deployment to complete
3. Your frontend will be available at: `https://nayepankh-vms.vercel.app`

---

## Option 2B: DigitalOcean App Platform (Separate Deployments)

### Deploy Full Stack

**Step 1: Create App on DigitalOcean**
1. Sign up at [digitalocean.com](https://digitalocean.com)
2. Go to Apps → Create App
3. Connect GitHub and select repository

**Step 2: Configure Services**

**Add Backend Service:**
- Name: `api`
- Source Type: GitHub
- Build Command: `npm install`
- Run Command: `npm start`
- HTTP Port: `5000`
- Add environment variables (same as Render)

**Add Frontend Service:**
- Name: `web`
- Source Type: GitHub
- Build Command: `npm run build`
- Output Directory: `dist`
- Add VITE_API_BASE_URL: `https://api.<your-app>.ondigitalocean.app`

**Step 3: Deploy**
- Click "Create Resources"
- Wait for deployment complete
- Backend: `https://api.nayepankh-vms.ondigitalocean.app`
- Frontend: `https://web.nayepankh-vms.ondigitalocean.app`

---

## Option 4: Heroku (Deprecated - Not Recommended)

⚠️ Heroku free tier has ended. Use Option 1 or 2B instead.

---

## Option 3: AWS (EC2 + S3) - Separate Deployments

### Backend: Deploy to EC2

**Step 1: Launch EC2 Instance**
1. AWS Console → EC2 → Launch Instance
2. Choose Ubuntu 22.04 LTS
3. Instance Type: t3.micro (free tier eligible)
4. Security Group: Allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 5000 (API)

**Step 2: Connect & Setup**
```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Clone and setup project
git clone your-repo-url
cd nayepankh-vms/server
npm install
```

**Step 3: Configure Environment**
```bash
nano .env
# Add all environment variables
```

**Step 4: Start with PM2**
```bash
pm2 start server.js --name "nayepankh-api"
pm2 startup
pm2 save
```

**Step 5: Setup Reverse Proxy (Nginx)**
```bash
sudo apt install -y nginx

# Create nginx config
sudo nano /etc/nginx/sites-available/default
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Frontend: Deploy to S3 + CloudFront

**Step 1: Build Frontend**
```bash
cd client
npm run build
```

**Step 2: Create S3 Bucket**
1. AWS Console → S3 → Create Bucket
2. Bucket name: `nayepankh-vms-frontend`
3. Disable "Block public access"

**Step 3: Upload Build Files**
```bash
aws s3 sync dist/ s3://nayepankh-vms-frontend --delete
```

**Step 4: Enable Static Website Hosting**
1. S3 → Bucket → Properties
2. Enable "Static website hosting"
3. Index: `index.html`
4. Error: `index.html` (for SPA routing)

**Step 5: Setup CloudFront**
1. CloudFront → Create Distribution
2. Origin: Your S3 bucket
3. Alternate domain: `app.your-domain.com`
4. SSL: Request certificate in ACM

---

## Post-Deployment Checklist

- [ ] Backend health check: Visit `/api/health`
- [ ] Admin login works with test credentials
- [ ] Volunteer registration works
- [ ] Image upload works (check Cloudinary dashboard)
- [ ] Email notifications sent (check inbox)
- [ ] Admin dashboard loads and displays data
- [ ] Search/filter/export features work
- [ ] Database seeded with demo data
- [ ] SSL certificate installed (green lock in browser)
- [ ] Rate limiting active (test with multiple requests)
- [ ] CORS working (frontend can access API)
- [ ] Activity logs recording changes

---

## Domain Setup (All Platforms)

### Add Custom Domain

**Step 1: Get Domain**
- Register at [GoDaddy](https://godaddy.com), [Namecheap](https://namecheap.com), or [Route53](https://aws.amazon.com/route53)

**Step 2: Update DNS Records**

For Render + Vercel:
```
nayepankh.com          A    76.75.23.87    (Vercel IP)
api.nayepankh.com      CNAME nayepankh-api.onrender.com
```

For DigitalOcean:
```
nayepankh.com          CNAME <your-app>.ondigitalocean.app
api.nayepankh.com      CNAME api.<your-app>.ondigitalocean.app
```

For AWS:
```
nayepankh.com          CNAME <cloudfront-domain>.cloudfront.net
api.nayepankh.com      A    <elastic-ip>
```

**Step 3: SSL Certificate**
- Most platforms auto-generate SSL (Let's Encrypt)
- Wait 24-48 hours for DNS propagation
- Verify with: `https://www.sslshopper.com/ssl-checker.html`

---

## Monitoring & Maintenance

### Set Up Monitoring

**Uptime Monitoring:**
- Use [UptimeRobot](https://uptimerobot.com) (free)
- Monitor: `https://api.your-domain.com/api/health`
- Alert if down

**Error Tracking:**
- Consider [Sentry](https://sentry.io) for error logs
- Email alerting for failures

**Database Monitoring:**
- MongoDB Atlas has built-in monitoring
- Check connection limits and storage

### Backup Strategy

```bash
# Backup MongoDB daily
mongodump --uri="mongodb+srv://..." --out=./backup

# Upload to S3
aws s3 sync backup/ s3://your-backup-bucket/
```

---

## Troubleshooting Deployment

### Backend won't start
```bash
# Check logs
pm2 logs nayepankh-api

# Or on Render
# View logs in Render dashboard
```

### Frontend not loading
```bash
# Check build output
npm run build
# Verify files in dist/ folder
```

### Database connection fails
- Check MongoDB Atlas IP whitelist includes your server IP
- Verify connection string in environment variables
- Test connection: `node -e "require('mongoose').connect(process.env.MONGO_URI)"`

### CORS errors
- Verify `CLIENT_URL` environment variable matches frontend URL
- Check browser console for exact error

### Performance issues
- Enable caching headers
- Use CDN for static assets
- Monitor database query performance

---

## Security Checklist

- [ ] Remove `.env` from repository (use `.env.example`)
- [ ] Set strong JWT_SECRET (32+ characters)
- [ ] Set strong ADMIN_PASSWORD
- [ ] Enable HTTPS/SSL everywhere
- [ ] Update CLIENT_URL to production domain
- [ ] Review security headers in Helmet
- [ ] Enable rate limiting
- [ ] Monitor activity logs for suspicious behavior
- [ ] Keep dependencies updated (`npm audit fix`)
- [ ] Use environment variables for all secrets

---

## Cost Estimation (Monthly)

| Service | Free Tier | Paid |
|---------|-----------|------|
| Render Backend | $7 | $20+ |
| Vercel Frontend | Free | $20+ |
| MongoDB Atlas | 512MB | $9+ |
| Cloudinary | 25 credits/month | $99+ |
| Domain | N/A | $8-15 |
| **Total** | **~$40** | **$100+** |

---

## Rollback Strategy

If deployment fails:

```bash
# Revert to previous build
git revert <commit-hash>
git push

# Platform will auto-redeploy
# Or manually trigger redeploy in dashboard
```

---

For more help, check platform documentation or raise an issue on GitHub.
