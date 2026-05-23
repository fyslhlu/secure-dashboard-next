import { verifyOtp } from "@/lib/auth/otpStore";
import { createAuthToken } from "@/lib/auth/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, otp } = body;

    if (!email || !otp) {
      return Response.json(
        { message: "Email and OTP are required." },
        { status: 400 },
      );
    }

    const result = verifyOtp(email, otp);

    if (!result.success || !result.user) {
      return Response.json(
        { message: result.message },
        { status: 401 },
      );
    }

    const token = createAuthToken(result.user);

    const response = Response.json(
      {
        message: result.message,
        user: result.user,
        nextStep: "/dashboard",
      },
      { status: 200 },
    );

    response.headers.set(
      "Set-Cookie",
      `auth_token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax;${
        process.env.NODE_ENV === "production" ? " Secure;" : ""
      }`,
    );

    return response;
  } catch (error) {
    console.error("Verify OTP route error:", error);

    return Response.json(
      { message: "Something went wrong while verifying OTP." },
      { status: 500 },
    );
  }
}