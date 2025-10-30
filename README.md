# NTI Bookstore - Full Stack Application

A robust and secure full-stack Bookstore application built with the MEAN stack (MongoDB, Express.js, Angular, Node.js) as a graduation project for the NTI Backend Diploma. This application features a complete authentication system and a functional book catalog.

## ✨ Features

- **🔐 User Authentication & Authorization**: Secure JWT-based registration and login system.
- **📚 Book Management**: Browse a catalog of available books.
- **🎨 Modern Frontend**: Dynamic and responsive user interface built with Angular.
- **🚀 RESTful API**: Well-structured backend API built with Node.js and Express.js.
- **💾 Database Integration**: Persistent data storage with MongoDB.
- **🛡️ Security Best Practices**: Includes password hashing and protected routes.

## 🛠️ Tech Stack

- **Frontend**: Angular, TypeScript, HTML, CSS
- **Backend**: Node.js, Express.js, JavaScript
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Package Management**: npm

## 📁 Project Structure

The project is organized into two main parts:

**Frontend (Client) - Angular Application**
- `/client` - Contains all Angular frontend code
- `/client/src/app` - Main application components and services
- `/client/src/assets` - Static assets (images, styles)
- `/client/src/environments` - Environment configurations
- `/client/angular.json` - Angular configuration file

**Backend (API) - Node.js & Express Application**
- `/api` - Contains all backend code
- `/api/controllers` - Request handlers and business logic
- `/api/models` - Database models and schemas
- `/api/routes` - API route definitions
- `/api/middleware` - Custom middleware functions
- `/api/config` - Database and application configuration
- `/api/server.js` - Main server entry point

**Root Files**
- `README.md` - Project documentation (this file)
- `package.json` - Root package configuration

  Installation & Setup
markdown
## ⚙️ Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- Angular CLI
- MongoDB (local or cloud)

### 1. Clone the Repository
git clone https://github.com/mahmoud416/NtiMeanStack-Auth-BookStore.git
cd NtiMeanStack-Auth-BookStore
2. Backend Setup

# Navigate to backend directory
cd api

# Install dependencies
npm install

# Create environment file
# Add your MONGODB_URI and JWT_SECRET in .env file

# Start the backend server
npm start
Backend will run on: http://localhost:3000

3. Frontend Setup
   
# Navigate to frontend directory
cd client

# Install dependencies
npm install

# Start the Angular development server
ng serve
Frontend will run on: http://localhost:4200
