import { sendOtpEmail } from "@/lib/auth/sendOtpEmail";
import {
  findUserByEmail,
  verifyDemoUserPassword,
} from "@/lib/auth/demoUsers";
import { generateOtpCode, saveOtp } from "@/lib/auth/otpStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password, turnstileToken } = body;

    if (!email || !password || !turnstileToken) {
      return Response.json(
        { message: "Email, password, and human verification are required." },
        { status: 400 },
      );
    }

    const formData = new FormData();
    formData.append("secret", process.env.TURNSTILE_SECRET_KEY as string);
    formData.append("response", turnstileToken);

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return Response.json(
        { message: "Human verification failed. Please try again." },
        { status: 403 },
      );
    }

    const user = findUserByEmail(email);

    if (!user) {
      return Response.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    const passwordMatches = await verifyDemoUserPassword(
      password,
      user.password,
    );

    if (!passwordMatches) {
      return Response.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    const otpCode = generateOtpCode();

saveOtp({
  email: user.email,
  code: otpCode,
  role: user.role,
  name: user.name,
});

await sendOtpEmail({
  to: user.email,
  name: user.name,
  otpCode,
});

await sendOtpEmail({
  to: user.email,
  name: user.name,
  otpCode,
});

console.log("=================================");
console.log(`OTP for ${user.email}: ${otpCode}`);
console.log("This OTP expires in 5 minutes.");
console.log("=================================");

return Response.json(
  {
    message: "Login successful. OTP was sent to your email.",
    nextStep: "/verify-otp",
    email: user.email,
  },
  { status: 200 },
);
  } catch (error) {
    console.error("Login route error:", error);

    return Response.json(
      { message: "Something went wrong during login." },
      { status: 500 },
    );
  }
}