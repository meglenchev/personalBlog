# 📝 Personal Blog Project (Under development)

A personal blog project built with **React** and **Node.js Express, utilizing Firebase Storage** for image management.

---

## 🚀 Setup Guide

The project is divided into two main parts: **server (backend)** and **personal-blog (frontend/client)**. To run the application locally, follow the steps below:

### ☁️ Backend Setup (Server)
The server handles the database and authentication.
1. Open a new terminal in the `/server` folder.
2. Install dependencies (if not already done):
   ```bash
   npm install
3. Start the server in development mode:
   ```bash
   npm run dev
4. The server will be running at:
   ```bash
   http://localhost:5000

### 💻 Frontend Setup (Blog)
The client-side is built with **React** and **Vite**.
1. Open a new terminal in the `/personal-blog` folder.
2. Install dependencies:
   ```bash
   npm install
3. Start the application:
   ```bash
   npm run dev
4. The blog will be accessible at:
   ```bash
   http://localhost:5173

### 🧪 Testing
The project uses Vitest and React Testing Library to ensure code quality.
1. Run tests:
   - Navigate to the `/personal-blog` folder.
   - Execute:
   ```bash
   npm test
2. Generate a code coverage report:
   ```bash
   npm run coverage

### 🛠 Tech Stack
**Frontend:** React 19+, React Router 7, Context API.
**Backend:** Node.js, Express.js, Mongoose (MongoDB).
**Storage:** Firebase Storage (for multimedia management).
**Security:**
   - **JWT** (JSON Web Tokens) for authentication.
   - Cookie-based session management.
   - Role-based authorization middleware.
**Testing:** Vitest, React Testing Library, JSDOM.

### 🔑 Access & Administration
**Admin Registration**
To create a new profile, visit:
👉 http://localhost:5173/pb-admin/register
**Login**
To access an existing profile, visit:
👉 http://localhost:5173/pb-admin/login

### 🔐 Roles and Permissions
   - **User:** Can browse content.
   - **Moderator:** Has elevated permissions to create and edit their own posts/practices.
   - **Admin:** Full system control, including editing and deleting posts created by others.

### 🔐 Role Management
Upon registration, new users are assigned the user role by default, which has limited access.
To grant administrative or moderator privileges:
1. You must **manually** update the user's role in the database.
2. Change the role field to either `admin` or `moderator`.
3. A **re-login** is required for the new permissions to take effect.

### 📸 Images
This project relies on Firebase. Ensure you have an active internet connection for proper image uploading and rendering.
