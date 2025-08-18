// // // app/api/auth/login/route.ts
// // import { NextRequest, NextResponse } from "next/server";
// // import { prisma } from "@/lib/prisma";
// // import bcrypt from "bcryptjs";
// // import { signAccessToken, signRefreshToken } from "@/lib/jwt";
// // import { generateJti, sha256 } from "@/lib/crypto";
// // import { setAuthCookies } from "@/lib/cookies";

// // export async function POST(req: NextRequest) {
// //   try {
// //     const { email, password } = await req.json();

// //     if (!email || !password) {
// //       return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
// //     }

// //     const user = await prisma.user.findUnique({ where: { email } });
// //     if (!user) {
// //       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
// //     }

// //     const ok = await bcrypt.compare(password, user.password);
// //     if (!ok) {
// //       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
// //     }

// //     // Create tokens
// //     const accessToken = signAccessToken({ sub: user.id, email: user.email });
// //     const jti = generateJti();
// //     const refreshToken = signRefreshToken({ sub: user.id, jti });

// //     // Persist hashed refresh token
// //     const tokenHash = sha256(refreshToken);
// //     const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30d

// //     const userAgent = req.headers.get("user-agent") || undefined;
// //     const ip = req.ip ?? (req.headers.get("x-forwarded-for") || undefined);

// //     await prisma.token.create({
// //       data: {
// //         userId: user.id,
// //         jti,
// //         tokenHash,
// //         type: "REFRESH",
// //         userAgent,
// //         ip,
// //         expiresAt,
// //       },
// //     });

// //     // Set cookies
// //     setAuthCookies(accessToken, refreshToken);

// //     return NextResponse.json({
// //       message: "Login successful",
// //       user: { id: user.id, email: user.email },
// //     });
// //   } catch (err: any) {
// //     console.error(err);
// //     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
// //   }
// // }

// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import { signAccessToken, signRefreshToken } from "@/lib/jwt";
// import { generateJti, sha256 } from "@/lib/crypto";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
//     }

//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
//     }

//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) {
//       return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
//     }

//     // Create tokens
//     const accessToken = signAccessToken({ sub: user.id, email: user.email });
//     const jti = generateJti();
//     const refreshToken = signRefreshToken({ sub: user.id, jti });

//     // Persist hashed refresh token
//     const tokenHash = sha256(refreshToken);
//     const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30d

//     const userAgent = req.headers.get("user-agent") || undefined;
//     const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || undefined;

//     await prisma.token.create({
//       data: {
//         userId: user.id,
//         jti,
//         tokenHash,
//         type: "REFRESH",
//         userAgent,
//         ip,
//         expiresAt,
//       },
//     });

//     // Create response with cookies
//     const response = NextResponse.json({
//       message: "Login successful",
//       user: { id: user.id, email: user.email },
//     });

//     response.cookies.set('accessToken', accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 60 * 15, // 15 minutes
//       path: '/',
//     });

//     response.cookies.set('refreshToken', refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 60 * 60 * 24 * 30, // 30 days
//       path: '/',
//     });

//     return response;
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "@/lib/jwt";
import { generateJti, sha256 } from "@/lib/crypto";

export async function POST(req: NextRequest) {
  try {
    // Validate request content type
    const contentType = req.headers.get("content-type");
    if (contentType !== "application/json") {
      return NextResponse.json(
        { error: "Invalid content type. Expected application/json" },
        { status: 400 }
      );
    }

    const { email: rawEmail, password } = await req.json();

    // Trim and validate inputs
    const email = rawEmail?.trim().toLowerCase();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user with case-insensitive email search
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive"
        }
      }
    });

    if (!user) {
      console.log(`Login attempt for non-existent email: ${email}`);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log(`Password mismatch for user: ${user.id}`);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create tokens
    const accessToken = signAccessToken({ sub: user.id, email: user.email });
    const jti = generateJti();
    const refreshToken = signRefreshToken({ sub: user.id, jti });

    // Persist hashed refresh token
    const tokenHash = sha256(refreshToken);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

    const userAgent = req.headers.get("user-agent") || "unknown";
    const ip = (
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"
    );

    try {
      await prisma.token.create({
        data: {
          userId: user.id,
          jti,
          tokenHash,
          type: "REFRESH",
          userAgent,
          ip,
          expiresAt,
        },
      });
    } catch (dbError) {
      console.error("Failed to store refresh token:", dbError);
      return NextResponse.json(
        { error: "Authentication service unavailable" },
        { status: 503 }
      );
    }

    // Create response with secure cookies
    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user.id, email: user.email },
    });

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 60 * 15, // 15 minutes
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}