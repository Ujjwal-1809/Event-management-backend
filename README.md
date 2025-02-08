
---

### **Backend - README.md**
```md
# Event Management Platform - Backend

This is the backend API for the **Event Management Platform**, built using **Node.js** and **Express.js**. It provides authentication, event management, and user profile features.

## 🚀 Features
- **User Authentication** (JWT & Cookies)
- **Event CRUD Operations**
- **Cloudinary Integration for Image Uploads**
- **MongoDB Database**
- **CORS & Security Middleware**

## 🛠 Tech Stack
- **Node.js** & **Express.js**
- **MongoDB & Mongoose**
- **JWT (JSON Web Tokens)**
- **Cookie-based Authentication**
- **Cloudinary (Image Storage)**
- **CORS Middleware**
- **Dotenv (Environment Variables)**

## 📂 Project Setup
### 1️⃣ Clone the repository
```sh
git clone https://github.com/Ujjwal-1809/event-management-backend.git
cd event-management-backend
npm install

###Create .env file
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

npm run dev
