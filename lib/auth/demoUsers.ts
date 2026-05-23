import bcrypt from "bcryptjs";

export type UserRole = "ADMIN" | "USER";

export type DemoUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export const demoUsers: DemoUser[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "Admin123!",
    role: "ADMIN",
  },
  {
    id: 2,
    name: "Normal User",
    email: "user@example.com",
    password: "User123!",
    role: "USER",
  },
];

export function findUserByEmail(email: string) {
  return demoUsers.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
}

export async function verifyDemoUserPassword(
  plainPassword: string,
  savedPassword: string,
) {
  const passwordHash = await bcrypt.hash(savedPassword, 10);
  return bcrypt.compare(plainPassword, passwordHash);
}