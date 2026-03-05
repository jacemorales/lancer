# Lancer - Freelance Marketplace

This project is a full-stack freelance marketplace built with Next.js (Frontend) and NestJS (Backend).

## Deployment Guide

To see the project running "perfectly online," follow these steps to deploy the separate components.

### 1. Database Setup

The project uses PostgreSQL with Prisma ORM.

1.  **Provider:** Sign up for a managed PostgreSQL service like [Neon](https://neon.tech/) or [Render PostgreSQL](https://render.com/docs/databases).
2.  **Connection String:** Create a new database and copy the connection string (e.g., `postgresql://user:password@host/dbname?sslmode=require`).

### 2. Backend API (NestJS)

Deploy the backend to a platform like [Render](https://render.com/) or [Railway](https://railway.app/).

1.  **Repository Settings:** Point the deployment to the `lancer/api` directory.
2.  **Build Command:** `npm install && npm run build`
3.  **Start Command:** `npm run start:prod`
4.  **Environment Variables:**
    *   `DATABASE_URL`: Your PostgreSQL connection string.
    *   `JWT_SECRET`: A long, random string for authentication.
    *   `PORT`: `3001` (or your preferred port).

### 3. Frontend Web Application (Next.js)

Deploy the frontend to [Netlify](https://www.netlify.com/).

1.  **Repository Settings:**
    *   **Base directory:** `lancer/web`
    *   **Build command:** `npm run build`
    *   **Publish directory:** `.next` (for standard Next.js) or `out` (for static export).
2.  **Redirects:** A `_redirects` file has been added to `lancer/web/public/` and `lancer/` to handle client-side routing and SPA behavior on Netlify.
3.  **Environment Variables:**
    *   `NEXT_PUBLIC_API_URL`: The URL of your deployed Backend API.

### 4. How They Connect

Once both are deployed:
1.  The **Frontend** communicates with the **Backend** via the `NEXT_PUBLIC_API_URL`.
2.  The **Backend** communicates with the **Database** via the `DATABASE_URL`.
3.  **Netlify Redirects:** Ensure that client-side routing works by having the `/* /index.html 200` rule in your `_redirects` file (already included).

## Local Development

1.  **Database:** Ensure Docker is running and use `docker-compose up` in the `lancer/` directory.
2.  **Backend:** `cd lancer/api && npm install && npm run start:dev`
3.  **Frontend:** `cd lancer/web && npm install && npm run dev`
