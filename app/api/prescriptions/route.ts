import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CREATE a new prescription (POST /api/prescriptions)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, family_member_name, prescription_image } = body;

    if (!userId || !family_member_name) {
      return NextResponse.json(
        { error: "userId and family_member_name are required" },
        { status: 400 }
      );
    }

    const newPrescription = await prisma.prescription.create({
      data: {
        userId,
        family_member_name,
        prescription_image: prescription_image || null,
      },
    });

    return NextResponse.json(newPrescription, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/prescriptions error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET all prescriptions (GET /api/prescriptions)
export async function GET() {
  try {
    const prescriptions = await prisma.prescription.findMany({
      include: {
        user: true,       // include user details
        medicines: true,  // include medicines (if added later)
      },
    });

    return NextResponse.json(prescriptions, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/prescriptions error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
