import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET prescription by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const prescription = await prisma.prescription.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        medicines: true,
      },
    });

    if (!prescription) {
      return NextResponse.json({ error: "Prescription not found" }, { status: 404 });
    }

    return NextResponse.json(prescription, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/prescriptions/[id] error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
