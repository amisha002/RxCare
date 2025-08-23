import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization token required' }, { status: 401 });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    
    // Verify token and get user ID
    let userId: number;
    try {
      const decoded = verifyAccessToken(token);
      userId = decoded.sub;
    } catch (error) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Fetch prescriptions with medicines and notifications
    const prescriptions = await prisma.prescription.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        medicines: {
          include: {
            notifications: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            age: true,
            phone_number: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Calculate summary statistics
    const totalPrescriptions = prescriptions.length;
    const totalMedicines = prescriptions.reduce((acc, prescription) => 
      acc + prescription.medicines.length, 0
    );
    
    const activeMedicines = prescriptions.reduce((acc, prescription) => 
      acc + prescription.medicines.filter(medicine => 
        new Date(medicine.end_date) >= new Date()
      ).length, 0
    );

    const dueForRefill = prescriptions.reduce((acc, prescription) => 
      acc + prescription.medicines.filter(medicine => {
        const endDate = new Date(medicine.end_date);
        const today = new Date();
        const daysUntilEnd = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilEnd <= 7 && daysUntilEnd > 0;
      }).length, 0
    );

    // Get unique doctors (for now, we'll use a placeholder since there's no doctor field)
    const uniqueDoctors = 6; // Placeholder - in real app this would come from a doctors table

    return NextResponse.json({
      prescriptions,
      summary: {
        activeMedicines,
        dueForRefill,
        totalPrescriptions,
        uniqueDoctors,
      },
    });
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prescriptions' },
      { status: 500 }
    );
  }
}
