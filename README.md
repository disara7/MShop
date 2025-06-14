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
