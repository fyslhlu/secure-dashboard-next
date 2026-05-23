import jwt from "jsonwebtoken";

export type AuthUser = {
  email: string;
  name: string;
  role: "ADMIN" | "USER";
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing from environment variables.");
  }

  return secret;
}

export function createAuthToken(user: AuthUser) {
  return jwt.sign(
    {
      email: user.email,
      name: user.name,
      role: user.role,
    },
    getJwtSecret(),
    {
      expiresIn: "1h",
    },
  );
}

export function verifyAuthToken(token: string | undefined): AuthUser | null {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as AuthUser;

    if (
      !decoded.email ||
      !decoded.name ||
      (decoded.role !== "ADMIN" && decoded.role !== "USER")
    ) {
      return null;
    }

    return {
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}