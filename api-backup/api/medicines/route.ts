import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const medicines = await prisma.medicine.findMany({
      include: {
        prescription: true,
      },
    });
    return NextResponse.json(medicines);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prescriptionId, medicine_name, dosage_count, timing, duration_days, start_date, end_date } = body;

    const medicine = await prisma.medicine.create({
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

    return NextResponse.json(medicine, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
