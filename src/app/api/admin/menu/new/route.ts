import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const available = formData.get("available") === "true";


  // const image = formData.get("image") as File | null;

  if (!name || isNaN(price)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }


  const imageUrl: string | null = null;

  const newDish = await prisma.dish.create({
    data: {
      name,
      description,
      price,
      available,
      imageUrl,
    },
  });

  return NextResponse.json(newDish);
}
