# Diligent E-Commerce (MERN)

This repository contains a minimal but functional MERN-based e-commerce prototype. It demonstrates the essential building blocks required for browsing products and managing a shopping cart with a per-session experience.

## Project Structure

```
├── backend/   # Express API + MongoDB
└── frontend/  # React + Vite SPA
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas cluster (or local MongoDB instance)

## Backend Setup

```bash
cd backend
pnpm install    # or npm/yarn
cp env.example .env
# update MONGODB_URI and CLIENT_ORIGIN inside .env
pnpm run dev
```

The API listens on `http://localhost:5000` by default, exposing:

- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/cart`
- `POST /api/cart`
- `DELETE /api/cart/:itemId`

Clients must send an `x-session-id` header (handled automatically by the frontend) to manage guest carts.

## Frontend Setup

```bash
cd frontend
pnpm install    # or npm/yarn
pnpm run dev
```

The SPA runs on `http://localhost:5173` and proxies API requests to the backend during development.

## Development Notes

- The backend uses Mongoose models for `Product` and `Cart`.
- The frontend manages cart state with a lightweight `CartContext` and synchronises with the API.
- Adjust styles in `frontend/src/styles.css` as needed.

## Next Steps

- Implement authentication and per-user carts.
- Add product administration & seeding scripts.
- Introduce checkout, payment integration, and order workflows.
- Enhance UI with component library or design system.

## Deploy Without Local Node (Render)

You can deploy entirely in the cloud using Render (Node is provided in their build environment).

1) Push this repo to GitHub.
2) Option A: One-click via `render.yaml`
   - In Render, “New +” → “Blueprint” → connect the repo.
   - Render will read `render.yaml`, creating:
     - `diligent-backend` (web service)
     - `diligent-frontend` (static site)
   - In the backend service settings, set `MONGODB_URI` in “Environment”.
   - After the backend deploys, copy its URL (e.g., `https://diligent-backend.onrender.com`).
   - In the frontend service, set environment variable:
     - `VITE_API_BASE_URL=https://diligent-backend.onrender.com/api`
   - Redeploy frontend.
3) Option B: Manual services
   - Create a Web Service from `backend/`
     - Build: `npm install && npm run seed`
     - Start: `npm run start`
     - Environment variables: `PORT=5000`, `MONGODB_URI=<your Atlas uri>`, `CLIENT_ORIGIN=<frontend URL>`
   - Create a Static Site from `frontend/`
     - Build: `npm install && npm run build`
     - Publish directory: `dist`
     - Env var: `VITE_API_BASE_URL=<backend>/api`

Verification
- Open `<backend>/api/products` and confirm JSON product list.
- Visit frontend URL → Products page loads; product details and cart actions work. 

