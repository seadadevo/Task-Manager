# Task Manager

A full-stack task management app built with the MERN stack. Create, view, edit, delete, and filter your tasks — all in one place.

---

## Tech Stack

**Frontend**

- React + TypeScript (Vite)
- TanStack Query — data fetching & caching
- React Hook Form + Zod — form handling & validation
- Zustand — auth state
- shadcn/ui + Tailwind CSS — UI components & styling
- React Router v6

**Backend**

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT (access + refresh tokens)
- Zod — request validation
- Helmet + CORS

---

## Project Structure

```
task-manager/
├── client/          # React frontend
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── interfaces/
│       ├── pages/
│       ├── routes/
│       ├── schemas/
│       └── store/
└── server/          # Express backend
    └── src/
        ├── controllers/
        ├── middlewares/
        ├── models/
        ├── routes/
        ├── schemas/
        └── utils/
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/seadadevo/Task-Manager.git
cd task-manager
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

### 3. Set up the client

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start the client:

```bash
npm run dev
```

The app runs at **http://localhost:5173**

---

## Features

- **Auth** — Register / Login with JWT. Tokens persist across page refreshes.
- **Dashboard** — View all your tasks with stats (Total, Pending, In-Progress, Completed).
- **Filters & Sort** — Filter by status, priority, keyword. Sort by newest, oldest, due date, or priority.
- **Pagination** — Tasks are paginated (6 per page).
- **Create Task** — Modal form with full validation.
- **Edit Task** — Pre-filled form — update any field instantly.
- **Delete Task** — Confirmation dialog before deletion.
- **Task Details** — Dedicated page per task with full info.
- **Dark mode** — System-aware theme toggle.

---

## API Endpoints

| Method | Route                      | Description                  |
| ------ | -------------------------- | ---------------------------- |
| POST   | `/api/v1/auth/register`    | Register                     |
| POST   | `/api/v1/auth/login`       | Login                        |
| GET    | `/api/v1/auth/me`          | Get current user             |
| GET    | `/api/v1/tasks`            | Get all tasks (with filters) |
| POST   | `/api/v1/tasks/create`     | Create a task                |
| GET    | `/api/v1/tasks/:id`        | Get a task by ID             |
| PUT    | `/api/v1/tasks/:id`        | Update a task                |
| DELETE | `/api/v1/tasks/delete/:id` | Delete a task                |
| GET    | `/api/v1/tasks/stats`      | Get task stats               |


