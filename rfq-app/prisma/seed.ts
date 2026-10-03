import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("rfqpilot2026", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@rfqpilot.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@rfqpilot.com",
      passwordHash,
      role: "ADMIN",
    },
  });

  const buyer = await prisma.user.upsert({
    where: { email: "buyer@rfqpilot.com" },
    update: {},
    create: {
      name: "Procurement Buyer",
      email: "buyer@rfqpilot.com",
      passwordHash,
      role: "BUYER",
    },
  });

  const vendors = await Promise.all([
    prisma.vendor.upsert({
      where: { email: "quotes@acme-supplies.com" },
      update: {},
      create: {
        name: "Acme Supplies",
        email: "quotes@acme-supplies.com",
        phone: "+91 98765 43210",
        category: "Metals & Fasteners",
        gstin: "27AAPCA1234A1Z5",
        rating: 4,
        isActive: true,
      },
    }),
    prisma.vendor.upsert({
      where: { email: "sunita@globalparts.in" },
      update: {},
      create: {
        name: "Global Parts Co.",
        email: "sunita@globalparts.in",
        phone: "+91 77654 32109",
        category: "Hydraulics & Pneumatics",
        gstin: "29AABCG5678B1Z3",
        rating: 5,
        isActive: true,
      },
    }),
    prisma.vendor.upsert({
      where: { email: "arun@techfab.co.in" },
      update: {},
      create: {
        name: "TechFab Industries",
        email: "arun@techfab.co.in",
        phone: "+91 88765 43210",
        category: "Sheet Metal Fabrication",
        rating: 4,
        isActive: true,
      },
    }),
    prisma.vendor.upsert({
      where: { email: "priya@easternfast.com" },
      update: {},
      create: {
        name: "Eastern Fasteners",
        email: "priya@easternfast.com",
        phone: "+91 99887 76655",
        category: "Fasteners & Hardware",
        rating: 3,
        isActive: false,
      },
    }),
  ]);

  const rfq = await prisma.rfq.upsert({
    where: { number: "RFQ-1024" },
    update: {},
    create: {
      number: "RFQ-1024",
      title: "Steel Brackets – Type A",
      description: "Grade 304 stainless steel brackets for conveyor assembly line.",
      status: "RECEIVED",
      currency: "INR",
      dueDate: new Date("2026-10-10"),
      items: {
        create: [
          {
            lineNumber: 1,
            description: "Steel Bracket Type-A (Grade 304 SS)",
            partNumber: "PMW-SB-304-A",
            quantity: 500,
            unit: "PCS",
            specs: "Tolerance ±0.02mm, surface finish Ra 1.6",
            targetPrice: 180,
          },
          {
            lineNumber: 2,
            description: "M8 × 25 Hex Bolt (SS 304)",
            quantity: 2000,
            unit: "PCS",
            targetPrice: 12,
          },
        ],
      },
    },
  });

  console.log("✅ Seed complete");
  console.log(`   Users: ${admin.email}, ${buyer.email}  (password: rfqpilot2026)`);
  console.log(`   Vendors: ${vendors.map((v) => v.name).join(", ")}`);
  console.log(`   RFQ: ${rfq.number}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
