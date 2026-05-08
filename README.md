<div align="center">

# 🎵 Music App — Backend

### Role-Based Music Streaming API

A **Node.js REST API** for a music streaming application with full authentication, authorization, and cloud media storage. Built with separate roles for **Artists** and **Users** — artists upload, users listen.

<br/>

[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![ImageKit](https://img.shields.io/badge/ImageKit-Media_Storage-F05A28?style=for-the-badge&logo=imagekit&logoColor=white)](https://imagekit.io/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

</div>

---

## 📸 Overview

Music App Backend provides a secure, role-aware API that powers a music streaming platform. Artists can register, authenticate, and upload their music to the cloud via **ImageKit**. Users can browse and stream all available tracks. Every route is protected by custom **JWT middleware** with tokens stored in **HTTP-only cookies**.

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT in HTTP-only Cookies** — Secure, XSS-resistant token storage
- **Signup / Login / Logout** — Full auth lifecycle for both roles
- **Two Roles** — `Artist` and `User` with separate models and permissions
- **Custom Auth Middleware** — `authenticate` verifies the token, `authorize` enforces role access
- **Role-Based Route Guards** — Artists and Users only access what they're permitted to

### 🎶 Music Management
- **Artist Uploads** — Artists upload music files via `Multer` (in-memory buffer) → streamed to **ImageKit**
- **Cloud Storage** — All media stored and served via ImageKit CDN
- **User Access** — Users can browse and view all available music
- **Separate Data Models** — `User`, `Artist`, and `Music` schemas kept clean and decoupled

---

## 🗂 Project Structure

```
music-auth-backend/
│
├── src/
│   ├── controllers/            # Business logic for auth & music operations
│   │   ├── auth.controller.js  # Signup, login, logout for Artist & User
│   │   └── music.controller.js # Upload music, fetch all music
│   │
│   ├── db/
│   │   └── db.js               # MongoDB connection setup
│   │
│   ├── middlewares/
│   │   ├── authenticate.js     # Verifies JWT from HTTP-only cookie
│   │   └── authorize.js        # Checks user role for protected routes
│   │
│   ├── models/
│   │   ├── user.model.js       # User schema & password hashing
│   │   ├── artist.model.js     # Artist schema & password hashing
│   │   └── music.model.js      # Music schema (title, url, artist ref)
│   │
│   ├── routes/
│   │   ├── auth.routes.js      # /api/auth — signup, login, logout
│   │   └── music.routes.js     # /api/music — upload, fetch all
│   │
│   └── service/
│       └── imagekit.js         # ImageKit SDK configuration & upload helper
│
├── .env                        # Environment variables (not committed)
├── .env.example                # Environment variable template
├── .gitignore
├── package.json
└── server.js                   # Entry point — starts Express server
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT (jsonwebtoken)** | Stateless authentication tokens |
| **Cookie-Parser** | HTTP-only cookie handling |
| **Multer** | In-memory buffer middleware for file uploads |
| **ImageKit** | Cloud media storage & CDN for music files |
| **bcrypt** | Secure password hashing |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `v18+`
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [ImageKit Account](https://imagekit.io/) — for media storage (free tier available)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Taran-G/music-auth-backend.git
cd music-auth-backend
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Fill in your `.env` file:

```env
# Server
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017/music-app

# JWT
JWT_SECRET=your_strong_jwt_secret_here

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

> Get your ImageKit keys from your [ImageKit dashboard](https://imagekit.io/dashboard) under **Developer Options**.

---

### 4. Start the Server

```bash
node ./server.js
```

> Server runs at `http://localhost:3000`

---

## 🔌 API Reference

### Auth Endpoints — `/api/auth`

| Method | Endpoint | Description | Role | Protected |
|---|---|---|---|---|
| `POST` | `/signup/user` | Register a new User | User | ❌ |
| `POST` | `/signup/artist` | Register a new Artist | Artist | ❌ |
| `POST` | `/login/user` | Login as User | User | ❌ |
| `POST` | `/login/artist` | Login as Artist | Artist | ❌ |
| `POST` | `/logout` | Logout & clear cookie | Both | ✅ |

### Music Endpoints — `/api/music`

| Method | Endpoint | Description | Role | Protected |
|---|---|---|---|---|
| `POST` | `/upload` | Upload a music file to ImageKit | Artist only | ✅ |
| `GET` | `/` | Fetch all available music | User | ✅ |

---

## 🔐 Authentication Flow

```
Signup    →  password hashed with bcrypt  →  User/Artist saved to MongoDB

Login     →  credentials verified  →  JWT signed & stored in HTTP-only cookie

Request   →  authenticate middleware reads cookie  →  verifies JWT
          →  authorize middleware checks role  →  allows or rejects

Logout    →  cookie cleared from browser
```

---

## 🎵 Music Upload Flow

```
1. Artist sends POST /api/music/upload with audio file
2. authenticate middleware verifies JWT cookie
3. authorize middleware confirms role === 'artist'
4. Multer captures the file as an in-memory buffer
5. ImageKit service uploads the buffer to cloud storage
6. ImageKit returns a public CDN URL
7. Music document (title, url, artistId) saved to MongoDB
8. Success response returned to client
```

---

## 📂 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `PORT` | Server port | ✅ |
| `MONGO_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret key for signing JWT tokens | ✅ |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public API key | ✅ |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private API key | ✅ |
| `IMAGEKIT_URL_ENDPOINT` | Your ImageKit URL endpoint | ✅ |

> ⚠️ **Never commit your `.env` file.** It is listed in `.gitignore` by default.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: describe your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Taran-G](https://github.com/Taran-G)**

*Powered by Node.js · MongoDB · ImageKit · JWT*

</div>
