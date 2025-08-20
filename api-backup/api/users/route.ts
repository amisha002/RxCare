import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CREATE a new user (POST /api/users)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone_number, caregiver_phone, family_members } = body;

    if (!email || !phone_number) {
      return NextResponse.json(
        { error: "email and phone_number are required" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        phone_number,
        caregiver_phone,
        family_members,
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
    const users = await prisma.user.findMany({
      include: {
        prescriptions: true, // fetch related prescriptions
        notifications: true, // fetch related notifications
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
