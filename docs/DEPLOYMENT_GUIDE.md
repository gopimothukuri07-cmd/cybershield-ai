# CyberShield AI - Deployment Guide

This guide walks you through deploying the CyberShield AI project online using free Platform-as-a-Service (PaaS) providers: **Render** (for the Backend and Database) and **Vercel** (for the Frontend).

## Prerequisites
1. Create a [GitHub account](https://github.com/).
2. Push this entire project folder (`D:\Projects\DDOS`) to a new GitHub repository.

## Step 1: Deploy Backend & Database on Render
Render allows you to deploy the FastAPI backend and a PostgreSQL database seamlessly.

1. Sign up at [Render.com](https://render.com/).
2. Connect your GitHub account.
3. In the Render Dashboard, click **New > Blueprint**.
4. Select the GitHub repository you just pushed.
5. Render will detect the `render.yaml` file in the root directory.
6. Click **Apply**. Render will automatically provision:
   - A free PostgreSQL database (`cybershield-db`).
   - A web service running the Python FastAPI backend (`cybershield-backend`).
7. Once the build finishes, Render will provide a live URL (e.g., `https://cybershield-backend.onrender.com`). **Copy this URL**.

## Step 2: Deploy Frontend on Vercel
Vercel is optimized for Vite and React applications.

1. Sign up at [Vercel.com](https://vercel.com/).
2. Connect your GitHub account.
3. Click **Add New > Project**.
4. Import your CyberShield AI GitHub repository.
5. In the **Configure Project** section:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (Click Edit and select the `frontend` folder).
   - **Environment Variables**:
     - Name: `VITE_API_URL`
     - Value: `[PASTE THE RENDER URL FROM STEP 1]`
     - Name: `VITE_WS_URL`
     - Value: `wss://[YOUR_RENDER_URL_DOMAIN_WITHOUT_HTTPS]/ws/live`
6. Click **Deploy**. Vercel will build the frontend and provide a live URL.

## Step 3: Test the Live Application
1. Navigate to your Vercel URL.
2. The cyberpunk landing page should load.
3. Click "Initialize Clearance" to register an account.
4. Verify that the 3D globe and charts populate with data streaming live from your Render backend!
