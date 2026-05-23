import {
  findUserByEmail,
  verifyDemoUserPassword,
} from "@/lib/auth/demoUsers";
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

const passwordMatches = await verifyDemoUserPassword(password, user.password);
    if (!passwordMatches) {
      return Response.json(
        { message: "Invalid email or password." },
        { status: 401 },
      );
    }

    return Response.json(
      {
        message:
          "Login credentials are valid. Next step will be email OTP verification.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
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