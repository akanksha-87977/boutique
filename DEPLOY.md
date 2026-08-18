Overview
--------
This document explains how to push this project to GitHub and deploy the frontend to Vercel and the backend as Vercel serverless functions, using MongoDB Atlas as the database.

Prerequisites
- Node.js and npm installed
- A GitHub account
- A Vercel account
- A MongoDB Atlas cluster and connection string

Quick steps
1. Create a repository on GitHub (do not initialize with README or .gitignore).
2. From the project root, run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

3. On Vercel: import the GitHub repository and deploy.
   - In Project Settings > Environment Variables add:
     - `MONGODB_URI` = your Atlas connection string
     - Any other env vars used by the app (e.g., `JWT_SECRET`)

4. Vercel will detect the `api/` directory and deploy serverless functions automatically.

Local development
- Backend: `cd backend && npm install && npm run dev`
- Frontend: `npm install && npm start` (from project root)

Notes
- Vercel serverless functions have cold-starts and execution limits; for production-scale APIs consider Render/Heroku or a container host.
- If you prefer unified hosting for backend (Render) instead of serverless, tell me and I will prepare Render files.
