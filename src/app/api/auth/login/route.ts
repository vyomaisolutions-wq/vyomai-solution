import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase, isDbConnected } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    let authenticatedAdmin: { id: string; email: string; name: string } | null = null;

    try {
      await connectToDatabase();
      if (isDbConnected()) {
        const admin = await Admin.findOne({ email: email.toLowerCase() });
        if (admin) {
          const isMatch = await bcrypt.compare(password, admin.password);
          if (isMatch) {
            authenticatedAdmin = {
              id: admin._id.toString(),
              email: admin.email,
              name: admin.name,
            };
          } else {
            return NextResponse.json(
              { success: false, error: "Invalid email or password." },
              { status: 401 }
            );
          }
        }
      }
    } catch (dbErr) {
      console.warn("MongoDB Atlas query failed during login, checking fallback credentials:", dbErr);
    }

    // Fallback authentication if DB is unreachable or initial setup
    if (!authenticatedAdmin) {
      if (email.toLowerCase() === "admin@vyomai.com" && password === "admin123") {
        authenticatedAdmin = {
          id: "admin-fallback-id",
          email: "admin@vyomai.com",
          name: "Super Admin",
        };
      } else {
        return NextResponse.json(
          { success: false, error: "Invalid admin email or password." },
          { status: 401 }
        );
      }
    }

    // Sign 7-day JWT Token
    const token = signToken(authenticatedAdmin);

    // Create response with HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful!",
      token,
      admin: authenticatedAdmin,
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Error logging in admin:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to authenticate" },
      { status: 500 }
    );
  }
}
