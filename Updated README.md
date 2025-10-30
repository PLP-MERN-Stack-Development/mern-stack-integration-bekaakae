# MERN Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js.

## Features

- User authentication (register/login)
- Create, read, update, delete blog posts
- Comment on posts
- Category management
- Responsive design

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB

### Backend Setup
1. Navigate to server directory: `cd server`
2. Install dependencies: `npm install`
3. Create `.env` file and add environment variables
4. Start server: `npm run dev`

### Frontend Setup
1. Navigate to client directory: `cd client`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

### Environment Variables
Server `.env`:
MONGODB_URI=mongodb://localhost:27017/your database name
JWT_SECRET=your_jwt_secret_key
PORT=5001

Client `.env`:
VITE_API_URL=http://localhost:5001/api

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:slug` - Get single post
- `POST /api/posts/:id/comments` - Add comment to post
- `GET /api/categories` - Get all categories


This complete MERN blog application includes:

✅ Backend: Express.js server with MongoDB using Mongoose
✅ Frontend: React with React Router for navigation
✅ Authentication: JWT-based user registration/login
✅ CRUD Operations: Full post management
✅ Comments: Comment system for posts
✅ Categories: Category management
✅ Responsive Design: Clean, mobile-friendly UI

The code is simple, readable, and well-commented. Each file focuses on a single responsibility, making it easy to understand and maintain.
