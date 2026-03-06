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

1.  **Netlify Configuration:** A `netlify.toml` file has been added to the root of the repository. It automatically configures the following:
    *   **Base directory:** `lancer/web`
    *   **Build command:** `npm run build`
    *   **Publish directory:** `.next`
2.  **Redirects & Routing:** Since this is a Next.js project, Netlify will automatically handle routing using its Next.js Runtime plugin. You **do not** need a manual `_redirects` file for standard routing.
3.  **Environment Variables:**
    *   `NEXT_PUBLIC_API_URL`: The URL of your deployed Backend API.

### 4. How They Connect

Once both are deployed:
1.  The **Frontend** communicates with the **Backend** via the `NEXT_PUBLIC_API_URL`.
2.  The **Backend** communicates with the **Database** via the `DATABASE_URL`.

## Local Development

1.  **Database:** Ensure Docker is running and use `docker-compose up` in the `lancer/` directory.
2.  **Backend:** `cd lancer/api && npm install && npm run start:dev`
3.  **Frontend:** `cd lancer/web && npm install && npm run dev`
