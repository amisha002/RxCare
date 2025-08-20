import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CREATE a new medicine (POST /api/medicines)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      prescriptionId,
      medicine_name,
      dosage_count,
      timing,
      duration_days,
      start_date,
      end_date,
    } = body;

    // Basic validation
    if (
      !prescriptionId ||
      !medicine_name ||
      !dosage_count ||
      !timing ||
      !duration_days ||
      !start_date ||
      !end_date
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newMedicine = await prisma.medicine.create({
      data: {
        prescriptionId,
        medicine_name,
        dosage_count,
        timing,
        duration_days,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      },
    });

    return NextResponse.json(newMedicine, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET all medicines (GET /api/medicines)
export async function GET() {
  try {
    const medicines = await prisma.medicine.findMany({
      include: { prescription: true }, // also fetch related prescription
    });
    return NextResponse.json(medicines, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
