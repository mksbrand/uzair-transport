# 🚌 Uzair Transport - University Transport Management System

A production-ready, full-stack application built for university student transportation management, complete with Google OAuth student authentication, Admin password management, PDF receipt generation, encrypted QR digital transport passes, daily bus schedules, audit logs, and analytics.

---

## 🌟 Key Features

### For Students:
- 🔑 **Google OAuth Login**: One-click authentication with university Google accounts.
- 🚌 **Route & Bus Explorer**: View active transport routes, stops, schedules, and fee structures.
- 💳 **Receipt Management**: Request official transport receipts and download auto-generated PDFs.
- 🆔 **Digital Transport Pass**: Live-updating pass with encrypted QR verification for conductors.
- 📢 **Announcements & Notifications**: Instant updates on bus delays, fee deadlines, and holidays.
- 👤 **Profile & Route Preferences**: Manage personal details, department, semester, and route selection.

### For Administrators:
- 🔒 **Secure Admin Portal**: Dedicated dashboard with bcrypt authentication and session control.
- 📊 **Dashboard & Analytics**: Real-time stats on total students, route ridership, revenue, and pending tasks.
- 👥 **Student CRUD Management**: View, filter, assign routes, or update student statuses.
- 🗺️ **Route & Bus Fleet Management**: Add, update, and manage routes, stops, prices, and bus details.
- 📑 **Receipt Approval Queue**: Review, approve, or reject student receipt requests with notes.
- 🗓️ **Daily Bus Scheduler**: Set daily departure/arrival times and bus status (Scheduled, Delayed, In Progress).
- 📢 **Broadcaster**: Post announcements and push system notifications to targeted students.
- 📝 **Audit Logging**: Traceable logging of all administrative actions for compliance.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Recharts, `qrcode.react`, `html2canvas` / `jspdf`.
- **Backend**: Express.js, TypeScript, Prisma ORM, PostgreSQL / SQLite (zero-config dev), JWT Authentication, bcryptjs, Zod validation, Rate Limiter.
- **Security**: AES-256-GCM QR Encryption, JWT signed tokens, Helmet security headers, password hashing.

---

## 🚀 Quick Start Guide

### Step 1: Environment Setup
Copy sample environment files for both frontend and backend:
```bash
cp frontend/.env.local.example frontend/.env.local
cp backend/.env.local.example backend/.env.local
```

### Step 2: Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```
*Backend runs on `http://localhost:3001`.*

### Step 3: Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

---

## 🔑 Default Credentials

- **Admin Login**: `admin@uzair.local` / `Admin@12345`
- **Student Login**: Click "Continue with Google" or use the one-click demo login on the login page.
