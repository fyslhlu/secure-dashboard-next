import { verifyOtp } from "@/lib/auth/otpStore";

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

    if (!result.success) {
      return Response.json({ message: result.message }, { status: 401 });
    }

    return Response.json(
      {
        message: result.message,
        user: result.user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Verify OTP route error:", error);

    return Response.json(
      { message: "Something went wrong while verifying OTP." },
      { status: 500 },
    );
  }
}