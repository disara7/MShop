# MShop

MShop is a **simple monolithic e-commerce application** designed to showcase a unified architecture.  
The application comprises **both the frontend and backend within a single codebase**, making it easy to develop, deploy, and maintain.

---

## 🔹 Tech Stack

- **Client (React)**:
  - React with hooks (`useState`, `useEffect`) for UI and state management.
  - Axios for API requests.
  - Pure CSS-in-JS styling (inline styles).

- **Server (Node.js & Express)**:
  - Express for routing and API endpoints.
  - MySQL for persistent storage.
  - Sequelize ORM for database operations.

- **Database (MySQL)**:
  - Stores products and related data.

---

## 🔹 Monolithic UI Architecture Explained

This application follows a **monolithic architecture**, which means:

- The **frontend (React)** and **backend (Node/Express)** are closely integrated and deployed together.
- The API, business logic, UI, and data storage all reside in a **single codebase**.
- There are no separate microservice components — everything runs as **one unified application**.

This approach makes development, testing, and deployment simpler for small to medium-sized applications.

---

## 🔹 Installation and Run instructions

### 1️⃣. Set up MySQL first:

- **Create a MySQL database** (say, `mshop`) manually:

```sql
CREATE DATABASE mshop;
```

### 2️⃣. Install server-side dependencies:
```
cd server
npm install
```

### 3️⃣. Run the server:

npm start
The server will:

Sync your MySQL models.

Start listening on http://localhost:5000.

4️⃣. Install client-side dependencies:
bash
Copy
Edit
cd ../client
npm install
5️⃣. Run the React application:
bash
Copy
Edit
npm start
The React UI should now be available at http://localhost:3000.

🔹 Access the Application
✅ Client (React UI) — http://localhost:3000

✅ API (Node + Express) — http://localhost:5000/api/products


