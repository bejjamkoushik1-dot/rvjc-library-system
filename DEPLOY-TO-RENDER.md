# Deploy RVRJC Library System to Render

## 🚀 Quick Deployment Guide

### **IMPORTANT: Use the Next.js Version!**

You have TWO versions of the library system:
1. **OLD VERSION** (Express.js) - In root directory with `server.js`
2. **NEW VERSION** (Next.js) - In `library-system/` folder ⭐

**Deploy the NEW Next.js version from the `library-system/` folder!**

---

## 📋 Prerequisites
- Node.js 18+ installed
- Render account (free tier works)
- Git repository

---

## 🗂️ Step 1: Push the Next.js Version

```bash
# Navigate to the Next.js project
cd library-system

# Make sure you're in the right directory (should have src/ folder)
ls  # Should show: src/, package.json, next.config.js, etc.

# Initialize Git if not already done
git init
git add .
git commit -m "Deploy Next.js library system to Render"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/library-system.git
git push -u origin main
```

---

## 🌐 Step 2: Deploy on Render

### Option A: Web Dashboard (Recommended)
1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. **Important Settings:**
   - **Root Directory**: `library-system` (not root!)
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
   - **Node Version**: `18` or higher

### Option B: Using render.yaml (Auto-configure)
1. The `render.yaml` file is already configured in the `library-system/` folder
2. Render will automatically detect and use it

---

## ⚙️ Environment Variables (Optional)

Add these in Render dashboard:
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app-name.onrender.com
```

---

## 🔧 Build Process

Render will automatically:
1. Install dependencies (`npm install`)
2. Build the Next.js app (`npm run build`)
3. Start the production server (`npm start`)

---

## 🐛 Common Issues & Solutions

### ❌ "Cannot find module '/opt/render/project/src/lib/mail'"
**Cause**: Deploying old Express.js version
**Solution**: Make sure Root Directory is set to `library-system`

### ❌ "Build failed"
**Cause**: Missing dependencies or Node version too old
**Solution**: 
- Check `package.json` has all dependencies
- Use Node 18+ in Render settings

### ❌ "Port already in use"
**Cause**: Multiple services on same port
**Solution**: Render automatically handles port binding

---

## 🌍 Access Your App

After deployment:
- Your app will be available at: `https://your-app-name.onrender.com`
- Test all features: login, signup, books, reservations

---

## 🔄 Auto-Deploy Setup

For automatic deployments:
1. Enable auto-deploy in Render settings
2. Push changes to GitHub
3. Render will automatically rebuild and deploy

---

## 📱 Features Available

✅ **Working Features:**
- Modern UI with Tailwind CSS
- User authentication (login/signup)
- Book browsing with search & filters
- Reservation management
- Responsive design
- Real-time status updates

🔧 **API Endpoints:**
- `/api/auth/login` - User login
- `/api/auth/signup` - User registration  
- `/api/books` - Book catalog
- `/api/reservations` - Reservation management

---

## 🎯 Next Steps

1. ✅ Deploy to Render using this guide
2. ✅ Test all functionality
3. 🔧 Add real database (PostgreSQL recommended)
4. 📧 Configure environment variables
5. 📱 Add mobile app integration

---

## 🆘️ Support

If you encounter issues:
1. Check Render build logs
2. Verify Root Directory is `library-system`
3. Ensure Node version is 18+
4. Check that all files are pushed to Git

**Remember: Use the `library-system/` folder, NOT the root directory!**
