# ❤️ devTinder Backend

Backend APIs for devTinder, a developer-focused social matching platform featuring authentication, connection requests, matching, and real-time chat.

## 🚀 Live Application

🔗 http://13.200.233.99/

## 📌 Frontend Repository

🔗 https://github.com/ShreySrivastav1/devTinder-web

---

## ✨ Features

### Authentication

- Signup
- Login
- Logout
- JWT Authentication
- HttpOnly Cookies
- Password Hashing with Bcrypt

### Profile Management

- View Profile
- Edit Profile

### Connection Requests

- Send Request
- Ignore Request
- Accept Request
- Reject Request

### Feed System

- Discover Developers
- Pagination Support
- Exclude Existing Connections

### Real-Time Chat

- Socket.IO Integration
- One-to-One Messaging
- Persistent Chat Storage

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt.js
- Socket.IO
- Cookie Parser
- CORS

### Deployment

- AWS EC2
- PM2
- Nginx

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/ShreySrivastav1/devTinder.git
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

### Run Server

```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication

```http
POST /signup
POST /login
POST /logout
```

### Profile

```http
GET /profile/view
PATCH /profile/edit
```

### Connection Requests

```http
POST /request/send/:status/:toUserId
GET /user/requests/received
```

### Connections

```http
GET /user/connections
```

### Feed

```http
GET /user/feed?page=1&limit=10
```

### Chat

```http
GET /chat/:targetUserId
```

---

## 🔒 Security Features

- JWT Authentication
- HttpOnly Cookies
- Password Hashing
- Protected Routes
- Secure Socket Connections
- MongoDB Schema Validation

---

## 🏗 Database Models

### User

```js
{
  firstName,
  lastName,
  emailId,
  password,
  gender,
  age,
  skills,
  about,
  photoUrl
}
```

### ConnectionRequest

```js
{
  fromUserId,
  toUserId,
  status
}
```

### Chat

```js
{
  participants,
  messages
}
```

---

## 🌐 Deployment Architecture

```text
Browser
   │
   ▼
Nginx
   │
   ▼
Node.js + Express
   │
   ├── JWT Authentication
   ├── REST APIs
   └── Socket.IO
   │
   ▼
MongoDB Atlas
```

---

## 📚 What I Learned

- REST API Design
- Authentication & Authorization
- MongoDB Data Modeling
- Real-Time Communication
- Socket.IO
- Pagination
- AWS EC2 Deployment
- PM2 Process Management
- Nginx Reverse Proxy Configuration

---

## 👨‍💻 Author

Shrey Srivastav

GitHub: https://github.com/ShreySrivastav1

LinkedIn: https://www.linkedin.com/in/shrey-srivastav-b3873031b

---

⭐ If you found this project useful, consider giving it a star.
