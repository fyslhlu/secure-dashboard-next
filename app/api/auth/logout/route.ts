export async function POST() {
  const response = Response.json(
    { message: "Logged out successfully." },
    { status: 200 },
  );

  response.headers.set(
    "Set-Cookie",
    `auth_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax;${
      process.env.NODE_ENV === "production" ? " Secure;" : ""
    }`,
  );

  return response;
}