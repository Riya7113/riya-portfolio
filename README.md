# Riya's portfolio

A React + Vite portfolio styled with Tailwind CSS. The contact form stores submissions in MongoDB Atlas using Mongoose. The `server/` Express API is used for local development; `api/` contains Vercel serverless endpoints for deployment.

## Run locally

1. Install Node.js and obtain a MongoDB connection URI (Atlas works for local development).
2. Copy `.env.example` to `.env` and replace the placeholder `MONGODB_URI`.
3. Run `npm install`.
4. In one terminal run `npm run server`; in another run `npm run dev`.
5. Open the Vite URL shown in the terminal.

## Deploy to Vercel

1. Push this project to a GitHub repository. Keep `.env` out of Git; `.gitignore` already excludes it.
2. Import the repository in Vercel. Vercel detects Vite; use `npm run build` as the build command and `dist` as the output directory.
3. In the Vercel project settings, add `MONGODB_URI` with the value from your local `.env`, for Production (and Preview if needed), then redeploy.
4. In MongoDB Atlas, make sure the database user has access to the portfolio database and the Atlas IP access list permits the deployed function to connect. Do not share the URI publicly.
5. After deployment, open `/api/health` on your site, then submit a test message using the contact form.

The Vercel endpoints are `/api/health` and `/api/contact`. For local development, run `npm run server` and `npm run dev` in separate terminals. Put the resume PDF at `public/resume.pdf` to enable résumé links.
