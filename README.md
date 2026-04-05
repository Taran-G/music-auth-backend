Music App — Backend
A Node.js backend for a music streaming app with role-based auth for Artists and Users.
Tech Stack
Node.js · Express.js · MongoDB · JWT · Cookies · Multer · ImageKit
Features

Signup / Login / Logout with JWT stored in HTTP-only cookies
Two roles — Artist and User
Custom middleware for authentication and role-based authorization
Artists can upload music files (via Multer + ImageKit)
Users can view all music
Separate MongoDB models for User, Artist, and Music

structure
src/
├── controllers/   # Auth and music logic
├── db/            # MongoDB connection
├── middlewares/   # authenticate + authorize
├── models/        # User, Artist, Music schemas
├── routes/        # auth.routes, music.routes
└── service/       # ImageKit config

Setup
bashgit clone https://github.com/Taran-G/music-auth-backend.git
npm install
cp .env.example .env
make ur own private key of imagekit,mongoose,jwtsecret and paste it in .env
node ./server.js
