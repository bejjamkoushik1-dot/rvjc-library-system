# Library Management System

A full-fledged library website with **database connection**, **book list**, **reservations**, **user login/signup**, and **e-books**.

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

## Default Credentials

- **Admin**: admin@rvrjc.edu / admin123
- **Test User**: test@example.com / testpassword123
- **Admin Registration Code**: ADMIN2024

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
│   ├── login.html
│   ├── signup.html
│   ├── books.html          # Book list
│   ├── reserve.html        # Reserve a book
│   ├── my-reservations.html
│   ├── ebooks.html         # E-books list
│   ├── ebook-viewer.html   # Read one e-book
│   └── admin.html          # Admin panel (manage books, users, reservations)
├── scripts/
│   └── init-db.js          # Create DB and seed data
├── server.js
└── package.json
```

## Database

- **users**: id, email, password_hash, name, created_at  
- **books**: id, title, author, isbn, description, cover_url, ebook_path, quantity  
- **reservations**: id, user_id, book_id, status, reserved_at, due_date, returned_at  

Reservations use a 14-day due date. Run `npm run init-db` only once to create tables; re-running will add the demo user if missing and skip re-seeding books.

## Connect to GitHub and run

1. Install [Git](https://git-scm.com/downloads) if needed.
2. Create a new repository on [GitHub](https://github.com/new) (no README or .gitignore).
3. In the project folder run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Library Management System"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
4. To run the app: `npm start` then open **http://localhost:3000**.
