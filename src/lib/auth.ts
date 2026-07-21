import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "vyomai_jwt_secret_key_8923471092834710928";

export interface JWTPayload {
  id: string;
  email: string;
  name: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function getAdminFromRequest(req: Request): JWTPayload | null {
  try {
    // 1. Check Authorization Bearer header
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      return verifyToken(token);
    }

    // 2. Check Cookie
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((c) => {
          const [key, ...v] = c.split("=");
          return [key, v.join("=")];
        })
      );
      if (cookies.admin_token) {
        return verifyToken(cookies.admin_token);
      }
    }
  } catch (error) {
    return null;
  }
  return null;
}
