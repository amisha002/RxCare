import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// CREATE a new user (POST /api/users)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      phone_number,
      caregiver_phone,
      family_members,
      age,
      password,
    } = body;

    if (!email || !phone_number) {
      return NextResponse.json(
        { error: "Email and Phone Number are required" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        {error:"You must enter a password!"},
        {status:400}
      )
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        phone_number,
        caregiver_phone: caregiver_phone || null,
        family_members: family_members
          ? JSON.parse(JSON.stringify(family_members))
          : null,
        age,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });

  } catch (error:any) {
    console.log(error);
    console.log(error.message);
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

// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";// Adjust the path to your Prisma instance
// import bcrypt from "bcryptjs";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const {
//       email,
//       phone_number,
//       caregiver_phone,
//       family_members,
//       age,
//       password,
//     } = body;

//     if (!email || !phone_number || !password || !age) {
//       return NextResponse.json(
//         { error: "Email, Phone Number, Age and Password are required" },
//         { status: 400 }
//       );
//     }

//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists with this email" },
//         { status: 409 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         phone_number,
//         caregiver_phone: caregiver_phone || null,
//         family_members: family_members
//           ? JSON.parse(JSON.stringify(family_members))
//           : null,
//         age,
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const users = await prisma.user.findMany();
//     return NextResponse.json(users, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
