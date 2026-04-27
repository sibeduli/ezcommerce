import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create default roles
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      description: "Full system access",
      permissions: ["*"],
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: {
      name: "user",
      description: "Standard user access",
      permissions: ["shop:read", "cart:manage", "profile:manage"],
    },
  });

  console.log("Created roles:", { adminRole, userRole });

  // Create admin user
  const hashedPassword = await bcrypt.hash("1q2w3e4r", 12);

  const adminUser = await prisma.user.upsert({
    where: { email: "me@ezcommerce.com" },
    update: {},
    create: {
      email: "me@ezcommerce.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  // Assign admin role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  console.log("Created admin user:", adminUser.email);

  // Create regular user
  const regularUser = await prisma.user.upsert({
    where: { email: "user@ezcommerce.com" },
    update: {},
    create: {
      email: "user@ezcommerce.com",
      password: hashedPassword,
      name: "User",
    },
  });

  // Assign user role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: regularUser.id,
        roleId: userRole.id,
      },
    },
    update: {},
    create: {
      userId: regularUser.id,
      roleId: userRole.id,
    },
  });

  console.log("Created regular user:", regularUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
