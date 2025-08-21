import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET a specific prescription by ID (GET /api/prescriptions/[id])
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const prescription = await prisma.prescription.findUnique({
      where: { id },
      include: {
        user: true,      // fetch related user
        medicines: true, // fetch related medicines
      },
    });

    if (!prescription) {
      return NextResponse.json({ error: "Prescription not found" }, { status: 404 });
    }

    return NextResponse.json(prescription, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE a prescription (PUT /api/prescriptions/[id])
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const { family_member_name, prescription_image } = body;

    const updatedPrescription = await prisma.prescription.update({
      where: { id },
      data: {
        family_member_name,
        prescription_image,
      },
    });

    return NextResponse.json(updatedPrescription, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a prescription (DELETE /api/prescriptions/[id])
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 500 });
    }

    await prisma.prescription.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Prescription deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
