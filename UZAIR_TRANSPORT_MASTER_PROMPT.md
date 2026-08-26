# 🚌 UZAIR TRANSPORT - COMPLETE MASTER PROMPT

**A Production-Ready University Transport Management System**

---

## ⚠️ CRITICAL: SESSION MANAGEMENT & HANDOFF PROTOCOL

### If Response Limit Approaches:

1. **IMMEDIATELY CREATE**: `PROJECT_STATUS.md`
   ```markdown
   # Uzair Transport - Session Status Report
   
   ## ✅ COMPLETED SECTIONS
   - [ ] List all completed files with exact paths
   - [ ] Database schema & migrations
   - [ ] Configuration files
   - [ ] Completed components/pages
   
   ## ⏳ IN PROGRESS
   - [ ] Current file being generated
   - [ ] Line number or section where stopped
   - [ ] Dependencies needed
   
   ## ⏹️ TODO (NEXT SESSION)
   - [ ] Remaining pages/components
   - [ ] Remaining API routes
   - [ ] Testing files
   
   ## 🔧 SETUP COMMANDS TO RUN
   ```
   cd frontend && npm install
   cd ../backend && npm install
   npx prisma migrate dev
   npx prisma db seed
   npm run dev
   ```
   
   ## 📝 IMPORTANT NOTES
   - All files use TypeScript strict mode
   - Database should be PostgreSQL running locally
   - Use .env.local for environment variables (examples provided)
   - Next session: Copy all completed code + continue from [specific file]
   ```

2. **SAVE PROGRESS**: Output all completed code to markdown code blocks

3. **CONTINUE IN NEXT RESPONSE**: Paste PROJECT_STATUS.md + continue generation

4. **NEVER SKIP**: Every file must be complete, no placeholders

---

## 📋 PROJECT OVERVIEW

### What is Uzair Transport?

A **modern, professional web application** for managing university student transportation. Students can view routes, request receipts, and show digital passes to bus conductors. Administrators manage routes, buses, students, and approve receipt requests.

### Key Features

**For Students:**
- ✅ Login with Google (OAuth 2.0)
- ✅ View available routes & buses
- ✅ Check transport fees
- ✅ Request & download receipts as PDF
- ✅ View digital transport pass with QR code
- ✅ Receive notifications & announcements
- ✅ Manage profile information
- ✅ View payment history
- ✅ Live bus status (future-ready)

**For Administrators:**
- ✅ Secure login with password
- ✅ Manage routes, buses, students
- ✅ Approve/reject receipt requests
- ✅ Send notifications & announcements
- ✅ View analytics & generate reports
- ✅ Change password securely
- ✅ Audit logging for compliance
- ✅ Export data (Excel, PDF)

---

## 🛠️ TECHNOLOGY STACK (LOCALHOST OPTIMIZED)

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15 | Full-stack React framework (App Router) |
| React | 19 | UI library |
| TypeScript | 5.3+ | Type safety |
| Tailwind CSS | 3.4+ | Styling |
| ShadCN/UI | Latest | Pre-built components |
| Framer Motion | 10+ | Animations |
| Zustand | 4.4+ | State management |
| React Hook Form | 7.48+ | Form handling |
| Zod | 3.22+ | Validation |
| React PDF | 4+ | PDF generation |
| qrcode.react | 1.0+ | QR code generation |
| Recharts | 2.10+ | Charts & analytics |
| Lucide Icons | 0.263+ | Beautiful icons |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4.18+ | API framework |
| TypeScript | 5.3+ | Type safety |
| Prisma | 5+ | ORM & database |
| PostgreSQL | 15+ | Database |
| NextAuth.js | 5+ | Authentication |
| JWT | custom | Token management |
| bcrypt | 5.1+ | Password hashing |
| Zod | 3.22+ | Validation |
| Express Rate Limit | 7+ | Rate limiting |

### Database
| Technology | Version | Purpose |
|---|---|---|
| PostgreSQL | 15+ | Primary database |
| Prisma Client | 5+ | Database client |
| Prisma Migrations | 5+ | Schema versioning |

### Authentication
| Technology | Version | Purpose |
|---|---|---|
| NextAuth.js | 5+ | OAuth & sessions |
| Google OAuth 2.0 | Latest | Student login |
| bcrypt | 5.1+ | Admin password hashing |
| JWT | custom | Token-based auth |

### Local Services (No External APIs)
| Service | Implementation | Purpose |
|---|---|---|
| File Storage | Local `/public/uploads` | Profile pictures, documents |
| Email | Mock service (logs to console) | Development only |
| PDF Generation | React PDF (server-side) | Receipt PDFs |
| QR Codes | qrcode.react + crypto | Encrypted, verifiable |

---

## 🎨 DESIGN SYSTEM

### Color Palette
```css
/* Primary Colors */
--color-white: #FFFFFF
--color-light-gray: #F8F9FA
--color-sky-blue: #E0F2FE
--color-royal-blue: #0EA5E9
--color-navy: #0C4A6E

/* Gradients */
--gradient-soft: linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)
--gradient-dark: linear-gradient(135deg, #0C4A6E 0%, #0EA5E9 100%)

/* Neutral */
--color-gray-900: #111827
--color-gray-700: #374151
--color-gray-500: #6B7280
--color-gray-300: #D1D5DB
```

### Typography
```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Sizes */
H1: 2.25rem (36px) | font-weight: 700
H2: 1.875rem (30px) | font-weight: 700
H3: 1.5rem (24px) | font-weight: 600
H4: 1.25rem (20px) | font-weight: 600
Body: 1rem (16px) | font-weight: 400
Small: 0.875rem (14px) | font-weight: 400
```

### Component Styling
- Rounded corners: 8px (standard), 12px (larger cards)
- Shadows: Soft (0 1px 3px rgba), Medium (0 4px 6px rgba)
- Spacing: 8px base unit (8, 16, 24, 32, 48, 64)
- Transitions: 200ms ease-in-out
- Glassmorphism: backdrop-blur(10px), bg-opacity-80

---

## 📁 COMPLETE FOLDER STRUCTURE

```
uzair-transport/
│
├── README.md (Master setup guide)
├── .gitignore
├── docker-compose.yml (PostgreSQL setup)
│
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo.svg
│   │   ├── uploads/ (local profile pictures)
│   │   │   ├── avatars/
│   │   │   └── documents/
│   │   └── assets/
│   │       ├── illustrations/
│   │       │   ├── hero.svg
│   │       │   ├── bus.svg
│   │       │   └── features.svg
│   │       └── icons/
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx (Root layout)
│   │   │   ├── page.tsx (Landing page)
│   │   │   ├── globals.css
│   │   │   │
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── admin-login/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── student/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx (Dashboard)
│   │   │   │   ├── routes/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── transport/
│   │   │   │   │   └── page.tsx (Daily buses)
│   │   │   │   ├── receipts/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   └── page.tsx (Receipt detail)
│   │   │   │   │   └── request/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── pass/
│   │   │   │   │   └── page.tsx (Digital pass)
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── notifications/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── help/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx (Dashboard)
│   │   │   │   ├── students/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── routes/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── buses/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── receipts/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── notifications/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── announcements/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── audit-logs/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── verify/
│   │   │   │   └── [receiptId]/
│   │   │   │       └── page.tsx (Receipt verification)
│   │   │   │
│   │   │   └── api/
│   │   │       └── auth/
│   │   │           └── [...nextauth]/
│   │   │               └── route.ts
│   │   │
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── modal.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── toast.tsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── navbar.tsx
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── footer.tsx
│   │   │   │   └── breadcrumb.tsx
│   │   │   │
│   │   │   ├── student/
│   │   │   │   ├── dashboard-cards.tsx
│   │   │   │   ├── routes-list.tsx
│   │   │   │   ├── bus-schedule.tsx
│   │   │   │   ├── receipt-card.tsx
│   │   │   │   ├── digital-pass.tsx
│   │   │   │   ├── profile-form.tsx
│   │   │   │   └── announcements-list.tsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── dashboard-stats.tsx
│   │   │   │   ├── students-table.tsx
│   │   │   │   ├── routes-table.tsx
│   │   │   │   ├── buses-table.tsx
│   │   │   │   ├── receipts-table.tsx
│   │   │   │   ├── analytics-charts.tsx
│   │   │   │   └── audit-logs-table.tsx
│   │   │   │
│   │   │   └── forms/
│   │   │       ├── add-route-form.tsx
│   │   │       ├── add-bus-form.tsx
│   │   │       ├── add-student-form.tsx
│   │   │       └── send-notification-form.tsx
│   │   │
│   │   ├── lib/
│   │   │   ├── api.ts (API client)
│   │   │   ├── auth.ts (Auth utils)
│   │   │   ├── constants.ts (App constants)
│   │   │   ├── utils.ts (Helper functions)
│   │   │   ├── validators.ts (Zod schemas)
│   │   │   └── qr-encrypt.ts (QR encryption)
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useApi.ts
│   │   │   ├── useFetch.ts
│   │   │   ├── useNotifications.ts
│   │   │   └── useLocalStorage.ts
│   │   │
│   │   ├── types/
│   │   │   ├── index.ts (All type definitions)
│   │   │   └── api.ts (API response types)
│   │   │
│   │   ├── context/
│   │   │   ├── auth-context.tsx
│   │   │   └── notification-context.tsx
│   │   │
│   │   └── styles/
│   │       ├── globals.css
│   │       ├── theme.css
│   │       └── animations.css
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   ├── .env.local.example
│   └── README.md
│
├── backend/
│   ├── src/
│   │   ├── app.ts (Express setup)
│   │   ├── server.ts (Start server)
│   │   │
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── student.ts
│   │   │   │   ├── routes.ts
│   │   │   │   ├── buses.ts
│   │   │   │   ├── receipts.ts
│   │   │   │   ├── notifications.ts
│   │   │   │   ├── announcements.ts
│   │   │   │   ├── admin.ts
│   │   │   │   ├── analytics.ts
│   │   │   │   └── verify.ts (QR verification)
│   │   │   │
│   │   │   ├── middleware/
│   │   │   │   ├── auth.ts (JWT verification)
│   │   │   │   ├── errorHandler.ts
│   │   │   │   ├── rateLimiter.ts
│   │   │   │   ├── audit.ts
│   │   │   │   └── logger.ts
│   │   │   │
│   │   │   └── controllers/
│   │   │       ├── auth.ts
│   │   │       ├── student.ts
│   │   │       ├── receipts.ts
│   │   │       ├── admin.ts
│   │   │       ├── notifications.ts
│   │   │       └── analytics.ts
│   │   │
│   │   ├── services/
│   │   │   ├── auth.ts
│   │   │   ├── receipt.ts (Receipt generation)
│   │   │   ├── qr.ts (QR encryption/verification)
│   │   │   ├── email.ts (Mock service)
│   │   │   ├── pdf.ts (PDF generation)
│   │   │   └── audit.ts (Audit logging)
│   │   │
│   │   ├── utils/
│   │   │   ├── encryption.ts
│   │   │   ├── jwt.ts
│   │   │   ├── validation.ts
│   │   │   ├── helpers.ts
│   │   │   └── logger.ts
│   │   │
│   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   └── config/
│   │       ├── database.ts
│   │       ├── env.ts
│   │       └── constants.ts
│   │
│   ├── prisma/
│   │   ├── schema.prisma (Database schema)
│   │   ├── seed.ts (Sample data)
│   │   └── migrations/ (Auto-generated)
│   │
│   ├── tests/
│   │   ├── unit/ (Unit tests)
│   │   ├── integration/ (API tests)
│   │   └── fixtures/ (Test data)
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.local.example
│   ├── jest.config.js
│   └── README.md
│
└── docker-compose.yml
```

---

## 🗄️ DATABASE SCHEMA (PRISMA)

### Users Table
```prisma
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  googleId        String?   @unique
  fullName        String
  profilePicture  String?
  role            Role      @default(STUDENT) // STUDENT | ADMIN
  passwordHash    String?   // Null for students (Google OAuth)
  isActive        Boolean   @default(true)
  
  // Relations
  studentProfile  StudentProfile?
  receipts        Receipt[]
  receiptRequests ReceiptRequest[]
  auditLogs       AuditLog[] @relation("actor")
  notifications   Notification[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([email])
  @@index([googleId])
  @@index([role])
}

enum Role {
  STUDENT
  ADMIN
}

model StudentProfile {
  id              String    @id @default(cuid())
  userId          String    @unique
  studentId       String    @unique // University ID
  department      String
  semester        Int
  phone           String?
  emergencyContact String?
  address         String?
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  assignedRoute   TransportRoute? @relation("StudentRoute", fields: [assignedRouteId], references: [id])
  assignedRouteId String?
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([studentId])
  @@index([userId])
}

model TransportRoute {
  id              String    @id @default(cuid())
  name            String    // Route Name
  origin          String    // Starting point
  destination     String    // Ending point
  stops           Json      // Array of stops
  semester        String    // Which semester
  price           Float     // Transport fee
  busCount        Int       @default(1)
  isActive        Boolean   @default(true)
  
  // Relations
  students        StudentProfile[] @relation("StudentRoute")
  dailySchedules  DailyBusSchedule[]
  receiptRequests ReceiptRequest[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([name])
  @@index([semester])
  @@index([isActive])
}

model Bus {
  id              String    @id @default(cuid())
  busNumber       String    @unique // Bus license plate
  registrationNumber String
  driverName      String?
  driverPhone     String?
  totalSeats      Int       @default(50)
  isActive        Boolean   @default(true)
  notes           String?
  
  // Relations
  dailySchedules  DailyBusSchedule[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([busNumber])
  @@index([isActive])
}

model DailyBusSchedule {
  id              String    @id @default(cuid())
  busId           String
  routeId         String
  serviceDate     DateTime
  departureTime   DateTime
  arrivalTime     DateTime
  status          BusStatus @default(SCHEDULED)
  occupiedSeats   Int       @default(0)
  notes           String?
  
  // Relations
  bus             Bus       @relation(fields: [busId], references: [id], onDelete: Cascade)
  route           TransportRoute @relation(fields: [routeId], references: [id], onDelete: Cascade)
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@unique([busId, serviceDate])
  @@index([serviceDate])
  @@index([routeId])
  @@index([status])
}

enum BusStatus {
  SCHEDULED
  IN_PROGRESS
  COMPLETED
  CANCELLED
  DELAYED
}

model ReceiptRequest {
  id              String    @id @default(cuid())
  studentId       String
  routeId         String
  semester        String
  amount          Float
  status          ReceiptStatus @default(PENDING)
  
  // Relations
  student         User      @relation(fields: [studentId], references: [id], onDelete: Cascade)
  route           TransportRoute @relation(fields: [routeId], references: [id])
  receipt         Receipt?
  
  requestedAt     DateTime  @default(now())
  reviewedAt      DateTime?
  reviewedBy      String?
  rejectionReason String?
  
  updatedAt       DateTime  @updatedAt
  
  @@index([studentId])
  @@index([status])
  @@index([requestedAt])
}

enum ReceiptStatus {
  PENDING
  APPROVED
  REJECTED
}

model Receipt {
  id              String    @id @default(cuid())
  receiptNumber   String    @unique
  requestId       String    @unique
  studentId       String
  routeId         String
  semester        String
  amount          Float
  
  // Security
  signedToken     String    // JWT-like signed token
  verificationCode String   @unique // Unique code for verification
  encryptedQR     String    // Encrypted QR data
  
  // Status
  isRevoked       Boolean   @default(false)
  revokedAt       DateTime?
  
  // Dates
  issuedAt        DateTime  @default(now())
  validUntil      DateTime  // End of semester
  verificationVersion Int   @default(1)
  
  // Relations
  request         ReceiptRequest @relation(fields: [requestId], references: [id], onDelete: Cascade)
  
  updatedAt       DateTime  @updatedAt
  
  @@unique([receiptNumber])
  @@index([studentId])
  @@index([issuedAt])
  @@index([validUntil])
  @@index([isRevoked])
}

model Notification {
  id              String    @id @default(cuid())
  userId          String
  type            NotificationType
  title           String
  message         String
  data            Json?
  isRead          Boolean   @default(false)
  
  // Relations
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt       DateTime  @default(now())
  
  @@index([userId])
  @@index([isRead])
  @@index([createdAt])
}

enum NotificationType {
  FEE_REMINDER
  RECEIPT_APPROVED
  RECEIPT_REJECTED
  BUS_DELAY
  HOLIDAY
  GENERAL
  EMERGENCY
}

model Announcement {
  id              String    @id @default(cuid())
  title           String
  content         String
  isPinned        Boolean   @default(false)
  createdBy       String
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([isPinned])
  @@index([createdAt])
}

model AuditLog {
  id              String    @id @default(cuid())
  actorId         String
  action          String    // "CREATE_ROUTE", "APPROVE_RECEIPT", etc.
  objectType      String    // "Route", "Receipt", "Student", etc.
  objectId        String
  changes         Json?     // What was changed
  ipAddress       String?
  
  // Relations
  actor           User      @relation("actor", fields: [actorId], references: [id], onDelete: Cascade)
  
  createdAt       DateTime  @default(now())
  
  @@index([actorId])
  @@index([action])
  @@index([createdAt])
  @@index([objectType])
}
```

---

## 🔐 SECURITY SPECIFICATIONS

### Authentication Flow

**Student (Google OAuth):**
1. Click "Continue with Google"
2. Google redirects to `/api/auth/callback/google`
3. NextAuth.js creates session
4. User redirected to `/student/dashboard`
5. Session stored in HttpOnly cookie

**Admin (Password):**
1. Enter email & password
2. Validate against bcrypt hash
3. Generate JWT token (15-min expiry)
4. Generate refresh token (7-day expiry)
5. Store in HttpOnly cookie

### Password Security
- Hash: bcrypt with salt rounds = 10
- Min length: 12 characters
- Must contain: uppercase, lowercase, number, special char
- Changed password: requires old password verification
- Never store plain text

### API Security
```
Rate Limiting: 100 requests/minute per IP
Headers: Helmet.js security headers
CORS: http://localhost:3000 (dev)
Input Validation: Zod schemas
JWT Expiry: 15 minutes (tokens)
Refresh Expiry: 7 days
HttpOnly Cookies: Token storage
```

### QR Code Security
- Encryption: AES-256-GCM
- Contains: student_id, receipt_id, timestamp, signature
- Verification: Always check backend (never trust client)
- Cannot be used after expiry
- Cannot be used if revoked

### Audit Logging
- Log all admin actions
- Log all receipt approvals/rejections
- Log failed login attempts
- Log password changes
- Store for 2 years

---

## 📡 API ENDPOINTS (COMPLETE)

### Authentication APIs
```
POST   /api/v1/auth/google
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
POST   /api/v1/auth/admin/login
POST   /api/v1/auth/admin/logout
```

### Student APIs
```
GET    /api/v1/student/profile
PATCH  /api/v1/student/profile
GET    /api/v1/student/routes
GET    /api/v1/student/buses
GET    /api/v1/student/notifications
PATCH  /api/v1/student/notifications/:id/read
```

### Receipt APIs
```
GET    /api/v1/receipts
POST   /api/v1/receipts/request
GET    /api/v1/receipts/:id
GET    /api/v1/receipts/:id/download (PDF)
POST   /api/v1/receipts/:id/verify (QR verification)
```

### Admin APIs
```
GET    /api/v1/admin/dashboard
GET    /api/v1/admin/analytics

# Students
GET    /api/v1/admin/students
POST   /api/v1/admin/students
PATCH  /api/v1/admin/students/:id
DELETE /api/v1/admin/students/:id

# Routes
GET    /api/v1/admin/routes
POST   /api/v1/admin/routes
PATCH  /api/v1/admin/routes/:id
DELETE /api/v1/admin/routes/:id

# Buses
GET    /api/v1/admin/buses
POST   /api/v1/admin/buses
PATCH  /api/v1/admin/buses/:id
DELETE /api/v1/admin/buses/:id

# Daily Schedules
GET    /api/v1/admin/schedules
POST   /api/v1/admin/schedules
PATCH  /api/v1/admin/schedules/:id
DELETE /api/v1/admin/schedules/:id

# Receipt Management
GET    /api/v1/admin/receipts
PATCH  /api/v1/admin/receipts/:id/approve
PATCH  /api/v1/admin/receipts/:id/reject

# Admin Settings
POST   /api/v1/admin/password/change
POST   /api/v1/admin/notifications/send
POST   /api/v1/admin/announcements
PATCH  /api/v1/admin/announcements/:id
DELETE /api/v1/admin/announcements/:id

# Audit
GET    /api/v1/admin/audit-logs
GET    /api/v1/admin/reports/daily
GET    /api/v1/admin/reports/weekly
GET    /api/v1/admin/reports/monthly
```

---

## 🚀 SETUP & INSTALLATION

### Prerequisites
```bash
Node.js 18+
npm or yarn
PostgreSQL 15+ (local or Docker)
Git
```

### Step 1: Clone & Setup
```bash
git clone <repo-url>
cd uzair-transport

# Create environment files
cp frontend/.env.local.example frontend/.env.local
cp backend/.env.local.example backend/.env.local
```

### Step 2: Database (Docker)
```bash
# Start PostgreSQL
docker-compose up -d

# Verify: postgres should be running on localhost:5432
```

### Step 3: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Setup database
npx prisma migrate dev --name init

# Seed data (admin user, sample routes, buses)
npx prisma db seed

# Start server
npm run dev
# Backend runs on http://localhost:3001
```

### Step 4: Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend runs on http://localhost:3000
```

### Step 5: Access Application
```
🎓 Student Portal: http://localhost:3000
👨‍💼 Admin Portal: http://localhost:3000/admin-login
API: http://localhost:3001/api/v1
```

---

## 📝 DEFAULT CREDENTIALS (Development Only)

### Admin Account
```
Email: admin@uzair.local
Password: Admin@12345
```

### Sample Students
```
Google OAuth Login (any Google account works)
Default Route: "A-Block to Hostel"
Default Fee: PKR 5000/semester
```

---

## 🎯 ENVIRONMENT VARIABLES

### Frontend (.env.local)
```bash
# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Uzair Transport

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Features
NEXT_PUBLIC_ENABLE_LIVE_TRACKING=false
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Backend (.env.local)
```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/uzair_transport

# Auth
NEXTAUTH_SECRET=your_secret_key
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# Server
NODE_ENV=development
API_PORT=3001
API_URL=http://localhost:3001

# Email (Mock)
MOCK_EMAIL_ENABLED=true

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# Session
SESSION_SECRET=your_session_secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

---

## 📊 DESIGN SPECIFICATIONS

### Landing Page Components
- ✅ Animated hero with gradient background
- ✅ Bus illustration (SVG)
- ✅ Features section (3 columns)
- ✅ How it works (step-by-step)
- ✅ Statistics (cards)
- ✅ FAQ accordion
- ✅ Contact section
- ✅ Responsive navigation
- ✅ Dark mode toggle

### Student Dashboard
- ✅ Welcome greeting
- ✅ Current route card
- ✅ Semester fee status
- ✅ Receipt status
- ✅ Today's bus schedule
- ✅ Latest announcements
- ✅ Recent notifications
- ✅ Quick action buttons

### Admin Dashboard
- ✅ Key metrics cards (total students, routes, etc.)
- ✅ Activity chart (line graph)
- ✅ Revenue chart (bar graph)
- ✅ Recent approvals (table)
- ✅ Pending receipts (count)
- ✅ Quick action buttons

---

## ✅ CODE GENERATION RULES

1. **ALWAYS write filename first** in markdown format: `// filename: path/to/file.ts`
2. **Generate complete, production-ready code** - no shortcuts
3. **NO placeholders** - every function is implemented
4. **NO TODO comments** - all code is finished
5. **NO "implement later"** - that's a failure
6. **Include TypeScript types** - strict mode enabled
7. **Include error handling** - try/catch, validation
8. **Include JSDoc comments** for functions
9. **Export components properly** - default or named
10. **Test imports** - all imports must exist

---

## 🎨 UI/UX GUIDELINES

### Component Design
- Use ShadCN/UI components as base
- Extend with Tailwind CSS classes
- Add Framer Motion for smooth transitions
- Include loading states (skeletons)
- Include error states (toast messages)
- Include empty states (illustrations)

### Responsive Breakpoints
```css
xs: 320px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast 4.5:1 minimum
- Focus indicators visible
- Form labels associated

---

## 🧪 TESTING (Optional for Friend)

The project can be tested manually, but includes test structure:
```bash
# Backend tests
cd backend && npm run test

# Frontend E2E
cd frontend && npm run test:e2e
```

---

## 📦 DEPLOYMENT (Future)

When friend is ready to deploy:

**Frontend (Vercel):**
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

**Backend (Railway/Render):**
1. Push to GitHub
2. Connect to Railway
3. Set environment variables
4. Configure PostgreSQL connection
5. Deploy

---

## 🐛 TROUBLESHOOTING

### Common Issues

**"Cannot connect to database"**
- Ensure PostgreSQL is running: `docker ps`
- Check DATABASE_URL in .env.local
- Run: `npx prisma db push`

**"Google OAuth not working"**
- Verify NEXT_PUBLIC_GOOGLE_CLIENT_ID is set
- Check redirect URIs in Google Console
- Ensure NEXTAUTH_URL matches localhost:3000

**"Profile pictures not uploading"**
- Check `/backend/uploads` exists
- Verify write permissions
- Check file size limits

**"Receipts won't generate"**
- Verify React PDF is installed
- Check QR encryption keys are set
- Verify fonts are available

---

## 📚 PROJECT FEATURES CHECKLIST

### Student Features
- [x] Google OAuth login
- [x] View dashboard
- [x] View routes & fees
- [x] View daily buses
- [x] Request receipts
- [x] Download receipt PDF
- [x] View digital pass
- [x] Scan QR (view)
- [x] Profile management
- [x] View notifications
- [x] View announcements
- [x] View payment history

### Admin Features
- [x] Password login
- [x] Dashboard analytics
- [x] Student management (CRUD)
- [x] Route management (CRUD)
- [x] Bus management (CRUD)
- [x] Daily schedule management
- [x] Receipt approval/rejection
- [x] Send notifications
- [x] Post announcements
- [x] View audit logs
- [x] Export reports
- [x] Password change

---

## 🎓 NOTES FOR YOUR FRIEND

1. **This is fully functional** - No integrations needed initially
2. **Extensible design** - Easy to add Cloudinary, Resend later
3. **Type-safe** - TypeScript prevents most bugs
4. **Well-documented** - Code has comments
5. **Professional UI** - Premium SaaS design
6. **Production-ready structure** - Easy to deploy

---

## 📞 SUPPORT

If session limit is reached:
1. Save PROJECT_STATUS.md
2. Note which files are complete
3. Note which files are TODO
4. Paste status.md in next prompt
5. Continue generation

---

**Last Updated**: August 2026
**Version**: 1.0.0-beta
**Status**: Ready for Generation

