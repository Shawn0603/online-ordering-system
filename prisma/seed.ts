import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.dish.deleteMany();
  await prisma.user.deleteMany();
  await prisma.admin.deleteMany();

 
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
    },
  });
  console.log("✅ Admin account created");

  
  await prisma.user.create({
    data: {
      id: "test-user-id-1234",
      email: "guest@example.com",
      name: "Guest User",
      password: hashedPassword,
    },
  });
  console.log("✅ Test user created");

  
  const dishes = await Promise.all([
    prisma.dish.create({
      data: {
        name: "Tomahawk Steak",
        price: 42.99,
        description: "Juicy, flame-grilled tomahawk ribeye steak served with roasted potatoes and creamy sides.",
        imageUrl: "/images/tomahawk-steak.jpg",
      },
    }),
    prisma.dish.create({
      data: {
        name: "Crispy Chicken Wings",
        price: 11.5,
        description: "Golden-fried chicken wings with a hint of citrus, topped with fresh greens and black beans.",
        imageUrl: "/images/crispy-chicken-wings.jpg",
      },
    }),
    prisma.dish.create({
      data: {
        name: "Sirloin Steak",
        price: 28.0,
        description: "Grilled sirloin steak cooked medium-rare, served with grilled tomato and savory juices.",
        imageUrl: "/images/sirloin-steak.jpg",
      },
    }),
    prisma.dish.create({
      data: {
        name: "Mango Chicken Salad",
        price: 13.5,
        description: "A refreshing salad with mango, chicken breast, cherry tomatoes, beans, and creamy dressing.",
        imageUrl: "/images/mango-chicken-salad.jpg",
      },
    }),
    prisma.dish.create({
      data: {
        name: "Foie Gras Toast",
        price: 22.0,
        description: "Seared foie gras on crispy toast, layered with fruit jam and black caviar.",
        imageUrl: "/images/foie-gras-toast.jpg",
      },
    }),
    prisma.dish.create({
      data: {
        name: "Bolognese Pasta",
        price: 14.25,
        description: "Spaghetti pasta tossed in rich beef Bolognese sauce, topped with parmesan cheese.",
        imageUrl: "/images/bolognese-pasta.jpg",
      },
    }),
  ]);

  console.log(" Dishes inserted:");
  dishes.forEach((dish) => {
    console.log(`- ${dish.name}: ${dish.id}`);
  });
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
