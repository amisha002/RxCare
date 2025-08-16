import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// // CREATE a new user (POST /api/users)
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { name, email } = body;

//     if (!name || !email) {
//       return NextResponse.json({ error: "Name and Email required" }, { status: 400 });
//     }

//     const newUser = await prisma.user.create({
//       data: { name, email },
//     });

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// // GET all users (GET /api/users)
// export async function GET() {
//   try {
//     const users = await prisma.user.findMany();
//     return NextResponse.json(users, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// CREATE a new user (POST /api/users)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone_number, caregiver_phone, family_members } = body;

    if (!email || !phone_number) {
      return NextResponse.json(
        { error: "Email and Phone Number are required" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        phone_number,
        caregiver_phone: caregiver_phone || null,
        family_members: family_members ? JSON.parse(JSON.stringify(family_members)) : null,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET all users (GET /api/users)
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
