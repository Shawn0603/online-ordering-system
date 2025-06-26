// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma";



const prisma = new PrismaClient();

async function main() {
  await prisma.dish.createMany({
    data: [
      {
        name: "Classic Cheeseburger",
        price: 10.99,
        description: "Beef patty, cheddar cheese, lettuce, tomato, pickles, and special sauce",
      },
      {
        name: "Pepperoni Pizza",
        price: 12.99,
        description: "Classic pepperoni with mozzarella cheese on tomato sauce base",
      },
      {
        name: "Caesar Salad",
        price: 8.5,
        description: "Romaine lettuce, parmesan, croutons, and Caesar dressing",
      },
      {
        name: "Buffalo Chicken Wings",
        price: 11.75,
        description: "Crispy wings tossed in spicy buffalo sauce, served with ranch dip",
      },
      {
        name: "Maple Glazed Salmon",
        price: 17.99,
        description: "Grilled salmon fillet with Canadian maple syrup glaze",
      },
      {
        name: "Poutine",
        price: 9.5,
        description: "Crispy fries topped with cheese curds and brown gravy – a Canadian classic",
      }
    ]
  });

  console.log("✅ Seed completed: inserted default dishes");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
