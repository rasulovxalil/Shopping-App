# 🛒 Shopping App

A full-stack e-commerce application with a **Next.js + MUI** frontend, a **customer-facing admin panel**, and a **Go (Echo) + PostgreSQL** REST API backend. Features include category/subcategory browsing, product search, a per-user server-persisted shopping cart, authentication, and a full admin CRUD dashboard.

---

## ✨ Features

- **Product catalog** — categories, subcategories, product listing and detail pages
- **Live search** — instant popper-style search dropdown in the header (desktop & mobile), filters by name/brand
- **Cart system** — Add to Cart / Buy Now, hover cart preview popper, full cart page, quantity controls
- **Per-user carts** — each authenticated user has their own cart persisted on the backend (not localStorage)
- **Authentication** — login flow backed by the Go API
- **Admin Panel** — dedicated dashboard (`frontend/AdminPanel`) with MUI data tables for managing Users and Products (create / edit / delete)
- **Responsive design** — separate optimized desktop and mobile headers/layouts

---

## 🧱 Tech Stack

### Frontend (`/frontend`)
| Tech | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | React framework, routing, SSR |
| React 19 | UI library |
| TypeScript | Type safety |
| [MUI (Material UI) 9](https://mui.com/) + Emotion | Component library & styling |
| `@mui/material-nextjs` | Official SSR cache integration for the App Router |
| Tailwind CSS 4 | Utility styling |
| Swiper | Carousels/sliders |

### Backend (`/backend`)
| Tech | Purpose |
|---|---|
| Go 1.26 | Language |
| [Echo v4](https://echo.labstack.com/) | HTTP web framework |
| PostgreSQL (`lib/pq`) | Database |
| `godotenv` | Environment variable loading |
| Plain numbered SQL migrations | Schema management (`migrations/N_*.up.sql` / `.down.sql`) |

---

## 📁 Project Structure

```
Shopping-App/
├── backend/
│   ├── main.go              # Echo server bootstrap, CORS, routes
│   ├── handler/              # HTTP handlers (controllers)
│   ├── repository/           # Data access layer (SQL queries)
│   ├── models/                # Domain structs
│   └── migrations/           # Numbered .up.sql / .down.sql files
│
└── frontend/
    ├── app/
    │   ├── Components/        # Header, Cart, Auth, Body, etc.
    │   ├── categories/        # Category & subcategory pages
    │   ├── products/[id]/     # Product detail page
    │   ├── cart/               # Cart page
    │   ├── login/               # Login page
    │   ├── lib/                  # API config, shared helpers
    │   └── layout.tsx           # Root layout (providers)
    └── AdminPanel/             # Admin dashboard (Users & Products CRUD)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Go 1.26+
- PostgreSQL

### 1. Backend setup

```bash
cd backend
```

Create a `.env` file:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shopping_app
PORT=5000
```

Run the migrations in `backend/migrations` against your database in numeric order, then start the server:

```bash
go run main.go
```

The API will be available at `http://localhost:5000`.

### 2. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Then run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## 🛠️ Skills & Concepts Demonstrated

This repo is a good showcase of:

- **Next.js App Router patterns** — nested dynamic routes, shared layouts for persistent UI (sidebars/headers that don't flash on navigation), client/server component boundaries
- **React state architecture** — Context API for cross-cutting concerns (`AuthContext`, `CartContext`, `CategoryContext`), `useSyncExternalStore` for SSR-safe client state synced with `localStorage`
- **Hydration-safe SSR** — diagnosing and fixing React hydration mismatches, proper SSR style injection with `@mui/material-nextjs`
- **REST API design** — Go/Echo handler → repository → model layering, PostgreSQL migrations without an ORM
- **Full-stack auth & sessions** — moving from a localStorage-only mock to a real backend-verified login with per-user persisted data
- **UI engineering with MUI** — data tables, poppers/menus, badges, responsive breakpoints
- **Debugging discipline** — root-causing infinite render loops, hydration errors, and dev-server/Turbopack cache corruption

---

## 📌 Notes

- The `Sign In` flow with `admin` / `admin` credentials redirects straight to `/admin` for quick access to the admin panel during development.
- `frontend/app/lib/apiConfig.ts` is the single source of truth for the backend base URL — never hardcode API URLs elsewhere.
