# RVRJC Library Management System - Setup Guide

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize Database
```bash
node setup-database.js
```

### 3. Configure Email (Required for Forgot Password)
Copy `.env.example` to `.env` and configure your email settings:

```bash
cp .env.example .env
```

Edit `.env` with your email configuration:
- For Gmail: Create an App Password at https://myaccount.google.com/apppasswords
- Use the App Password (NOT your regular Gmail password)

### 4. Start the Server
```bash
node server.js
```

## Default Credentials

### Admin User
- **Email:** admin@rvrjc.edu
- **Password:** admin123

### Test User
- **Email:** test@example.com  
- **Password:** testpassword123

## Access the Application

- **Main Site:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin (use admin credentials)
- **Books:** http://localhost:3000/books

## Features

- ✅ User authentication (login/signup)
- ✅ Forgot password (requires email configuration)
- ✅ Book reservation system
- ✅ Admin panel for book management
- ✅ User reservation tracking
- ✅ Due date reminders

## Troubleshooting

### Forgot Password Not Working
1. Ensure email is configured in `.env` file
2. Check console for error messages
3. Without email config, reset links are logged to console

### Database Issues
1. Run `node setup-database.js` to reinitialize
2. Check `data/library.db` file permissions

### Port Already in Use
Change PORT in `.env` file (default: 3000)

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Update `BASE_URL` to your domain
3. Use HTTPS for production
4. Configure proper email service
5. Set up regular database backups
