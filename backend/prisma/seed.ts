import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Uzair Transport Database Seed...');

  // 1. Clean existing records
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.receipt.deleteMany();
  await prisma.receiptRequest.deleteMany();
  await prisma.dailyBusSchedule.deleteMany();
  await prisma.bus.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.transportRoute.deleteMany();

  // 2. Create Admin User
  const adminPasswordHash = await bcrypt.hash('Admin@12345', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@uzair.local',
      fullName: 'Uzair Transport Administrator',
      role: 'ADMIN',
      passwordHash: adminPasswordHash,
      isActive: true,
      profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
  });
  console.log(`✅ Admin created: ${adminUser.email}`);

  // 3. Create Sample Routes
  const route1 = await prisma.transportRoute.create({
    data: {
      name: 'Route 1: Gulberg & Model Town Express',
      origin: 'Gulberg Main Market',
      destination: 'University Central Terminal',
      stops: JSON.stringify([
        'Gulberg Main Market',
        'Liberty Roundabout',
        'Ferozepur Road',
        'Model Town Link Road',
        'Campus Gate 1',
      ]),
      semester: 'Fall 2026',
      price: 6500,
      busCount: 3,
      isActive: true,
    },
  });

  const route2 = await prisma.transportRoute.create({
    data: {
      name: 'Route 2: Johar Town - Defense Shuttle',
      origin: 'Johar Town G-1 Market',
      destination: 'University Central Terminal',
      stops: JSON.stringify([
        'Johar Town G-1 Market',
        'Shaukat Khanum Chowk',
        'DHA Phase 3 Commercial',
        'Walton Road',
        'Campus Gate 2',
      ]),
      semester: 'Fall 2026',
      price: 7200,
      busCount: 4,
      isActive: true,
    },
  });

  const route3 = await prisma.transportRoute.create({
    data: {
      name: 'Route 3: Hostel & Science Complex Shuttle',
      origin: 'Boys Hostel Complex',
      destination: 'Science & Tech Block',
      stops: JSON.stringify([
        'Boys Hostel Complex',
        'Girls Hostel Gate',
        'Central Library',
        'Science & Tech Block',
      ]),
      semester: 'Fall 2026',
      price: 4500,
      busCount: 2,
      isActive: true,
    },
  });
  console.log('✅ Sample transport routes created');

  // 4. Create Buses
  const bus1 = await prisma.bus.create({
    data: {
      busNumber: 'LES-2026-01',
      registrationNumber: 'REG-UT-101',
      driverName: 'Muhammad Rashid',
      driverPhone: '+92 300 1234567',
      totalSeats: 52,
      isActive: true,
      notes: 'Air-conditioned luxury coaster',
    },
  });

  const bus2 = await prisma.bus.create({
    data: {
      busNumber: 'LES-2026-02',
      registrationNumber: 'REG-UT-102',
      driverName: 'Tariq Mahmood',
      driverPhone: '+92 301 7654321',
      totalSeats: 52,
      isActive: true,
      notes: 'High-capacity shuttle bus',
    },
  });

  const bus3 = await prisma.bus.create({
    data: {
      busNumber: 'LES-2026-03',
      registrationNumber: 'REG-UT-103',
      driverName: 'Asif Ali',
      driverPhone: '+92 302 9876543',
      totalSeats: 48,
      isActive: true,
      notes: 'Campus Express Shuttle',
    },
  });
  console.log('✅ Sample buses created');

  // 5. Create Daily Schedules
  const today = new Date();
  const depTime = new Date(today.setHours(7, 30, 0, 0));
  const arrTime = new Date(today.setHours(8, 15, 0, 0));

  await prisma.dailyBusSchedule.create({
    data: {
      busId: bus1.id,
      routeId: route1.id,
      serviceDate: new Date(),
      departureTime: depTime,
      arrivalTime: arrTime,
      status: 'IN_PROGRESS',
      occupiedSeats: 45,
      notes: 'On-time morning route departure',
    },
  });

  await prisma.dailyBusSchedule.create({
    data: {
      busId: bus2.id,
      routeId: route2.id,
      serviceDate: new Date(),
      departureTime: depTime,
      arrivalTime: arrTime,
      status: 'SCHEDULED',
      occupiedSeats: 38,
      notes: 'Morning shift 2',
    },
  });
  console.log('✅ Daily schedules created');

  // 6. Create Sample Students
  const studentUser1 = await prisma.user.create({
    data: {
      email: 'student.uzair@university.edu',
      googleId: 'google-oauth-10023491',
      fullName: 'Mahad Uzair',
      profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      role: 'STUDENT',
      isActive: true,
      studentProfile: {
        create: {
          studentId: 'UZ-2024-884',
          department: 'Computer Science',
          semester: 5,
          phone: '+92 333 4445566',
          emergencyContact: '+92 333 1112233',
          address: 'House 42, Block B, Model Town, Lahore',
          assignedRouteId: route1.id,
        },
      },
    },
    include: { studentProfile: true },
  });

  const studentUser2 = await prisma.user.create({
    data: {
      email: 'aisha.khan@university.edu',
      googleId: 'google-oauth-10023492',
      fullName: 'Aisha Khan',
      profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'STUDENT',
      isActive: true,
      studentProfile: {
        create: {
          studentId: 'UZ-2024-512',
          department: 'Electrical Engineering',
          semester: 3,
          phone: '+92 321 8889900',
          emergencyContact: '+92 321 7776655',
          address: 'Phase 5 DHA, Lahore',
          assignedRouteId: route2.id,
        },
      },
    },
    include: { studentProfile: true },
  });
  console.log('✅ Sample students created');

  // 7. Create Receipt Requests & Approved Receipts
  const receiptReqApproved = await prisma.receiptRequest.create({
    data: {
      studentId: studentUser1.id,
      routeId: route1.id,
      semester: 'Fall 2026',
      amount: 6500,
      status: 'APPROVED',
      reviewedAt: new Date(),
      reviewedBy: adminUser.id,
    },
  });

  const validUntilDate = new Date();
  validUntilDate.setMonth(validUntilDate.getMonth() + 5);

  const receiptApproved = await prisma.receipt.create({
    data: {
      receiptNumber: 'RCP-2026-9901',
      requestId: receiptReqApproved.id,
      studentId: studentUser1.id,
      routeId: route1.id,
      semester: 'Fall 2026',
      amount: 6500,
      signedToken: `UT-PASS-TOKEN-${studentUser1.id}-${Date.now()}`,
      verificationCode: 'UT-VERIFY-9901',
      encryptedQR: JSON.stringify({
        receiptId: 'RCP-2026-9901',
        studentId: 'UZ-2024-884',
        name: 'Mahad Uzair',
        route: route1.name,
        validUntil: validUntilDate.toISOString(),
      }),
      issuedAt: new Date(),
      validUntil: validUntilDate,
      verificationVersion: 1,
    },
  });

  await prisma.receiptRequest.create({
    data: {
      studentId: studentUser2.id,
      routeId: route2.id,
      semester: 'Fall 2026',
      amount: 7200,
      status: 'PENDING',
    },
  });

  console.log('✅ Sample receipt requests & issued receipt created');

  // 8. Notifications & Announcements
  await prisma.notification.createMany({
    data: [
      {
        userId: studentUser1.id,
        type: 'RECEIPT_APPROVED',
        title: 'Transport Receipt Approved',
        message: 'Your transport fee receipt request for Fall 2026 (Route 1) has been approved. Digital pass is ready.',
        isRead: false,
      },
      {
        userId: studentUser1.id,
        type: 'BUS_DELAY',
        title: 'Bus Delay Alert - Route 1',
        message: 'Bus LES-2026-01 is currently running 10 minutes behind schedule due to traffic on Ferozepur Road.',
        isRead: true,
      },
      {
        userId: studentUser2.id,
        type: 'FEE_REMINDER',
        title: 'Semester Fee Reminder',
        message: 'Please complete your transport fee verification before August 31, 2026.',
        isRead: false,
      },
    ],
  });

  await prisma.announcement.create({
    data: {
      title: '🚌 New Express Route 3 Added for Hostel Students',
      content: 'We are excited to launch Route 3 running directly between the Boys/Girls Hostels and the Science Complex starting this week. Schedule timings: 07:30 AM, 08:30 AM, and 04:30 PM.',
      isPinned: true,
      createdBy: adminUser.fullName,
    },
  });

  await prisma.announcement.create({
    data: {
      title: '⚠️ Digital Transport Pass Verification Policy',
      content: 'Starting September 1st, all students must display their active Digital Transport Pass QR code to the bus conductor upon entry. Physical screenshots are valid for verification.',
      isPinned: false,
      createdBy: adminUser.fullName,
    },
  });
  console.log('✅ Notifications & Announcements created');

  // 9. Create Audit Log
  await prisma.auditLog.create({
    data: {
      actorId: adminUser.id,
      action: 'APPROVE_RECEIPT',
      objectType: 'ReceiptRequest',
      objectId: receiptReqApproved.id,
      changes: JSON.stringify({
        status: 'APPROVED',
        receiptNumber: receiptApproved.receiptNumber,
      }),
      ipAddress: '127.0.0.1',
    },
  });
  console.log('✅ Initial Audit Log seeded');

  console.log('🎉 Uzair Transport database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
