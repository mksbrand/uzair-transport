# Uzair Transport System - Agent Handover & Technical Specification Log

> **For Future AI Agents & Maintainers**: This document outlines the complete system architecture, data models, completed features, environment requirements, and roadmap for future iterations of the Uzair Transport Management System.

---

## 📌 Project Overview

**Uzair Transport** is a production-ready university transit portal that manages:
1. **Student Transit Services**: Route exploration, daily shuttle schedules, encrypted digital conductor passes with 3D flip UI, and fee receipt requests.
2. **Conductor Verification**: Encrypted QR code generation (AES-256-GCM) with public receipt verification.
3. **Administration Hub**: Fleet management, route pricing, automated PDF receipt generation (`pdfkit`), student enrollment controls, broadcast notifications, announcements, and audit logging.

---

## 🏗️ Architecture & Directory Structure

```
mahad/
├── backend/                  # Node.js + Express + TypeScript API Server (Port 3001)
│   ├── prisma/
│   │   ├── schema.prisma     # SQLite/PostgreSQL Database Models
│   │   └── seed.ts           # Initial Database Seed Script
│   ├── src/
│   │   ├── api/
│   │   │   ├── controllers/  # Auth, Admin, Receipts, Routes, Buses, Analytics, etc.
│   │   │   ├── middleware/   # JWT Auth, Role Guard, Multer Upload, Rate Limiting, Error Handling
│   │   │   └── routes/       # Express Route Mappings
│   │   ├── config/           # Database Connection & Env Configuration
│   │   ├── services/         # Auth, QrService (AES-256), PdfService, EmailService, ReceiptService
│   │   ├── types/            # TypeScript Interfaces & Zod Validation Schemas
│   │   ├── app.ts            # Express Server Configuration
│   │   └── server.ts         # Main Entrypoint
│   ├── uploads/              # Uploaded Payment Proof Receipts
│   └── package.json
│
├── frontend/                 # Next.js 14 App Router + Tailwind CSS (Port 3000)
│   ├── src/
│   │   ├── app/              # App Router Pages
│   │   │   ├── page.tsx      # Public Landing Page
│   │   │   ├── login/        # Student Login (Google OAuth)
│   │   │   ├── admin-login/  # Admin Sign-In
│   │   │   ├── verify/       # Public QR Code Verification
│   │   │   ├── student/      # Student Portal (Dashboard, Routes, Transport, Pass, Receipts, Profile, Help)
│   │   │   └── admin/        # Admin Portal (Overview, Students, Routes, Buses, Receipts Queue, Notifications, Announcements, Analytics, Audit Logs)
│   │   ├── components/       # UI Components, Layout (Sidebar/Navbar), Student & Admin Cards/Tables
│   │   ├── context/          # AuthContext & NotificationContext
│   │   ├── lib/              # API Client (fetchApi) & Formatting Utilities
│   │   └── types/            # Frontend Type Definitions
│   └── package.json
│
├── docker-compose.yml        # PostgreSQL & Redis Container Configuration
├── PROJECT_STATUS.md         # Detailed Development Milestones
└── AGENT_HANDOVER.md         # Handover Instructions for Next Agent Execution
```

---

## 🔑 Key Service Implementations

### 1. Cryptographic QR Verification (`backend/src/services/qr.ts`)
* Pass QR payloads are encrypted using **AES-256-GCM** with a HMAC-SHA256 signature using `ENCRYPTION_KEY`.
* Verification route (`POST /api/v1/verify`) validates timestamps and prevents pass forgery.

### 2. PDF Pass Generation (`backend/src/services/pdf.ts`)
* Uses `pdfkit` to generate official A4 fee receipt buffers.
* Streamed via `GET /api/v1/receipts/:id/pdf`.

### 3. Payment Proof Upload (`backend/src/api/middleware/upload.ts`)
* Uses `multer` for handling student fee deposit proof uploads (`JPEG`, `PNG`, `PDF`).

---

## 🔮 Roadmap & Potential Future Extensions

For future agents extending this project, consider the following enhancements:

1. **GPS Live Tracking**: Integrate Socket.io / WebSockets in `backend/src/services/socket.ts` and Leaflet/Mapbox in `frontend/src/components/student/live-bus-map.tsx` to stream live shuttle coordinates.
2. **SMS Gateway Notification**: Integrate Twitch/Twilio or local Pakistan SMS API (e.g., Jazz/Telenor API) in `EmailService` for instant SMS alerts on shuttle delays.
3. **Database Migration to PostgreSQL**: In production deployment, set `provider = "postgresql"` in `prisma/schema.prisma` and connect to the Postgres instance defined in `docker-compose.yml`.

---

## ⚙️ How to Run locally

```bash
# 1. Start Backend API (Port 3001)
cd backend
npm run dev

# 2. Start Frontend App (Port 3000)
cd frontend
npm run dev
```

* **Default Admin Credentials**:
  * Email: `admin@uzair.local`
  * Password: `Admin@12345`
