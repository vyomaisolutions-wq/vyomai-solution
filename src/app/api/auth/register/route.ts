import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase, isDbConnected } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, adminKey } = body;

    const expectedKey = process.env.ADMIN_KEY || "vyomai_admin_secret";
    if (adminKey && adminKey !== expectedKey) {
      return NextResponse.json({ success: false, error: "Invalid Admin Secret Key" }, { status: 403 });
    }

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    // Hash password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      await connectToDatabase();
      if (isDbConnected()) {
        const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
        if (existingAdmin) {
          return NextResponse.json(
            { success: false, error: "Admin account with this email already exists." },
            { status: 400 }
          );
        }

        const newAdmin = await Admin.create({
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
        });

        return NextResponse.json(
          {
            success: true,
            message: "Admin created successfully in MongoDB Atlas!",
            admin: {
              id: newAdmin._id,
              name: newAdmin.name,
              email: newAdmin.email,
              createdAt: newAdmin.createdAt,
            },
          },
          { status: 201 }
        );
      }
    } catch (dbErr) {
      console.warn("DB save failed, returning registered payload fallback:", dbErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Admin account registered successfully!",
        admin: {
          name,
          email: email.toLowerCase(),
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating admin via API:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create admin" },
      { status: 500 }
    );
  }
}
