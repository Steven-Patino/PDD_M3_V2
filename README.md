# Crudzazo

A simple **tasks Management Dashboard** built with **HTML, Tailwind CSS, and Vanilla JavaScript**, using a mock REST API (JSON Server) for persistence. The project includes **authentication, role-based access, and tasks CRUD operations**.

---

## 🚀 Features

* 🔐 **Authentication** (Login & Register)
* 👤 **Role-based access** (Admin / User)
* 📅 **tasks listing**
* ➕ **Create events** (Admin only)
* ❌ **Delete events** (Admin only)
* 🚪 **Logout functionality**
* 🛡️ Route protection using a guard

---

## 🧱 Tech Stack

* **HTML5**
* **Tailwind CSS** (via CDN)
* **Vanilla JavaScript**
* **JSON Server** (Mock REST API)

---

## 📁 Project Structure

```
project-root/
│
├── index.html
│
├── boards/
│   ├── login.html        # Login page
│   ├── register.html     # register page
│   |── dashboard.html    # Admin dashboard to control all the program
│   |── newtask.html      # Page when i can create new task
│   └── mytask.html       # Page when i can see task of the current user 
|
├── js/
│   ├── auth.js               # Login, register, logout logic
│   ├── guard.js              # Session and route protection
│   |── render-dashboard.js   # Logic behind the render of the dashboard
│   |── render-dashboard.js   # Logic behind the render of the mytask
│   └── createtask.js         # Logic behind the creation of new task

│
└── db.json          # JSON Server database
```

---

## 🔐 Authentication Flow

1. User logs in via `login.html`
2. Credentials are validated against the API
3. User data is stored in `localStorage`
4. Protected pages validate session using `guard.js`
5. Logout clears session and redirects to login

---

## 👥 User Roles

### Admin

* Can create tasks
* Can delete tasks
* Can view all tasks

### User

* Can view tasks
* Can manipulate your own tasks
* Cannot create or delete tasks

> ⚠️ Role validation is **frontend-only** and intended for learning purposes.

---

## 🛡️ Route Protection (`guard.js`)

* Redirects unauthenticated users to `login.html`
* Exposes the logged-in user globally via `window.user`

---

## 📡 API Endpoints

Using **JSON Server**:

### Users

```
GET  /users
POST /users
```

### Events

```
GET    /events
POST   /events
PUT    /events/:id
DELETE /events/:id
```

---

## ▶️ Getting Started

### 1. Install JSON Server

```bash
npm install -g json-server
```

### 2. Create `db.json`

```json
{
{
  "users": [
    {
      "id": "0001",
      "name": "Admin",
      "email": "stevenpat27@gmail.com",
      "password": "123456",
      "role": "admin"
    }
  ],
  "proyects":     
  {
      "id": "",
      "title": "",
      "description": "",
      "ownerId": ""
    },
  "tasks": [
    {
    "id": "1234",
    "title": "Prueba",
    "description": "Esto es una prueba",
    "status": "complete",
    "priority": "low",
    "dueDate": "03/02/2026",
    "proyectId": "a31s",
    "assignedTo": "Prueba"
  }]
}
}
```

### 3. Run the server

```bash
json-server --watch db.json --port 3000
```

### 4. Open the app

Open `index.html` in your browser.

---

## 📄 License

This project is open for educational use.



