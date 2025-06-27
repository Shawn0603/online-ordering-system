import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
    },
  });
  console.log("Admin account created");

  
  await prisma.user.create({
    data: {
      id: "test-user-id-1234",
      email: "guest@example.com",
      name: "Guest User",
    },
  });
  console.log("Test user created");

  
  const dishes = await Promise.all([
    prisma.dish.create({
      data: {
        name: "Classic Cheeseburger",
        price: 10.99,
        description:
          "Beef patty, cheddar cheese, lettuce, tomato, pickles, and special sauce",
      },
    }),
    prisma.dish.create({
      data: {
        name: "Pepperoni Pizza",
        price: 12.99,
        description:
          "Classic pepperoni with mozzarella cheese on tomato sauce base",
      },
    }),
    prisma.dish.create({
      data: {
        name: "Caesar Salad",
        price: 8.5,
        description:
          "Romaine lettuce, parmesan, croutons, and Caesar dressing",
      },
    }),
    prisma.dish.create({
      data: {
        name: "Buffalo Chicken Wings",
        price: 11.75,
        description:
          "Crispy wings tossed in spicy buffalo sauce, served with ranch dip",
      },
    }),
    prisma.dish.create({
      data: {
        name: "Maple Glazed Salmon",
        price: 17.99,
        description: "Grilled salmon fillet with Canadian maple syrup glaze",
      },
    }),
    prisma.dish.create({
      data: {
        name: "Poutine",
        price: 9.5,
        description:
          "Crispy fries topped with cheese curds and brown gravy – a Canadian classic",
      },
    }),
  ]);

  console.log("Dishes inserted:");
  dishes.forEach((dish) => {
    console.log(`- ${dish.name}: ${dish.id}`);
  });
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
