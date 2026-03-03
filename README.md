# Library Management System

A comprehensive library management system with user authentication, book reservations, and admin panel.

## Features

- 🔐 **Secure Authentication**: Login/signup with security questions for password recovery
- 📚 **Book Management**: Add, edit, and manage library books
- 📋 **Reservation System**: Users can reserve and return books
- 👑 **Admin Panel**: Separate admin registration and dashboard
- 🔗 **Password Reset**: Secure forgot password with security questions
- 📊 **System Statistics**: Real-time user and book metrics

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Initialize Database**:
   ```bash
   node setup-database.js
   ```

3. **Start Server**:
   ```bash
   node server.js
   ```

4. **Access Application**:
   - **Main Site**: http://localhost:3000
   - **Admin Registration**: http://localhost:3000/admin-signup
   - **Admin Dashboard**: http://localhost:3000/admin-home
   - **User Registration**: http://localhost:3000/signup

## Security Features

- ✅ Security question verification for password reset
- ✅ Admin registration code protection
- ✅ Session-based authentication
- ✅ Password hashing with bcrypt
- ✅ SQL injection protection
- ✅ Role-based access control

## Technology Stack

- **Backend**: Node.js with Express
- **Database**: SQLite with better-sqlite3
- **Frontend**: Vanilla JavaScript with modern CSS
- **Authentication**: bcrypt + express-session
- **Email**: Nodemailer (optional)

## Project Structure

```
NEW/
├── server.js              # Main server file
├── setup-database.js     # Database initialization
├── package.json           # Dependencies
├── public/               # Static files
│   ├── css/            # Stylesheets
│   ├── js/             # Client-side scripts
│   ├── admin.html       # Admin management panel
│   ├── admin-home.html  # Admin dashboard
│   ├── admin-signup.html # Admin registration
│   ├── signup.html      # User registration
│   ├── login.html       # Login page
│   └── *.html          # Other pages
├── lib/                 # Helper modules
│   └── mail.js         # Email functionality
└── data/                # Database files
    └── library.db       # SQLite database
```

## Configuration

Copy `.env.example` to `.env` and configure:

- **PORT**: Server port (default: 3000)
- **BASE_URL**: Base URL for password reset links
- **SMTP_***: Email configuration (optional)

## Deployment

This application can be deployed to any Node.js hosting platform:

### Popular Options:
- **Vercel**: Free tier with automatic deployments
- **Netlify**: Free static hosting (limited for Node.js)
- **DigitalOcean**: Paid VPS with full control
- **Heroku**: Paid Node.js hosting

### Environment Variables for Production:
```bash
NODE_ENV=production
PORT=3000
BASE_URL=https://your-domain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## License

MIT License - Free to use and modify

## Contributing

1. Fork repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**R.V.R & J.C College of Engineering Library Management System**  
*Built with ❤️ for educational institutions*
