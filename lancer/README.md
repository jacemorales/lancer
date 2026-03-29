# WorkPlug - Powering Your Hustle

WorkPlug is a dedicated platform for **students** to kickstart their careers. Our mission is to **end unemployment in Africa within the next 10 years** by connecting students with global opportunities.

## 🚀 Deployment Guide

This guide explains how to get WorkPlug running online with a Google Sheets "database."

### 1. Database Setup (Google Sheets)

For testing UI flow without a complex backend, you can use Google Sheets as your database.

1.  **Create a Spreadsheet:** Create a new Google Sheet.
2.  **Add Headers:** Add the following headers to the first row:
    `id`, `title`, `description`, `skills`, `budgetType`, `budget`, `postedDate`, `clientName`, `clientLocation`, `clientRating`, `clientReviews`
3.  **Add Demo Data:** Copy these rows into your sheet:
    ```csv
    1,Senior Frontend Student,Build a React dashboard,React;Next.js,hourly,25,2024-09-26,TechCorp,Lagos; Nigeria,4.9,12
    2,Python Scripting for Research,Automate data collection,Python;Selenium,fixed,200,2024-09-25,EduResearch,Nairobi; Kenya,4.8,5
    3,Social Media Graphics,Design 10 Instagram posts,Canva;Figma,fixed,150,2024-09-24,StyleHub,Remote,5.0,20
    ```
    *(Note: Use semicolons `;` to separate skills and locations to avoid CSV parsing errors).*
4.  **Publish to Web:**
    - In Google Sheets, go to `File > Share > Publish to web`.
    - Select `Entire Document` and `Comma-separated values (.csv)`.
    - Click `Publish` and copy the generated URL.

### 2. Frontend Web Application (Next.js)

Deploy the frontend to [Netlify](https://www.netlify.com/).

1.  **Netlify Configuration:** A `netlify.toml` file is in the root of the repository. It automatically handles the build settings.
2.  **Environment Variables:**
    - Set `NEXT_PUBLIC_GOOGLE_SHEET_URL` to the **CSV URL** you copied from Google Sheets.
3.  **Build Command:** `npm run build`
4.  **Publish Directory:** `out`

### 3. How It Works

- The site fetches data directly from your Google Sheet CSV URL using the `fetch` API.
- Client-side routing is handled by Netlify using the `_redirects` file.
- No backend server is required for this UI-only flow!

## 💻 Local Development

1.  **Setup:** `cd lancer/web && npm install`
2.  **Run:** `npm run dev`
3.  **Env:** Create a `.env.local` in `lancer/web` and add `NEXT_PUBLIC_GOOGLE_SHEET_URL=your_csv_url`.
